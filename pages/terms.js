import Head from 'next/head';
import Link from 'next/link';
import { FaGavel, FaUserCheck, FaBan, FaExclamationTriangle, FaBalanceScale } from 'react-icons/fa';

export default function TermsOfServicePage() {
  return (
    <>
      <Head>
        <title>Terms of Service | FreeStream Cinema - User Agreement & Terms</title>
        <meta name="description" content="FreeStream Cinema Terms of Service. Read our user agreement, terms of use, and legal conditions for using our streaming platform." />
        <meta name="keywords" content="terms of service, user agreement, terms of use, streaming terms, legal agreement, movie streaming terms" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Terms of Service | FreeStream Cinema" />
        <meta property="og:description" content="User agreement and terms for using our streaming service" />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Terms of Service",
              "description": "Terms of Service for FreeStream Cinema",
              "publisher": {
                "@type": "Organization",
                "name": "FreeStream Cinema"
              }
            })
          }}
        />
      </Head>

      <section className="terms-page">
        <style jsx>{`
          .terms-page {
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
          //   background: linear-gradient(90deg, #10b981, #3b82f6);
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
            color: #10b981;
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
            color: #10b981;
            position: absolute;
            left: 0;
          }
          
          .warning-box {
            background: rgba(239, 68, 68, 0.1);
            border-left: 4px solid #ef4444;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
          }
          
          .info-box {
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
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="last-updated">Effective Date: December 2024</p>
            <p className="description">
              Please read these Terms of Service carefully before using FreeStream Cinema.
            </p>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaUserCheck className="section-icon" />
            <span className="gradient-text"> Acceptance of Terms </span>
             </h2>
            <div className="section-content">
              <p>By accessing or using FreeStream Cinema, you agree to be bound by these Terms of Service.</p>
              
              <h3>Eligibility</h3>
              <ul>
                <li>You must be at least 13 years old to use our service</li>
                <li>You agree to comply with all applicable laws</li>
                <li>You accept responsibility for all activities under your IP address</li>
              </ul>
              
              <div className="info-box">
                <p><strong>Note:</strong> No account registration is required to use our service. By accessing our website, you automatically agree to these terms.</p>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaBan className="section-icon" />
               <span className="gradient-text"> Prohibited Activities </span>
            </h2>
            <div className="section-content">
              <p>You agree not to:</p>
              <ul>
                <li>Use automated bots or scripts to access our service</li>
                <li>Attempt to disrupt or interfere with our streaming service</li>
                <li>Reverse engineer, decompile, or disassemble any part of our service</li>
                <li>Use our service for any illegal purposes</li>
                <li>Redistribute our streams without authorization</li>
                <li>Attempt to bypass regional restrictions or access controls</li>
              </ul>
              
              <div className="warning-box">
                <p><strong>Violation Consequences:</strong> We reserve the right to block IP addresses violating these terms without notice.</p>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaExclamationTriangle className="section-icon" />
               <span className="gradient-text"> Service Disclaimer </span>
            </h2>
            <div className="section-content">
              <h3>Service Availability</h3>
              <ul>
                <li>We strive for 24/7 availability but don't guarantee uninterrupted service</li>
                <li>Scheduled maintenance may temporarily disrupt service</li>
                <li>Stream quality may vary based on your internet connection</li>
              </ul>
              
              <h3>Content Disclaimer</h3>
              <ul>
                <li>We stream movies at scheduled times as a service</li>
                <li>Movie schedules are subject to change without notice</li>
                <li>We don't guarantee availability of specific movies</li>
              </ul>
              
              <p>FreeStream Cinema is a free streaming platform. We don't charge users for access to our service.</p>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaBalanceScale className="section-icon" />
              <span className="gradient-text">  Intellectual Property Rights </span>
            </h2>
            <div className="section-content">
              <h3>Our Rights</h3>
              <ul>
                <li>FreeStream Cinema name and logo are our trademarks</li>
                <li>Website design and code are our intellectual property</li>
                <li>Scheduling system and streaming technology are proprietary</li>
              </ul>
              
              <h3>Movie Content</h3>
              <p>The movies streamed on our platform are:</p>
              <ul>
                <li>Licensed for public streaming where applicable</li>
                <li>Available in the public domain when possible</li>
                <li>Streamed under appropriate legal frameworks</li>
              </ul>
              
              <div className="info-box">
                <p><strong>Copyright Claims:</strong> If you believe your copyright has been infringed, contact us at copyright@freestreamcinema.com with detailed information.</p>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaGavel className="section-icon" />
              <span className="gradient-text">  Limitation of Liability </span>
            </h2>
            <div className="section-content">
              <p>FreeStream Cinema shall not be liable for:</p>
              <ul>
                <li>Any direct, indirect, or consequential damages</li>
                <li>Loss of data or privacy breaches</li>
                <li>Service interruptions or technical issues</li>
                <li>Content accuracy or availability</li>
                <li>Third-party actions or content</li>
              </ul>
              
              <h3>Jurisdiction</h3>
              <p>These Terms shall be governed by the laws of the United States. Any disputes shall be resolved in courts located in California.</p>
              
              <h3>Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.</p>
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