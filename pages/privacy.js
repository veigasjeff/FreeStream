import Head from 'next/head';
import Link from 'next/link';
import { FaShieldAlt, FaUserLock, FaDatabase, FaCookie, FaEye } from 'react-icons/fa';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | FreeStream Cinema - Data Protection & Privacy</title>
        <meta name="description" content="FreeStream Cinema Privacy Policy. Learn how we protect your data, our cookie policy, and your privacy rights when using our streaming service." />
        <meta name="keywords" content="privacy policy, data protection, cookie policy, streaming privacy, movie streaming privacy, GDPR compliance" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy | FreeStream Cinema" />
        <meta property="og:description" content="Learn how we protect your data and your privacy rights" />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Privacy Policy",
              "description": "Privacy Policy for FreeStream Cinema",
              "publisher": {
                "@type": "Organization",
                "name": "FreeStream Cinema"
              }
            })
          }}
        />
      </Head>

      <section className="privacy-page">
        <style jsx>{`
          .privacy-page {
            min-height: 100vh;
            background: linear-gradient(to bottom, #0f0f23 0%, #000000 100%);
            color: white;
            padding: 60px 0;
          }
          
          .container {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            padding: 0 20px;
          }
          
          .header {
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
          //   background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          //   -webkit-background-clip: text;
          //   -webkit-text-fill-color: transparent;
          //   background-clip: text;
          // }
          
          .last-updated {
            color: rgba(255, 255, 255, 0.7);
            font-size: 16px;
            margin-bottom: 10px;
          }
          
          .description {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.7);
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
          }
          
          .content-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
          
          .section-title {
            font-size: 28px;
            font-weight: 700;
            color: white;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .section-icon {
            color: #3b82f6;
          }
          
          .section-content {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.8;
          }
          
          .section-content h3 {
            color: white;
            font-size: 20px;
            font-weight: 600;
            margin: 25px 0 15px 0;
          }
          
          .section-content p {
            margin-bottom: 15px;
          }
          
          .section-content ul {
            margin: 15px 0;
            padding-left: 20px;
          }
          
          .section-content li {
            margin-bottom: 10px;
            position: relative;
            padding-left: 15px;
          }
          
          .section-content li:before {
            content: "•";
            color: #3b82f6;
            position: absolute;
            left: 0;
          }
          
          .contact-info-box {
            background: rgba(59, 130, 246, 0.1);
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
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
        `}</style>

        <div className="container">
          <div className="header">
            <h1 className="main-title">
              <span className="gradient-text">Privacy</span> Policy
            </h1>
            <p className="last-updated">Last Updated: December 2024</p>
            <p className="description">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaShieldAlt className="section-icon" />
            <span className="gradient-text">  Information We Collect </span>
            </h2>
            <div className="section-content">
              <p>At FreeStream Cinema, we respect your privacy. We collect minimal information to provide and improve our service:</p>
              
              <h3>Automatically Collected Information</h3>
              <ul>
                <li>Device information (browser type, operating system)</li>
                <li>IP address for geographical analytics</li>
                <li>Streaming preferences and watch history</li>
                <li>Technical data about stream quality and performance</li>
              </ul>
              
              <h3>Information You Provide</h3>
              <ul>
                <li>Contact information when you use our contact form</li>
                <li>Feedback and support requests</li>
                <li>Movie requests and preferences</li>
              </ul>
              
              <div className="contact-info-box">
                <p><strong>Important:</strong> We do not require registration or login to watch movies. You can enjoy our service completely anonymously.</p>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaCookie className="section-icon" />
             <span className="gradient-text"> Cookies & Tracking </span>
            </h2>
            <div className="section-content">
              <h3>Essential Cookies</h3>
              <p>We use necessary cookies for basic website functionality:</p>
              <ul>
                <li>Session management for uninterrupted streaming</li>
                <li>Security features and bot prevention</li>
                <li>Load balancing for optimal performance</li>
              </ul>
              
              <h3>Analytics Cookies</h3>
              <p>We use analytics to improve our service:</p>
              <ul>
                <li>Popular movie tracking to schedule content</li>
                <li>Performance monitoring to fix streaming issues</li>
                <li>Anonymous usage statistics</li>
              </ul>
              
              <p>You can control cookies through your browser settings. Disabling cookies may affect streaming functionality.</p>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaDatabase className="section-icon" />
              <span className="gradient-text">  Data Usage & Protection </span>
            </h2>
            <div className="section-content">
              <h3>How We Use Your Data</h3>
              <ul>
                <li>Provide and maintain streaming service</li>
                <li>Improve movie recommendations</li>
                <li>Fix technical issues and optimize performance</li>
                <li>Respond to support requests</li>
                <li>Analyze usage patterns for better scheduling</li>
              </ul>
              
              <h3>Data Security</h3>
              <p>We implement industry-standard security measures:</p>
              <ul>
                <li>Encryption of data in transit</li>
                <li>Secure server infrastructure</li>
                <li>Regular security audits</li>
                <li>Access controls and monitoring</li>
              </ul>
              
              <h3>Third-Party Services</h3>
              <p>We only share data with:</p>
              <ul>
                <li>Streaming infrastructure providers</li>
                <li>Analytics services (anonymous data only)</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaUserLock className="section-icon" />
              <span className="gradient-text">  Your Rights </span>
            </h2>
            <div className="section-content">
              <h3>Privacy Rights</h3>
              <ul>
                <li>Right to access your personal data</li>
                <li>Right to request data deletion</li>
                <li>Right to opt-out of analytics</li>
                <li>Right to data portability</li>
              </ul>
              
              <h3>Exercising Your Rights</h3>
              <p>To exercise your privacy rights, contact us at:</p>
              <div className="contact-info-box">
                <p><strong>Email:</strong> privacy@freestreamcinema.com</p>
                <p><strong>Response Time:</strong> We aim to respond within 30 days</p>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaEye className="section-icon" />
              <span className="gradient-text">  Changes to This Policy </span>
            </h2>
            <div className="section-content">
              <p>We may update this Privacy Policy periodically. We will notify users of significant changes by:</p>
              <ul>
                <li>Posting a notice on our website</li>
                <li>Updating the "Last Updated" date</li>
                <li>Emailing registered users (if applicable)</li>
              </ul>
              
              <p>Your continued use of FreeStream Cinema after changes constitutes acceptance of the updated policy.</p>
            </div>
          </div>

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