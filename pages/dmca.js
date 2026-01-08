import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DMCA() {
  return (
    <>
      <Navbar />
      <div className="legal-page">
        <div className="container">
          <h1>DMCA Notice & Takedown Policy</h1>
          <div className="content">
            <section>
              <h2>1. DMCA Compliance</h2>
              <p>FreeStream respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA).</p>
            </section>
            
            <section>
              <h2>2. Copyright Infringement Notification</h2>
              <p>To file a DMCA notice, provide:</p>
              <ul>
                <li>Physical or electronic signature of copyright owner</li>
                <li>Identification of infringed work</li>
                <li>URL of infringing material on our service</li>
                <li>Your contact information</li>
                <li>Statement of good faith belief of unauthorized use</li>
                <li>Statement under penalty of perjury that information is accurate</li>
              </ul>
            </section>
            
            <section>
              <h2>3. Where to Send Notices</h2>
              <p>DMCA notices should be sent to:</p>
              <div className="contact-box">
                <p><strong>Designated Agent:</strong> Copyright Compliance Department</p>
                <p><strong>Email:</strong> dmca@freestream.com</p>
                <p><strong>Response Time:</strong> 24-48 hours for valid notices</p>
              </div>
            </section>
            
            <section>
              <h2>4. Counter-Notification</h2>
              <p>If you believe content was removed in error, you may submit a counter-notification containing:</p>
              <ul>
                <li>Your physical or electronic signature</li>
                <li>Identification of removed content</li>
                <li>Statement under penalty of perjury of good faith belief</li>
                <li>Your contact information and consent to jurisdiction</li>
              </ul>
            </section>
            
            <section>
              <h2>5. Repeat Infringers</h2>
              <p>We terminate accounts of repeat infringers per DMCA requirements.</p>
            </section>
            
            <section>
              <h2>6. Content Removal Process</h2>
              <p>Upon valid DMCA notice:</p>
              <ol>
                <li>We promptly remove or disable access to infringing content</li>
                <li>We notify the content provider</li>
                <li>We may provide counter-notification information</li>
                <li>We maintain records as required by law</li>
              </ol>
            </section>
            
            <section>
              <h2>7. False Claims</h2>
              <p>Knowingly misrepresenting infringement may result in liability for damages.</p>
            </section>
            
            <section>
              <h2>8. Third-Party Content</h2>
              <p>We do not control third-party content but respond promptly to valid infringement notices.</p>
            </section>
            
            <section>
              <h2>9. Contact</h2>
              <p>For DMCA matters: dmca@freestream.com</p>
              <p>We respond within 24 hours on business days.</p>
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
        
        ul, ol {
          padding-left: 2rem;
          margin: 1rem 0;
        }
        
        li {
          margin-bottom: 0.5rem;
        }
        
        .contact-box {
          background: rgba(229, 9, 20, 0.1);
          border-left: 4px solid var(--primary);
          padding: 1rem;
          margin: 1rem 0;
          border-radius: 4px;
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