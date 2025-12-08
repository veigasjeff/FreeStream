// import Link from 'next/link';
// import { FaPlay, FaCalendar, FaHome, FaTv } from 'react-icons/fa';

// export default function Header() {
//   return (
//     <header className="sticky top-0 z-50 bg-dark/90 backdrop-blur-lg border-b border-white/10">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center space-x-8">
//             <Link href="/" className="flex items-center space-x-2">
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
//                 <FaPlay className="text-white" />
//               </div>
//               <span className="text-xl font-bold text-white">FreeStream Cinema</span>
//             </Link>
            
//             <nav className="hidden md:flex items-center space-x-6">
//               <Link href="/" className="text-light hover:text-primary transition-colors flex items-center gap-2">
//                 <FaHome />
//                 Home
//               </Link>
//               <Link href="/schedule" className="text-light hover:text-primary transition-colors flex items-center gap-2">
//                 <FaCalendar />
//                 Schedule
//               </Link>
//               <Link href="/player/ron-1" className="text-light hover:text-primary transition-colors flex items-center gap-2">
//                 <FaTv />
//                 Live Player
//               </Link>
//             </nav>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <Link 
//               href="/player/ron-1" 
//               className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
//             >
//               <FaPlay />
//               Watch Live
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import { useState } from 'react';
import Link from 'next/link';
import { FaPlay, FaCalendar, FaHome, FaTv, FaBars, FaFilm } from 'react-icons/fa';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header>
        <style jsx>{`
          /* Header Container */
          header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 70px;
            background: black;
            border-bottom: 1px solid #333;
            z-index: 1000;
          }

          /* Header Content */
          .header-content {
            max-width: 1200px;
            height: 100%;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          /* Logo */
          .logo {
            color: white;
            font-size: 24px;
            font-weight: bold;
            text-decoration: none;
          }

          /* Desktop Navigation */
          .desktop-nav {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .nav-link {
            display: flex;
            align-items: center;
            gap: 8px;
            color: white;
            text-decoration: none;
            padding: 8px 16px;
          }

          .nav-link:hover {
            color: #3b82f6;
          }

          .watch-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background: red;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            font-weight: bold;
          }

          .watch-button:hover {
            background: #cc0000;
          }

          /* Mobile Menu Button */
          .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
          }

          /* Mobile Menu */
          .mobile-menu {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: black;
            border-top: 1px solid #333;
            display: none;
            flex-direction: column;
            padding: 20px;
            z-index: 1000;
          }

          .mobile-nav {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .mobile-nav-link {
            display: flex;
            align-items: center;
            gap: 15px;
            color: white;
            text-decoration: none;
            padding: 15px;
            font-size: 18px;
          }

          .mobile-nav-link:hover {
            background: #333;
          }

          .mobile-watch-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background: red;
            color: white;
            padding: 15px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
          }

          .mobile-watch-button:hover {
            background: #cc0000;
          }

          /* Responsive */
          @media (max-width: 991px) {
            .desktop-nav {
              display: none;
            }

            .mobile-menu-button {
              display: block;
            }

            .mobile-menu.open {
              display: flex;
            }
          }

          @media (min-width: 992px) {
            .mobile-menu {
              display: none !important;
            }
          }
        `}</style>

        <div className="header-content">
          {/* Logo */}
          <Link href="/" className="logo">
            FreeStream Cinema
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/schedule" className="nav-link">
              Schedule
            </Link>
            <Link href="/player/bbc-news-channel-hd" className="nav-link">
              Live Player
            </Link>
            <Link href="/request" className="nav-link">
               Request Movie
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            <Link href="/" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link href="/schedule" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Schedule
            </Link>
            <Link href="/player" className="mobile-nav-link" onClick={toggleMobileMenu}>
              Live Player
            </Link>
            <Link href="/request" className="mobile-nav-link" onClick={toggleMobileMenu}>
               Request Movie
            </Link>
          </nav>
         </div>
      </header>

      {/* Spacer */}
      <div style={{ height: '70px' }} />
    </>
  );
}