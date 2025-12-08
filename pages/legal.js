import Head from 'next/head';
import Link from 'next/link';
import { FaExclamationCircle, FaFilm, FaGlobe, FaInfoCircle, FaUserShield } from 'react-icons/fa';

export default function LegalDisclaimerPage() {
  return (
    <>
      <Head>
        <title>Legal Disclaimer | Free Streaming - Important Legal Information</title>
        <meta name="description" content="Free Streaming Legal Disclaimer. Important legal information about our streaming service, content, and user responsibilities." />
        <meta name="keywords" content="legal disclaimer, streaming disclaimer, movie disclaimer, legal notice, streaming legal, copyright disclaimer" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Legal Disclaimer | Free Streaming" />
        <meta property="og:description" content="Important legal information about our streaming service" />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Legal Disclaimer",
              "description": "Legal Disclaimer for Free Streaming",
              "publisher": {
                "@type": "Organization",
                "name": "Free Streaming"
              }
            })
          }}
        />
      </Head>

      <section className="disclaimer-page">
        <style jsx>{`
          .disclaimer-page {
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
          //   background: linear-gradient(90deg, #f59e0b, #ef4444);
          //   -webkit-background-clip: text;
          //   -webkit-text-fill-color: transparent;
          //   background-clip: text;
          // }
          
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
            color: #f59e0b;
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
            color: #f59e0b;
            position: absolute;
            left: 0;
          }
          
          .important-notice {
            background: rgba(239, 68, 68, 0.15);
            border: 2px solid #ef4444;
            padding: 25px;
            margin: 30px 0;
            border-radius: 12px;
            text-align: center;
          }
          
          .important-notice h3 {
            color: #ef4444;
            font-size: 22px;
            margin-bottom: 15px;
          }
          
          .warning-box {
            background: rgba(245, 158, 11, 0.1);
            border-left: 4px solid #f59e0b;
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
              Legal <span className="gradient-text">Disclaimer</span>
            </h1>
            <p className="description">
              Important legal information about Free Streaming and its streaming service
            </p>
          </div>

          <div className="important-notice">
            <FaExclamationCircle style={{ fontSize: '32px', color: '#ef4444', marginBottom: '15px' }} />
            <h3><span className="gradient-text">IMPORTANT LEGAL NOTICE</span></h3>
            <p>This website provides free movie streaming. By using this service, you acknowledge and accept the terms of this disclaimer.</p>
          </div>

          <div className="content-card">
            <h2 className="section-title">
            <FaFilm className="section-icon" /><span className="gradient-text">  
              Content Disclaimer</span>
            </h2>
            <div className="section-content">
              <h3>Streaming Service Nature</h3>
              <p>Free Streaming is a free streaming platform that:</p>
              <ul>
                <li>Streams movies at scheduled times</li>
                <li>Does not host permanent movie files</li>
                <li>Operates as a live streaming service</li>
                <li>Follows scheduled programming like traditional TV</li>
              </ul>
              
              <div className="warning-box">
                <p><strong>Content Accuracy:</strong> We strive for accurate movie information but don't guarantee metadata, descriptions, or schedule accuracy.</p>
              </div>
              
              <h3>Movie Licensing</h3>
              <ul>
                <li>We stream movies that are in the public domain</li>
                <li>Some content may be licensed for public exhibition</li>
                <li>We respect copyright and intellectual property rights</li>
                <li>Content availability may vary by region</li>
              </ul>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaGlobe className="section-icon" />
             <span className="gradient-text"> Regional Restrictions</span>
            </h2>
            <div className="section-content">
              <h3>Geographic Limitations</h3>
              <p>Free Streaming may be subject to geographic restrictions:</p>
              <ul>
                <li>Some content may not be available in all countries</li>
                <li>Streaming quality may vary by region</li>
                <li>Access may be limited in certain jurisdictions</li>
              </ul>
              
              <h3>User Responsibility</h3>
              <p>Users are responsible for:</p>
              <ul>
                <li>Complying with local laws and regulations</li>
                <li>Ensuring content access is legal in their region</li>
                <li>Any consequences of accessing restricted content</li>
              </ul>
              
              <div className="info-box">
                <p><strong>Note:</strong> We use geolocation to provide appropriate content based on your location.</p>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaUserShield className="section-icon" />
            <span className="gradient-text"> User Responsibilities </span>
            </h2>
            <div className="section-content">
              <h3>Legal Compliance</h3>
              <p>Users must:</p>
              <ul>
                <li>Use the service in compliance with applicable laws</li>
                <li>Respect copyright and intellectual property rights</li>
                <li>Not redistribute or record streams without permission</li>
                <li>Not use the service for commercial purposes</li>
              </ul>
              
              <h3>Age Restrictions</h3>
              <ul>
                <li>Users must be at least 13 years old</li>
                <li>Some content may be inappropriate for children</li>
                <li>Parental guidance is recommended for younger viewers</li>
              </ul>
              
              <div className="warning-box">
                <p> <span className="gradient-text"><strong>Warning:</strong> Unauthorized redistribution of our streams may result in legal action and IP blocking. </span></p>
              </div>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaInfoCircle className="section-icon" />
             <span className="gradient-text">  Service Limitations </span>
            </h2>
            <div className="section-content">
              <h3>Technical Limitations</h3>
              <ul>
                <li>Stream quality depends on your internet connection</li>
                <li>Service may be interrupted for maintenance</li>
                <li>We don't guarantee 100% uptime</li>
                <li>Schedules may change without notice</li>
              </ul>
              
              <h3>Content Limitations</h3>
              <ul>
                <li>We don't guarantee specific movie availability</li>
                <li>Movie schedules are subject to change</li>
                <li>Content may be removed or replaced at any time</li>
                <li>We reserve the right to modify our service</li>
              </ul>
              
              <h3>No Warranties</h3>
              <p>The service is provided "as is" without warranties of any kind. We don't guarantee:</p>
              <ul>
                <li>Content accuracy or quality</li>
                <li>Uninterrupted service</li>
                <li>Error-free streaming</li>
                <li>Specific features or functionality</li>
              </ul>
            </div>
          </div>

          <div className="content-card">
            <h2 className="section-title">
              <FaExclamationCircle className="section-icon" />
            <span className="gradient-text">  Contact & Complaints </span>
            </h2>
            <div className="section-content">
              <h3>Legal Inquiries</h3>
              <p>For legal matters, contact:</p>
              <div className="info-box">
                <p><strong>Email:</strong> legal@freestreamcinema.com</p>
                <p><strong>Mail:</strong> Free Streaming Legal Department, Los Angeles, CA</p>
                <p><strong>Response Time:</strong> We aim to respond within 30 business days</p>
              </div>
              
              <h3>Copyright Claims</h3>
              <p>For copyright infringement claims, provide:</p>
              <ul>
                <li>Identification of the copyrighted work</li>
                <li>URL of the alleged infringement</li>
                <li>Your contact information</li>
                <li>A statement of good faith belief</li>
                <li>Your electronic signature</li>
              </ul>
              
              <p>We comply with the Digital Millennium Copyright Act (DMCA) and similar international laws.</p>
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