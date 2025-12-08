import Head from 'next/head';
import Link from 'next/link';
import { FaQuestionCircle, FaStream, FaClock, FaFilm, FaMobileAlt, FaGlobe } from 'react-icons/fa';

export default function FAQPage() {
  const faqItems = [
    {
      question: "What is FreeStream Cinema?",
      answer: "FreeStream Cinema is a free online streaming platform that broadcasts movies at scheduled times, similar to traditional television. We offer 3 daily shows at fixed times: 10:00 AM, 3:00 PM, and 8:00 PM."
    },
    {
      question: "Is it really free? No hidden charges?",
      answer: "Yes, completely free! No registration, no subscriptions, no credit card required, and no hidden fees. Just visit our website during stream times and watch."
    },
    {
      question: "How does the schedule work?",
      answer: "Movies stream at exact scheduled times shown on our schedule page. Each movie plays once at its designated time slot. You can check the schedule page for upcoming shows."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required! You can watch anonymously without any registration. Just visit our site and start watching when a movie is streaming."
    },
    {
      question: "Can I watch on mobile devices?",
      answer: "Yes! FreeStream Cinema is fully responsive and works on smartphones, tablets, laptops, and desktop computers. We recommend Chrome or Safari for best experience."
    },
    {
      question: "What happens if I miss a movie?",
      answer: "Each movie plays once at its scheduled time. If you miss it, check our schedule for the next showing. We rotate movies periodically, so it may return in future schedules."
    },
    {
      question: "Why can't I rewind or pause?",
      answer: "We stream movies live at scheduled times, similar to traditional TV broadcasts. This means you join the stream at whatever point it's currently at."
    },
    {
      question: "How can I request a movie?",
      answer: "You can request movies through our Request Movie page where you can submit suggestions via Telegram. We consider all requests when planning our schedule."
    },
    {
      question: "Is there a chat or community feature?",
      answer: "Currently, we focus on providing the streaming service. Community features may be added in future updates based on user demand."
    },
    {
      question: "What video quality is available?",
      answer: "We stream in HD quality (720p/1080p) depending on the source material and your internet connection. Quality may auto-adjust based on your bandwidth."
    },
    {
      question: "Are there regional restrictions?",
      answer: "Most content is available worldwide, but some movies may have geographic restrictions due to licensing. If you encounter access issues, try using our alternative stream links."
    },
    {
      question: "How often is the schedule updated?",
      answer: "We update our schedule weekly with new movies. Check back regularly or follow us on social media for schedule announcements."
    }
  ];

  return (
    <>
      <Head>
        <title>FAQ | FreeStream Cinema - Frequently Asked Questions</title>
        <meta name="description" content="FreeStream Cinema FAQ. Get answers to common questions about our streaming service, schedule, and how to watch movies for free." />
        <meta name="keywords" content="FAQ, frequently asked questions, streaming FAQ, movie streaming questions, free streaming help" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="FAQ | FreeStream Cinema" />
        <meta property="og:description" content="Get answers to common questions about our streaming service" />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Structured Data for FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })
          }}
        />
      </Head>

      <section className="faq-page">
        <style jsx>{`
          .faq-page {
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
          
          // .gradient-text {
          //   background: linear-gradient(90deg, #8b5cf6, #ec4899);
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
          
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 40px 0;
          }
          
          .stat-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            transition: transform 0.3s ease;
          }
          
          .stat-card:hover {
            transform: translateY(-5px);
          }
          
          .stat-icon {
            font-size: 32px;
            margin-bottom: 15px;
            display: block;
          }
          
          .stat-title {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 5px;
          }
          
          .stat-value {
            font-size: 32px;
            font-weight: 800;
            background: linear-gradient(90deg, #8b5cf6, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .faq-container {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
          
          .faq-list {
            margin-top: 30px;
          }
          
          .faq-item {
            margin-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 20px;
          }
          
          .faq-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          
          .faq-question {
            font-size: 20px;
            font-weight: 600;
            color: white;
            margin-bottom: 15px;
            display: flex;
            align-items: flex-start;
            gap: 15px;
            cursor: pointer;
          }
          
          .faq-question:hover {
            color: #8b5cf6;
          }
          
          .question-icon {
            color: #8b5cf6;
            flex-shrink: 0;
            margin-top: 3px;
          }
          
          .faq-answer {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.8;
            padding-left: 40px;
            animation: fadeIn 0.3s ease;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .help-section {
            background: rgba(59, 130, 246, 0.1);
            border-radius: 16px;
            padding: 40px;
            margin-top: 60px;
            text-align: center;
          }
          
          .help-title {
            font-size: 28px;
            font-weight: 700;
            color: white;
            margin-bottom: 20px;
          }
          
          .help-text {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 30px;
            line-height: 1.6;
          }
          
          .help-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          
          .help-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 24px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 10px;
            text-decoration: none;
            transition: all 0.3s ease;
          }
          
          .help-link:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
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
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="description">
              Find quick answers to common questions about FreeStream Cinema
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <FaStream className="stat-icon" style={{color: '#8b5cf6'}} />
              <div className="stat-title">Daily Streams</div>
              <div className="stat-value">3</div>
            </div>
            <div className="stat-card">
              <FaClock className="stat-icon" style={{color: '#10b981'}} />
              <div className="stat-title">Stream Times</div>
              <div className="stat-value">Fixed</div>
            </div>
            <div className="stat-card">
              <FaFilm className="stat-icon" style={{color: '#ef4444'}} />
              <div className="stat-title">Content</div>
              <div className="stat-value">HD</div>
            </div>
            <div className="stat-card">
              <FaMobileAlt className="stat-icon" style={{color: '#3b82f6'}} />
              <div className="stat-title">Platforms</div>
              <div className="stat-value">All</div>
            </div>
          </div>

          <div className="faq-container">
            <h2 style={{fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '30px'}}>
              <FaQuestionCircle style={{color: '#8b5cf6', marginRight: '15px'}} />
             <span className="gradient-text">  Common Questions </span>
            </h2>
            
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                  <h3 className="faq-question">
                    <FaQuestionCircle className="question-icon" />
                    {item.question}
                  </h3>
                  <div className="faq-answer">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="help-section">
            <h3 className="help-title">Still Need Help?</h3>
            <p className="help-text">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="help-links">
              <Link href="/contact" className="help-link">
                <FaQuestionCircle />
                Contact Support
              </Link>
              <Link href="/schedule" className="help-link">
                <FaClock />
                View Schedule
              </Link>
              <Link href="/request-movie" className="help-link">
                <FaFilm />
                Request Movie
              </Link>
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