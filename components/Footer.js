export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <i className="fas fa-play-circle"></i>
            <span>Free<span className="logo-highlight">Stream™</span></span>
          </div>
          <p className="footer-description">
            Watch free movies, TV shows, live sports and news channels in HD quality without any subscription.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/categories">Categories</a>
          <a href="/languages">Languages</a>
        </div>
        
        <div className="footer-section">
          <h3>Legal</h3>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/dmca">DMCA</a>
          <a href="/contact">Contact Us</a>
        </div>
        
        <div className="footer-section">
          <h3>Download App</h3>
          <p>Get our Android app for better experience</p>
          <a href="https://median.co/share/pwwoxpk" className="download-btn">
            <i className="fab fa-android"></i> Download APK
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 FreeStream™. All content is provided for entertainment purposes only.</p>
        <p className="disclaimer">
          Disclaimer: We do not host any content. All content is provided by third-party services.
        </p>
      </div>

      <style jsx>{`
        .footer {
          background: var(--darker);
          padding: clamp(2rem, 5vw, 4rem) 5% 2rem;
          border-top: 1px solid var(--border-color);
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(2rem, 4vw, 3rem);
          margin-bottom: 3rem;
        }
        
        .footer-section h3 {
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          color: var(--light);
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 1rem;
          color: var(--light);
        }
        
        .footer-description {
          color: var(--gray);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        
        .footer-section a {
          display: block;
          color: var(--gray);
          text-decoration: none;
          margin-bottom: 0.8rem;
          transition: var(--transition);
        }
        
        .footer-section a:hover {
          color: var(--primary);
          padding-left: 5px;
        }
        
        .download-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: var(--gradient);
          color: white;
          text-decoration: none;
          border-radius: var(--radius-sm);
          font-weight: 600;
          transition: var(--transition);
          margin-top: 0.5rem;
        }
        
        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3);
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }
        
        .footer-bottom p {
          color: var(--gray);
          margin-bottom: 0.5rem;
        }
        
        .disclaimer {
          font-size: 0.9rem;
          color: var(--gray);
          opacity: 0.7;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .footer-section {
            text-align: center;
          }
          
          .footer-logo {
            justify-content: center;
          }
          
          .footer-section a {
            margin-bottom: 0.5rem;
          }
          
          .download-btn {
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .footer {
            padding: 2rem 1rem 1.5rem;
          }
          
          .footer-logo {
            font-size: 1.5rem;
          }
          
          .footer-section h3 {
            font-size: 1.1rem;
            margin-bottom: 1rem;
          }
          
          .footer-description {
            font-size: 0.9rem;
          }
          
          .download-btn {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </footer>
  );
}