import Head from 'next/head';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Free Streaming Support</title>
        <meta name="description" content="Contact Free Streaming for support, streaming issues, or partnership inquiries. We're here to help 24/7." />
        <meta name="keywords" content="contact streaming support, movie streaming help, cinema support, streaming issues contact" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Contact Free Streaming Support",
              "description": "Get support for streaming issues or contact us for partnership inquiries",
              "datePublished": new Date().toISOString().split('T')[0],
              "dateModified": new Date().toISOString(),
              "author": {
                "@type": "Organization",
                "name": "Free Streaming"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Free Streaming",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://freestreaming.vercel.app/logo.png"
                }
              }
            })
          }}
        />
      </Head>

      <section className="contact-section">
        <style jsx>{`
          .contact-section {
            min-height: 100vh;
            background: linear-gradient(to bottom, #0f0f23 0%, #000000 100%);
            padding: 60px 0;
            color: white;
          }
          
          .container {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            padding: 0 20px;
          }
          
          .text-center {
            text-align: center;
            margin-bottom: 60px;
          }
          
          .main-title {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 20px;
            color: white;
          }
          
          @media (max-width: 768px) {
            .main-title {
              font-size: 36px;
            }
          }
          
          // .gradient-text {
          //   background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
          //   -webkit-background-clip: text;
          //   -webkit-text-fill-color: transparent;
          //   background-clip: text;
          // }
          
          .main-description {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.7);
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
          }
          
          .grid-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          @media (min-width: 992px) {
            .grid-container {
              grid-template-columns: 1fr 1fr;
              gap: 40px;
            }
          }
          
          .card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
          
          .card-title {
            font-size: 28px;
            font-weight: 700;
            color: white;
            margin-bottom: 25px;
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          .form-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          @media (min-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
          
          .form-label {
            display: block;
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            margin-bottom: 8px;
          }
          
          .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 14px 16px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            color: white;
            font-size: 16px;
            transition: all 0.3s ease;
          }
          
          .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
          }
          
          .form-textarea {
            min-height: 150px;
            resize: vertical;
            font-family: inherit;
          }
          
          .btn-primary {
            display: block;
            width: 100%;
            padding: 18px;
            background: linear-gradient(90deg, #3b82f6, #2563eb);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
          }
          
          .contact-info {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }
          
          .info-item {
            display: flex;
            align-items: flex-start;
            gap: 20px;
          }
          
          .info-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          
          .icon-email {
            background: rgba(59, 130, 246, 0.2);
          }
          
          .icon-clock {
            background: rgba(16, 185, 129, 0.2);
          }
          
          .icon-location {
            background: rgba(236, 72, 153, 0.2);
          }
          
          .info-content h4 {
            font-size: 20px;
            font-weight: 600;
            color: white;
            margin-bottom: 8px;
          }
          
          .info-content p {
            color: rgba(255, 255, 255, 0.7);
            margin: 4px 0;
          }
          
          .info-content .small-text {
            font-size: 14px;
          }
          
          .faq-item {
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 20px;
          }
          
          .faq-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          
          .faq-question {
            font-size: 18px;
            font-weight: 600;
            color: white;
            margin-bottom: 10px;
          }
          
          .faq-answer {
            color: rgba(255, 255, 255, 0.7);
            font-size: 15px;
            line-height: 1.6;
          }
          
          .back-link-container {
            text-align: center;
            margin-top: 60px;
          }
          
          .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 15px 30px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          
          .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
          }
          
          .icon {
            font-size: 18px;
            color: inherit;
          }
        `}</style>

        <div className="container">
          <div className="text-center">
            <h1 className="main-title">
              Contact <span className="gradient-text">Support</span>
            </h1>
            <p className="main-description">
              Need help with streaming? Have questions about our schedule? We're here to help!
            </p>
          </div>

          <div className="grid-container">
            {/* Contact Form */}
            <div className="card">
              <h2 className="card-title"><span className="gradient-text">Send us a Message </span>

              </h2>
              
              <form className="contact-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="John"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-select">
                    <option value="">Select a topic</option>
                    <option value="streaming">Streaming Issues</option>
                    <option value="schedule">Schedule Questions</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    rows="5"
                    className="form-textarea"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="card">
                <h3 className="card-title"><span className="gradient-text">Contact Information </span></h3>
                
                <div className="contact-info-items">
                  <div className="info-item">
                    <div className="info-icon icon-email">
                      <FaEnvelope className="icon" style={{color: '#3b82f6'}} />
                    </div>
                    <div className="info-content">
                      <h4>Email & Business Enquiry For Advertisement.</h4>
                      <p>officialcapitalroot@gmail.com</p>
                      <p className="small-text">We Will Response within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon icon-clock">
                      <FaClock className="icon" style={{color: '#10b981'}} />
                    </div>
                    <div className="info-content">
                      <h4>Support Hours</h4>
                      <p>24/7 Streaming Support</p>
                      <p className="small-text">Live chat available during stream times</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon icon-location">
                      <FaMapMarkerAlt className="icon" style={{color: '#ec4899'}} />
                    </div>
                    <div className="info-content">
                      <h4>Based In</h4>
                      <p>All over the glob</p>
                      <p className="small-text">Serving viewers worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="card">
                <h3 className="card-title"><span className="gradient-text">Common Questions </span></h3>
                
                <div className="faq-list">
                  <div className="faq-item">
                    <h4 className="faq-question">When do movies stream?</h4>
                    <p className="faq-answer">
                      Movies stream at fixed scheduled GMT time daily.
                    </p>
                  </div>
                  
                  <div className="faq-item">
                    <h4 className="faq-question">Is streaming really free?</h4>
                    <p className="faq-answer">
                      Yes! All our movies are completely free to watch during their scheduled times.
                    </p>
                  </div>
                  
                  <div className="faq-item">
                    <h4 className="faq-question">Do I need to register?</h4>
                    <p className="faq-answer">
                      No registration required. Just visit our site and watch instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="back-link-container">
            <Link href="/" className="btn-secondary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}