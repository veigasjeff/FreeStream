import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
   const router = useRouter()

    //  useEffect(() => {
    // // Load ad scripts after page load to prevent blocking
    // const loadAdScripts = () => {
    //   // Load first ad script
    //   const adScript1 = document.createElement('script')
    //   adScript1.innerHTML = `(function(s){s.dataset.zone='10297164',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
    //   document.head.appendChild(adScript1)

    //   // Load second ad script
    //   const adScript2 = document.createElement('script')
    //   adScript2.innerHTML = `(function(s){s.dataset.zone='10297166',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
    //   document.head.appendChild(adScript2)
    // }


    // <script>(function(s){s.dataset.zone='10297166',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>

    // <script>(function(s){s.dataset.zone='10297164',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>
    // Load ads after page is fully loaded
  //   if (document.readyState === 'complete') {
  //     loadAdScripts()
  //   } else {
  //     window.addEventListener('load', loadAdScripts)
  //   }

  //   return () => {
  //     window.removeEventListener('load', loadAdScripts)
  //   }
  // }, [])

  // // // Track page views for Google Analytics
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     if (window.gtag) {
  //       window.gtag('config', 'G-RTHH33WQWQ', {
  //         page_title: document.title,
  //         page_location: url
  //       })
  //     }
  //   }

  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  return (
    <>
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





// import '../styles/globals.css';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useEffect } from 'react'
// import { useRouter } from 'next/router'

// export default function App({ Component, pageProps }) {
//   const router = useRouter()

//   // Track page views for Google Analytics
//   useEffect(() => {
//     const handleRouteChange = (url) => {
//       if (window.gtag) {
//         window.gtag('config', 'G-9TY4WQ89PC', {
//           page_title: document.title,
//           page_location: url
//         })
//       }
//     }

//     router.events.on('routeChangeComplete', handleRouteChange)
//     return () => {
//       router.events.off('routeChangeComplete', handleRouteChange)
//     }
//   }, [router.events])

//   // Load Google Analytics if not already loaded
//   useEffect(() => {
//     if (!window.gtag) {
//       window.dataLayer = window.dataLayer || [];
//       function gtag(){dataLayer.push(arguments);}
//       gtag('js', new Date());
//       gtag('config', 'G-RTHH33WQWQ');
//     }
//   }, [])

//   return (
//     <>
//       <div className="min-h-screen flex flex-col">
//         <Header />
//         <main className="flex-grow">
//           <Component {...pageProps} />
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }