import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
      // const baseUrl = 'https://freestreamcinema.com'

  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
        <meta name="keywords" content="free movies, free streaming, watch online, TV shows, no subscription, free movie streaming, live cinema online, watch movies free, scheduled movie times, streaming, HD movies online, live movie streaming, free cinema, online movie theater, news, news online" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@800;900&display=swap" 
          rel="stylesheet"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="author" content="FreeStream Cinema" />
        <meta name="copyright" content="FreeStream Cinema" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta property="og:title" content="FreeStream Cinema - Watch Movies, TV Shows & News Online." />
        <meta property="og:description" content="TV, shows, news, and movies for free with Freestream Cinema. Access thousands of movies + live news, entertainment, weather and more. Watch now." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FreeStream Cinema - Watch Movies, TV Shows & News Online." />
           {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

       <meta name="google-site-verification" content="BZNZaUyoS1nXyRfa99f4VJ3ABKZUZhkKB0pZ3DU3L8s" />
        <meta name="yandex-verification" content="xxxxxxxxxxxxxxxxxxxx" />
        <meta name="facebook-domain-verification" content="https://www.facebook.com/profile.php?id=61583910555206" />

        </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}