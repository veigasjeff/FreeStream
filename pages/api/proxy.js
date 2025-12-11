// pages/api/proxy.js
import http from "http";
import https from "https";

function isValidUrl(u) {
  try {
    const url = new URL(u);
    return (url.protocol === "http:" || url.protocol === "https:");
  } catch (e) {
    return false;
  }
}

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    res.status(400).send("Missing 'url' query parameter");
    return;
  }

  const decoded = decodeURIComponent(url);
  if (!isValidUrl(decoded)) {
    res.status(400).send("Invalid url");
    return;
  }

  // Basic protection: disallow localhost internal addresses (prevent SSRF to internal network)
  try {
    const parsed = new URL(decoded);
    const host = parsed.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host === "::1") {
      res.status(400).send("Blocked");
      return;
    }
  } catch (e) {
    res.status(400).send("Invalid url parse");
    return;
  }

  // Proxy the remote resource:
  const client = decoded.startsWith("https://") ? https : http;

  const remoteReq = client.get(decoded, { headers: { "User-Agent": req.headers["user-agent"] || "proxy" } }, (remoteRes) => {
    // Forward status and most headers needed for media
    const statusCode = remoteRes.statusCode || 200;
    res.statusCode = statusCode;

    // Pass through content-type and content-length if present
    const ct = remoteRes.headers["content-type"];
    if (ct) res.setHeader("Content-Type", ct);

    const cl = remoteRes.headers["content-length"];
    if (cl) res.setHeader("Content-Length", cl);

    // Remove headers that cause browsers to block embedding (we rewrite as same-origin)
    // Not forwarding set-cookie, x-frame-options, content-security-policy, strict-transport-security, etc.
    // But we forward cache-control and accept-ranges when present
    if (remoteRes.headers["cache-control"]) res.setHeader("Cache-Control", remoteRes.headers["cache-control"]);
    if (remoteRes.headers["accept-ranges"]) res.setHeader("Accept-Ranges", remoteRes.headers["accept-ranges"]);
    if (remoteRes.headers["last-modified"]) res.setHeader("Last-Modified", remoteRes.headers["last-modified"]);
    if (remoteRes.headers["etag"]) res.setHeader("ETag", remoteRes.headers["etag"]);

    // Stream the response body
    remoteRes.pipe(res);
    remoteRes.on("error", (err) => {
      try { res.end(); } catch (e) {}
    });
  });

  remoteReq.on("error", (err) => {
    try {
      res.status(502).send("Bad Gateway: " + String(err.message || err));
    } catch (e) {}
  });

  // Timeout safety: abort after 30s
  remoteReq.setTimeout(30000, () => {
    try { remoteReq.abort(); } catch (e) {}
    try { res.status(504).send("Gateway timeout"); } catch (e) {}
  });
}
