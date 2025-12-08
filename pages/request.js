import Head from 'next/head';
import Link from 'next/link';
import { FaTelegram, FaFilm, FaCalendarAlt, FaClock, FaUserFriends, FaPaperPlane } from 'react-icons/fa';

export default function RequestMoviePage() {
  const telegramLink = "https://t.me/onlyondemand";

  return (
    <>
      <Head>
        <title>Request Movie | FreeStream Cinema - Suggest Movies for Streaming</title>
        <meta name="description" content="Request movies for FreeStream Cinema. Suggest films you want to watch and help shape our streaming schedule. Join our Telegram channel to submit requests." />
        <meta name="keywords" content="request movie, suggest films, movie requests, streaming suggestions, film recommendations, Telegram movie requests" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Request Movie | FreeStream Cinema" />
        <meta property="og:description" content="Suggest movies you want to watch on our streaming service" />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Request Movie",
              "description": "Request movies for FreeStream Cinema streaming service",
              "publisher": {
                "@type": "Organization",
                "name": "FreeStream Cinema"
              }
            })
          }}
        />
      </Head>

      <section className="request-page">
        <style jsx>{`
          .request-page {
            min-height: 100vh;
            background: linear-gradient(to bottom, #0f0f23 0%, #000000 100%);
            color: white;
            padding: 60px 0;
          }
          
            .container {
            max-width: 1000px;
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
          
                    
          .description {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.7);
            max-width: 800px;
            margin: 0 auto 30px auto;
            line-height: 1.6;
          }
          
          .telegram-card {
            background: linear-gradient(135deg, #0088cc 0%, #229ed9 100%);
            border-radius: 20px;
            padding: 50px;
            text-align: center;
            margin: 60px 0;
            box-shadow: 0 20px 60px rgba(0, 136, 204, 0.3);
            position: relative;
            overflow: hidden;
          }
          
          .telegram-card:before {
            content: "";
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
          }
          
          .telegram-icon {
            font-size: 80px;
            margin-bottom: 30px;
            display: block;
            position: relative;
            z-index: 1;
          }
          
          .telegram-title {
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
          }
          
          .telegram-description {
            font-size: 18px;
            margin-bottom: 40px;
            line-height: 1.6;
            position: relative;
            z-index: 1;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .telegram-button {
            display: inline-flex;
            align-items: center;
            gap: 15px;
            padding: 20px 40px;
            background: white;
            color: #0088cc;
            border-radius: 15px;
            text-decoration: none;
            font-size: 20px;
            font-weight: 700;
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
          }
          
          .telegram-button:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin: 60px 0;
          }
          
          .info-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 30px;
            text-align: center;
            transition: transform 0.3s ease;
          }
          
          .info-card:hover {
            transform: translateY(-10px);
          }
          
          .info-icon {
            font-size: 40px;
            margin-bottom: 20px;
            display: block;
          }
          
          .info-title {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 15px;
            color: white;
          }
          
          .info-text {
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.6;
          }
          
          .guidelines-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 40px;
            margin: 60px 0;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
          
          .guidelines-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 30px;
            color: white;
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .guideline-item {
            margin-bottom: 25px;
            padding-left: 35px;
            position: relative;
          }
          
          .guideline-item:last-child {
            margin-bottom: 0;
          }
          
          .guideline-number {
            position: absolute;
            left: 0;
            top: 0;
            width: 25px;
            height: 25px;
            background: #0088cc;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
          }
          
          .guideline-title {
            font-size: 18px;
            font-weight: 600;
            color: white;
            margin-bottom: 10px;
          }
          
          .guideline-text {
            color: rgba(255, 255, 255, 0.7);
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
          
          .alternative-section {
            text-align: center;
            margin-top: 60px;
            color: rgba(255, 255, 255, 0.7);
          }
          
          .alternative-link {
            color: #0088cc;
            text-decoration: none;
            font-weight: 500;
          }
          
          .alternative-link:hover {
            text-decoration: underline;
          }
        `}</style>

        <div className="container">
          <div className="header">
            <h1 className="main-title">
              Request <span className="gradient-text">Movies</span>
            </h1>
            <p className="description">
              Help shape our streaming schedule! Suggest movies you want to watch and join our community of film enthusiasts.
            </p>
          </div>

          <div className="telegram-card">
            <FaTelegram className="telegram-icon" />
            <h2 className="telegram-title">  Join Our Telegram Channel   </h2>
            <p className="telegram-description">
              Submit movie requests, get schedule updates, and join our community of movie lovers. 
              We review all requests and add popular suggestions to our streaming schedule.
            </p>
            <a 
              href={telegramLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="telegram-button"
            >
              <FaTelegram />
            <span className="gradient-text">  Open Telegram Channel </span>
            </a>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <FaFilm className="info-icon" style={{color: '#0088cc'}} />
              <h3 className="info-title">How It Works</h3>
              <p className="info-text">
                Join our Telegram channel, suggest movies in the chat, and vote on others' suggestions. 
                We schedule the most requested movies weekly.
              </p>
            </div>
            
            <div className="info-card">
              <FaCalendarAlt className="info-icon" style={{color: '#10b981'}} />
              <h3 className="info-title">Schedule Impact</h3>
              <p className="info-text">
                Requests directly influence our weekly schedule. Popular suggestions get priority 
                and are scheduled for upcoming streaming sessions.
              </p>
            </div>
            
            <div className="info-card">
              <FaUserFriends className="info-icon" style={{color: '#8b5cf6'}} />
              <h3 className="info-title">Community Voting</h3>
              <p className="info-text">
                Vote on other users' suggestions. Movies with the most votes are more likely 
                to be added to our streaming schedule.
              </p>
            </div>
          </div>

          <div className="guidelines-card">
            <h2 className="guidelines-title">
              <FaPaperPlane style={{color: '#0088cc'}} />
           <span className="gradient-text">   Submission Guidelines </span>
            </h2>
            
            <div className="guideline-item">
              <div className="guideline-number">1</div>
              <h4 className="guideline-title">Provide Complete Information</h4>
              <p className="guideline-text">
                Include movie title, year, and why you want to watch it. This helps us understand 
                community preferences and plan better schedules.
              </p>
            </div>
            
            <div className="guideline-item">
              <div className="guideline-number">2</div>
              <h4 className="guideline-title">Be Respectful</h4>
              <p className="guideline-text">
                Our community welcomes all movie genres and tastes. Respect others' suggestions 
                even if they're not your personal preference.
              </p>
            </div>
            
            <div className="guideline-item">
              <div className="guideline-number">3</div>
              <h4 className="guideline-title">Check Availability</h4>
              <p className="guideline-text">
                We prioritize movies that are legally available for streaming. Some requests may 
                take longer due to licensing considerations.
              </p>
            </div>
            
            <div className="guideline-item">
              <div className="guideline-number">4</div>
              <h4 className="guideline-title">Patience is Key</h4>
              <p className="guideline-text">
                We review requests weekly and update schedules accordingly. Popular movies may 
                appear in the schedule within 1-2 weeks.
              </p>
            </div>
          </div>

          <div className="alternative-section">
            <p>
              Don't use Telegram? You can also email requests to: 
              <br />
              <a href="mailto:requests@freestreamcinema.com" className="alternative-link">
                requests@freestreamcinema.com
              </a>
            </p>
            <p style={{marginTop: '15px', fontSize: '14px'}}>
              (Telegram requests get faster responses and community feedback)
            </p>
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