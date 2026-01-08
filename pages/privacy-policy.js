import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="legal-page">
        <div className="container">
          <h1>Privacy Policy</h1>
          <div className="content">
            <section>
              <h2>1. Information We Collect</h2>
              <p>We collect minimal data to provide our streaming services:</p>
              <ul>
                <li>Device information for compatibility</li>
                <li>Viewing preferences for recommendations</li>
                <li>Anonymous usage statistics</li>
                <li>IP address for regional content</li>
              </ul>
            </section>
            
            <section>
              <h2>2. How We Use Your Information</h2>
              <p>Your information helps us:</p>
              <ul>
                <li>Improve streaming quality</li>
                <li>Personalize content recommendations</li>
                <li>Provide regional content access</li>
                <li>Enhance user experience</li>
                <li>Monitor service performance</li>
              </ul>
            </section>
            
            <section>
              <h2>3. Data Protection</h2>
              <p>We implement security measures including:</p>
              <ul>
                <li>Secure server connections</li>
                <li>Limited data retention periods</li>
                <li>No personal data sharing with third parties</li>
                <li>Regular security audits</li>
              </ul>
            </section>
            
            <section>
              <h2>4. Third-Party Services</h2>
              <p>We use third-party services for:</p>
              <ul>
                <li>Content delivery networks</li>
                <li>Analytics and performance monitoring</li>
                <li>Advertisement services (when applicable)</li>
                <li>Stream hosting services</li>
              </ul>
            </section>
            
            <section>
              <h2>5. User Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Request data access</li>
                <li>Opt-out of data collection</li>
                <li>Delete account data</li>
                <li>Modify viewing preferences</li>
              </ul>
            </section>
            
            <section>
              <h2>6. Children's Privacy</h2>
              <p>Our service is not intended for children under 13. We do not knowingly collect data from children.</p>
            </section>
            
            <section>
              <h2>7. Policy Updates</h2>
              <p>We may update this policy periodically. Continued use of our service constitutes acceptance of changes.</p>
            </section>
            
            <section>
              <h2>8. Contact Information</h2>
              <p>For privacy concerns, contact us at: privacy@freestream.com</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .legal-page {
          padding: 2rem 5%;
          background: var(--darker);
          color: var(--light);
          min-height: calc(100vh - 200px);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: var(--primary);
          text-align: center;
        }
        
        h2 {
          font-size: 1.5rem;
          margin: 2rem 0 1rem;
          color: var(--light);
        }
        
        .content {
          line-height: 1.8;
          color: var(--gray);
        }
        
        section {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
        }
        
        ul {
          padding-left: 2rem;
          margin: 1rem 0;
        }
        
        li {
          margin-bottom: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .legal-page {
            padding: 1rem;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          h2 {
            font-size: 1.3rem;
          }
          
          section {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
}