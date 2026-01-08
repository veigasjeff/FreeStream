import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Navbar({ theme, toggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const router = useRouter();

  // Handle Scroll Effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'categories', 'languages'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      
      if (current) setActiveLink(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="logo" onClick={() => scrollToSection('home')}>
          <i className="fas fa-play-circle"></i>
          <span>Free<span className="logo-highlight">Stream™</span></span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
          {['home', 'categories', 'languages'].map((item) => (
            <a 
              key={item}
              href={`#${item}`} 
              className={activeLink === item ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item);
                scrollToSection(item);
              }}
            >
              <i className={`fas fa-${item === 'home' ? 'home' : item === 'categories' ? 'list' : 'globe'}`}></i> 
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a href="https://median.co/share/pwwoxpk" className="apk-btn" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-android"></i> APK
          </a>
        </div>
        
        {/* Right Actions */}
        <div className="nav-right">
          <div className="search-container desktop-only">
            <input type="text" placeholder="Search..." />
            <button><i className="fas fa-search"></i></button>
          </div>
          
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            <i className={theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'}></i>
          </button>

          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-search">
            <input type="text" placeholder="Search movies..." />
            <i className="fas fa-search"></i>
        </div>
        
        <div className="mobile-links">
            <a href="#home" className={activeLink === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleLinkClick('home'); scrollToSection('home'); }}>
                <i className="fas fa-home"></i> Home
            </a>
            <a href="#categories" className={activeLink === 'categories' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleLinkClick('categories'); scrollToSection('categories'); }}>
                <i className="fas fa-list"></i> Categories
            </a>
            <a href="#languages" className={activeLink === 'languages' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleLinkClick('languages'); scrollToSection('languages'); }}>
                <i className="fas fa-globe"></i> Languages
            </a>
            <a href="https://median.co/share/pwwoxpk" className="apk-btn-mobile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-android"></i> Download APK
            </a>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: var(--nav-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
          padding: 0.6rem 0;
          background: ${theme === 'dark' ? 'rgba(13, 17, 23, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          max-width: 1400px;
          margin: 0 auto;
          gap: 1rem;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--light);
          cursor: pointer;
          white-space: nowrap;
        }
        
        .logo i {
          color: var(--primary);
          font-size: 1.8rem;
        }

        .logo-highlight {
          color: var(--primary);
          background: linear-gradient(45deg, var(--primary), #00b4d8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .nav-links {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        
        .nav-links a {
          color: var(--light);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: 0.3s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-links a:hover {
          background: rgba(229, 9, 20, 0.1);
          color: var(--primary);
        }

        .nav-links a.active {
          background: var(--primary);
          color: white;
        }
        
        .apk-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white !important;
          border-radius: 50px !important;
          padding: 0.5rem 1.2rem !important;
        }
        
        .nav-right {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        
        .search-container {
          position: relative;
          background: var(--input-bg);
          border-radius: 50px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
        }
        
        .search-container input {
          padding: 0.6rem 1rem 0.6rem 1.5rem;
          background: transparent;
          border: none;
          color: var(--light);
          width: 150px;
          transition: width 0.3s;
        }

        .search-container input:focus {
            width: 220px;
            outline: none;
        }
        
        .search-container button {
          padding: 0 1rem;
          background: transparent;
          border: none;
          color: var(--gray);
          cursor: pointer;
        }
        
        .theme-toggle, .mobile-menu-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: var(--input-bg);
          color: var(--light);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }

        .theme-toggle:hover, .mobile-menu-btn:hover {
            border-color: var(--primary);
            color: var(--primary);
        }
        
        .mobile-menu-btn {
          display: none;
          font-size: 1.2rem;
        }
        
        /* Mobile Menu Styling */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100vh;
          background: var(--nav-bg);
          backdrop-filter: blur(20px);
          z-index: 999;
          transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 100px 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .mobile-menu.active {
          right: 0;
        }

        .mobile-search {
            position: relative;
            width: 100%;
        }

        .mobile-search input {
            width: 100%;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            border: 1px solid var(--border-color);
            background: var(--input-bg);
            color: var(--light);
        }

        .mobile-search i {
            position: absolute;
            right: 1.5rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray);
        }

        .mobile-links {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .mobile-links a {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--light);
            text-decoration: none;
            padding: 1rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 15px;
            background: rgba(255,255,255,0.05);
        }

        .mobile-links a.active {
            background: var(--primary);
            color: white;
        }

        .apk-btn-mobile {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            justify-content: center;
            margin-top: 1rem;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .desktop-only {
            display: none;
          }
          
          .mobile-menu-btn {
            display: flex;
          }

          .nav-container {
            padding: 0 5%;
          }
        }

        @media (max-width: 480px) {
          .logo span {
            display: none; /* Icon only logo on very small screens if needed, or just shrink font */
          }
          .logo span:first-of-type {
            display: inline; /* Keep "Free" */
          }
          .logo {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </nav>
  );
}








































































