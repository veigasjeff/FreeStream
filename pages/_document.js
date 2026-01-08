import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Open Graph */}
        <meta property="og:title" content="FreeStream™ - Watch HD Movies Online Free" />
        <meta property="og:description" content="Stream 5000+ movies & TV shows in HD quality. No sign up required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freestreaming.vercel.app" />
        <meta property="og:image" content="https://freestreaming.vercel.app/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FreeStream™ - Watch HD Movies Online Free" />
        <meta name="twitter:description" content="Stream free movies, TV shows, live sports and news channels." />
        
        {/* Verification */}
        <meta name="google-site-verification" content="BZNZaUyoS1nXyRfa99f4VJ3ABKZUZhkKB0pZ3DU3L8s" />
        <meta name="yandex-verification" content="36e10a0828a7c53f" />
        <meta name="msvalidate.01" content="1120DCB49A35D5AE7401323A75DAC640" />
        
        <link rel="canonical" href="https://freestreaming.vercel.app" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}