// import Head from 'next/head';
// import Link from 'next/link';
// import Footer from '../../components/Footer';
// import schedule from '../../Data/schedules.json';
// import { FaArrowLeft } from 'react-icons/fa';

// export default function PlayerPage({ show }) {
//   return (
//     <>
//       <Head>
//         <title>Watch {show.title} - FreeStream</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
//       </Head>
      
//       {/* Main container with fixed dimensions */}
//       <div style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         backgroundColor: 'black',
//         display: 'flex',
//         flexDirection: 'column'
//       }}>
//         {/* Header with Back Button */}
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 100,
//           backgroundColor: 'rgba(0,0,0,0.8)',
//           padding: '15px 20px',
//           borderBottom: '1px solid #333'
//         }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             maxWidth: '1200px',
//             margin: '0 auto'
//           }}>
//             <Link 
//               href={`/schedules/${show.id}`}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px',
//                 color: 'white',
//                 textDecoration: 'none',
//                 fontSize: '16px',
//                 fontWeight: '500',
//                 padding: '8px 16px',
//                 backgroundColor: 'rgba(0,0,0,0.7)',
//                 borderRadius: '8px',
//                 border: '1px solid #444'
//               }}
//             >
//               <FaArrowLeft style={{ fontSize: '18px' }} />
//               <span>Back to Schedule</span>
//             </Link>
            
//             <div style={{
//               flex: 1,
//               textAlign: 'center',
//               padding: '0 20px'
//             }}>
//               <h1 style={{
//                 color: 'white',
//                 fontSize: '18px',
//                 fontWeight: 'bold',
//                 margin: 0,
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: 'nowrap'
//               }}>
//                 {show.title}
//               </h1>
//               <p style={{
//                 color: '#aaa',
//                 fontSize: '14px',
//                 margin: '4px 0 0 0'
//               }}>
//                 Live Now
//               </p>
//             </div>
            
//             <div style={{ width: '120px' }}></div>
//           </div>
//         </div>

//         {/* Video Player Container - Takes all remaining space */}
//         <div style={{
//           flex: 1,
//           position: 'relative',
//           width: '100%',
//           height: '100%',
//           marginTop: '70px',
//           marginBottom: '70px'
//         }}>
//           <iframe
//             src={show.streamUrl}
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               border: 'none',
//               filter: 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)'
//             }}
//             allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
//             allowFullScreen
//             title={`${show.title} Player`}
//             loading="eager"
//           />
//         </div>

//         {/* Footer - FIXED POSITION AT BOTTOM */}
//         <div style={{
//           position: 'fixed',
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: '70px',
//           backgroundColor: 'black',
//           borderTop: '1px solid #333',
//           zIndex: 100
//         }}>
//           <div style={{
//             maxWidth: '1200px',
//             width: '100%',
//             height: '100%',
//             margin: '0 auto',
//             padding: '0 20px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             {/* <Footer /> */}
//           </div>
//         </div>

//         Help Button
//         <div style={{
//           position: 'absolute',
//           bottom: '80px',
//           right: '20px',
//           zIndex: 101
//         }}>
//           <details style={{
//             position: 'relative'
//           }}>
//             <summary style={{
//               backgroundColor: '#dc2626',
//               color: 'white',
//               border: 'none',
//               padding: '8px 16px',
//               borderRadius: '8px',
//               fontSize: '14px',
//               fontWeight: '500',
//               cursor: 'pointer',
//               listStyle: 'none'
//             }}>
//               Need Help?
//             </summary>
//             <ul style={{
//               position: 'absolute',
//               bottom: '40px',
//               right: 0,
//               backgroundColor: '#1a1a1a',
//               borderRadius: '8px',
//               padding: '8px',
//               minWidth: '200px',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
//               listStyle: 'none',
//               margin: 0
//             }}>
//               <li>
//                 <a 
//                   href={show.streamUrl} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   style={{
//                     display: 'block',
//                     padding: '10px 12px',
//                     color: 'white',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}
//                 >
//                   Open Stream Directly
//                 </a>
//               </li>
//               <li>
//                 <button 
//                   onClick={() => window.location.reload()}
//                   style={{
//                     width: '100%',
//                     textAlign: 'left',
//                     padding: '10px 12px',
//                     color: 'white',
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     fontSize: '14px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   Reload Player
//                 </button>
//               </li>
//             </ul>
//           </details>
//         </div>
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const paths = schedule.shows.map((show) => ({
//     params: { id: show.id },
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const show = schedule.shows.find(s => s.id === params.id);
//   if (!show) return { notFound: true };
//   return { props: { show }, revalidate: 60 };
// }

















import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../components/Footer';
import schedule from '../../Data/schedules.json';
import { FaArrowLeft } from 'react-icons/fa';

export default function PlayerPage({ show }) {
  return (
    <>
      <Head>
        <title>Watch {show.title} - FreeStream Cinema</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      
      {/* Main container with fixed dimensions */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header with Back Button */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: '15px 20px',
          borderBottom: '1px solid #333'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <Link 
              href={`/schedules/${show.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'white',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                padding: '8px 16px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: '8px',
                border: '1px solid #444'
              }}
            >
              <FaArrowLeft style={{ fontSize: '18px' }} />
              <span>Back to Schedule</span>
            </Link>
            
            <div style={{
              flex: 1,
              textAlign: 'center',
              padding: '0 20px'
            }}>
              <h1 style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {show.title}
              </h1>
              <p style={{
                color: '#aaa',
                fontSize: '14px',
                margin: '4px 0 0 0'
              }}>
                Live Now
              </p>
            </div>
            
            <div style={{ width: '120px' }}></div>
          </div>
        </div>

        {/* Video Player Container - Takes all remaining space */}
        <div style={{
          flex: 1,
          position: 'relative',
          width: '100%',
          height: '100%',
          marginTop: '70px',
          marginBottom: '70px'
        }}>
          <iframe
            src={show.streamUrl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              filter: 'brightness(1.05) contrast(1.15) saturate(1.12) hue-rotate(1deg)'
            }}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            title={`${show.title} Player`}
            loading="eager"
          />
        </div>

        {/* Footer - FIXED POSITION AT BOTTOM */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '70px',
          backgroundColor: 'black',
          borderTop: '1px solid #333',
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1200px',
            width: '100%',
            height: '100%',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* <Footer /> */}
              <div className="text-center mt-8 md:mt-12 mb-16">
            <Link 
              href="/schedule" 
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            ><span className="gradient-text">
              ← Back to Full Schedule </span>
            </Link>
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = schedule.shows.map((show) => ({
    params: { id: show.id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const show = schedule.shows.find(s => s.id === params.id);
  if (!show) return { notFound: true };
  return { props: { show }, revalidate: 60 };
}