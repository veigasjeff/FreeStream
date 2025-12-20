import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

     useEffect(() => {
    // Load ad scripts after page load to prevent blocking
    const loadAdScripts = () => {
      // Load first ad script
      const adScript1 = document.createElement('script')
      adScript1.innerHTML = `(function(s){s.dataset.zone='10297164',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
      document.head.appendChild(adScript1)

      // Load second ad script
      const adScript2 = document.createElement('script')
      adScript2.innerHTML = `(function(s){s.dataset.zone='10297166',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
      document.head.appendChild(adScript2)
    }


    if (document.readyState === 'complete') {
      loadAdScripts()
    } else {
      window.addEventListener('load', loadAdScripts)
    }

    return () => {
      window.removeEventListener('load', loadAdScripts)
    }
  }, [])

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', 'G-RTHH33WQWQ', {
          page_path: url,
        });
      }
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* Viewport should be in _app.js, not _document.js */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        
        {/* Additional global meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
     <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
      
    </>
  );
}

export default MyApp;