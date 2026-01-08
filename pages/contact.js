import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="container">
          <h1>Contact Us</h1>
          
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <h2><i className="fas fa-envelope"></i> Email Support</h2>
                <p>For general inquiries and support:</p>
                <a href="mailto:support@freestream.com">support@freestream.com</a>
                <p className="response-time">Response: Within 24 hours</p>
              </div>
              
              <div className="info-card">
                <h2><i className="fas fa-gavel"></i> Legal Matters</h2>
                <p>For DMCA, copyright, and legal issues:</p>
                <a href="mailto:legal@freestream.com">legal@freestream.com</a>
                <p className="response-time">Response: Within 48 hours</p>
              </div>
              
              <div className="info-card">
                <h2><i className="fas fa-user-shield"></i> Privacy Concerns</h2>
                <p>For privacy policy and data protection:</p>
                <a href="mailto:privacy@freestream.com">privacy@freestream.com</a>
                <p className="response-time">Response: Within 48 hours</p>
              </div>
              
              <div className="info-card">
                <h2><i className="fas fa-bug"></i> Report Issues</h2>
                <p>To report technical problems or bugs:</p>
                <a href="mailto:bugs@freestream.com">bugs@freestream.com</a>
                <p className="response-time">Response: Within 24 hours</p>
              </div>
            </div>
            
            <div className="contact-form-container">
              <div className="contact-form">
                <h2>Send us a Message</h2>
                
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Your name" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Your email address" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject">
                    <option value="">Select a topic</option>
                    <option value="support">Technical Support</option>
                    <option value="content">Content Issue</option>
                    <option value="legal">Legal Inquiry</option>
                    <option value="privacy">Privacy Concern</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>
                
                <button className="submit-btn">
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </div>
            </div>
          </div>
          
          <div className="notice-box">
            <h3><i className="fas fa-info-circle"></i> Important Notice</h3>
            <p>We do not host content directly. For content removal requests, please use the DMCA process. For content suggestions or issues with third-party streams, contact the respective content providers.</p>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .contact-page {
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
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .contact-info {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .info-card {
          background: rgba(255,255,255,0.05);
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid var(--primary);
        }
        
        .info-card h2 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: var(--light);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .info-card p {
          color: var(--gray);
          margin-bottom: 0.5rem;
        }
        
        .info-card a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .response-time {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .contact-form-container {
          background: rgba(255,255,255,0.05);
          padding: 2rem;
          border-radius: 8px;
        }
        
        .contact-form h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--light);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--gray);
          font-weight: 500;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          color: var(--light);
          font-size: 1rem;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
        }
        
        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: var(--gradient);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: var(--transition);
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3);
        }
        
        .notice-box {
          background: rgba(255, 193, 7, 0.1);
          border-left: 4px solid #ffc107;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 2rem;
        }
        
        .notice-box h3 {
          color: #ffc107;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .notice-box p {
          color: var(--gray);
          line-height: 1.6;
        }
        
        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .contact-page {
            padding: 1rem;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          .contact-form-container {
            padding: 1.5rem;
          }
          
          .info-card {
            padding: 1.2rem;
          }
        }
        
        @media (max-width: 480px) {
          .contact-grid {
            gap: 1.5rem;
          }
          
          .info-card h2 {
            font-size: 1.1rem;
          }
          
          .contact-form h2 {
            font-size: 1.3rem;
          }
          
          .form-group input,
          .form-group select,
          .form-group textarea {
            padding: 0.7rem;
          }
        }
      `}</style>
    </>
  );
}