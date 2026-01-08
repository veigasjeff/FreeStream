import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <>
    <Navbar />
    <div className="page-wrapper">
      
      <main className="page-content legal-page">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Terms of Service</h1>
            <p className="page-subtitle">Rules and guidelines for using FreeStream</p>
            <p className="effective-date">Last Updated: January 1, 2026</p>
          </div>
          
          <div className="legal-content">
            <section className="legal-section">
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing or using FreeStream, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must immediately discontinue use of our service.</p>
            </section>
            
            <section className="legal-section">
              <h2>2. Service Description</h2>
              <p>FreeStream provides free streaming of movies, TV shows, live sports, and news channels. We operate as a content aggregator, sourcing content from various third-party providers. We do not host any content on our own servers and act solely as an intermediary service.</p>
            </section>
            
            <section className="legal-section">
              <h2>3. User Responsibilities</h2>
              <p>By using our service, you agree to:</p>
              <ul>
                <li>Use the service only in jurisdictions where such use is legal</li>
                <li>Not engage in copyright infringement or piracy</li>
                <li>Not use automated tools, bots, or scrapers to access our service</li>
                <li>Respect all intellectual property rights of content owners</li>
                <li>Not redistribute, reproduce, or commercially exploit content</li>
                <li>Not attempt to bypass any security or access controls</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
              </ul>
            </section>
            
            <section className="legal-section">
              <h2>4. Content Disclaimer</h2>
              <p>All content available through FreeStream is provided by third-party services. We make no representations or warranties regarding:</p>
              <ul>
                <li>Content availability, quality, or reliability</li>
                <li>Accuracy of metadata, descriptions, or ratings</li>
                <li>Continuous, uninterrupted service availability</li>
                <li>Legality of specific content in your jurisdiction</li>
                <li>Safety from malware, viruses, or harmful components</li>
                <li>Completeness of content libraries or collections</li>
              </ul>
            </section>
            
            <section className="legal-section">
              <h2>5. Intellectual Property Rights</h2>
              <p>FreeStream™ and our logo are trademarks owned by us. All third-party content, including movies, TV shows, and other media, remains the property of their respective copyright holders. We claim no ownership over any content streamed through our service.</p>
            </section>
            
            <section className="legal-section">
              <h2>6. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, we shall not be liable for:</p>
              <ul>
                <li>Any direct, indirect, incidental, or consequential damages</li>
                <li>Loss of data, revenue, or business opportunities</li>
                <li>Service interruptions, downtime, or technical failures</li>
                <li>Actions or content of third-party providers</li>
                <li>User violations of laws or these terms</li>
                <li>Any damages resulting from service use or inability to use</li>
              </ul>
            </section>
            
            <section className="legal-section">
              <h2>7. Account Termination</h2>
              <p>We reserve the right to terminate or suspend access to our service without prior notice for:</p>
              <ul>
                <li>Violation of these Terms of Service</li>
                <li>Suspected illegal activity or copyright infringement</li>
                <li>Abuse or misuse of our service</li>
                <li>Technical or security reasons</li>
                <li>Non-compliance with applicable laws</li>
                <li>At our sole discretion for any reason</li>
              </ul>
            </section>
            
            <section className="legal-section">
              <h2>8. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Continued use of our service after changes constitutes acceptance of the revised terms. We encourage regular review of these terms.</p>
            </section>
            
            <section className="legal-section">
              <h2>9. Governing Law & Dispute Resolution</h2>
              <p>These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or service use shall be resolved in the appropriate jurisdiction. By using our service, you agree to submit to the jurisdiction of relevant courts.</p>
            </section>
            
            <section className="legal-section">
              <h2>10. Contact Information</h2>
              <div className="contact-box">
                <p><strong>Legal Department:</strong> Terms of Service Inquiries</p>
                <p><strong>Email:</strong> legal@freestream.com</p>
                <p><strong>Response Time:</strong> We aim to respond within 48 business hours</p>
                <p><strong>Notice Address:</strong> Legal notices should be sent via registered mail</p>
              </div>
            </section>
            
            <section className="legal-section">
              <h2>11. Severability</h2>
              <p>If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. The invalid provision shall be replaced by a valid provision that most closely matches the intent of the original.</p>
            </section>
            
            <section className="legal-section">
              <h2>12. No Waiver</h2>
              <p>Our failure to enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision. Any waiver must be in writing and signed by an authorized representative.</p>
            </section>
            
            <section className="legal-section">
              <h2>13. Entire Agreement</h2>
              <p>These Terms of Service constitute the entire agreement between you and FreeStream regarding our service, superseding any prior agreements. These terms prevail over any conflicting terms in other communications or documents.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--darker);
        }
        
        .page-content {
          flex: 1;
          padding: 2rem 5%;
          background: var(--darker);
          color: var(--light);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid var(--border-color);
        }
        
        .page-title {
          font-size: 2.8rem;
          margin-bottom: 0.5rem;
          color: var(--primary);
          font-weight: 800;
          background: linear-gradient(45deg, var(--primary), #ff2e63);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .page-subtitle {
          font-size: 1.2rem;
          color: var(--gray);
          margin-bottom: 0.5rem;
        }
        
        .effective-date {
          color: var(--gray);
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .legal-content {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .legal-section {
          margin-bottom: 2.5rem;
          padding: 2rem;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
          transition: var(--transition);
        }
        
        .legal-section:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(229, 9, 20, 0.3);
        }
        
        .legal-section h2 {
          font-size: 1.6rem;
          margin-bottom: 1.2rem;
          color: var(--light);
          display: flex;
          align-items: center;
        }
        
        .legal-section h2:before {
          content: "•";
          color: var(--primary);
          font-size: 2rem;
          margin-right: 0.8rem;
        }
        
        .legal-section p {
          color: var(--gray);
          line-height: 1.7;
          margin-bottom: 1.2rem;
          font-size: 1.05rem;
        }
        
        ul {
          padding-left: 2.2rem;
          margin: 1.2rem 0;
          color: var(--gray);
        }
        
        li {
          margin-bottom: 0.8rem;
          line-height: 1.6;
          padding-left: 0.5rem;
        }
        
        .contact-box {
          background: rgba(229, 9, 20, 0.1);
          border-left: 4px solid var(--primary);
          padding: 1.5rem;
          margin: 1.5rem 0;
          border-radius: 8px;
          border: 1px solid rgba(229, 9, 20, 0.2);
        }
        
        .contact-box p {
          margin-bottom: 0.8rem;
          color: var(--light-gray);
        }
        
        .contact-box strong {
          color: var(--light);
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .page-content {
            padding: 1.5rem;
          }
          
          .page-title {
            font-size: 2.2rem;
          }
          
          .legal-section {
            padding: 1.5rem;
          }
          
          .legal-section h2 {
            font-size: 1.4rem;
          }
        }
        
        @media (max-width: 480px) {
          .page-title {
            font-size: 2rem;
          }
          
          .page-subtitle {
            font-size: 1.1rem;
          }
          
          .legal-section {
            padding: 1.2rem;
          }
          
          .legal-section h2 {
            font-size: 1.3rem;
          }
          
          ul {
            padding-left: 1.8rem;
          }
        }
      `}</style>
    </div>
    </>
  );
}