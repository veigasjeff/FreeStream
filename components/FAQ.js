import { useState } from 'react';

const faqItems = [
  {
    question: "Is FreeStream really free?",
    answer: "Yes! FreeStream is 100% free forever. No subscriptions, no hidden fees, no registration required. Just visit and start watching."
  },
  {
    question: "What quality are the movies?",
    answer: "All content is available in HD (720p/1080p) quality. Many movies also support 4K streaming where available."
  },
  {
    question: "Are there any viewing limits?",
    answer: "No limits at all! Watch as many movies and shows as you want, for as long as you want, completely unlimited."
  },
  {
    question: "Is it available worldwide?",
    answer: "Yes! FreeStream is accessible from any country without geographic restrictions."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="section-title">❓ Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqItems.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h3>{item.question}</h3>
              <i className={`fas fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .faq-section {
          margin-bottom: 4rem;
        }
        
        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .faq-item {
          background: var(--dark-light);
          border-radius: var(--radius);
          margin-bottom: 1rem;
          overflow: hidden;
          border: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
        }
        
        .faq-question {
          padding: clamp(1rem, 2vw, 1.5rem);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .faq-question:hover {
          background: var(--input-bg);
        }
        
        .faq-question h3 {
          font-size: clamp(1.1rem, 2vw, 1.2rem);
          margin: 0;
          color: var(--light);
        }
        
        .faq-question i {
          color: var(--primary);
          transition: var(--transition);
        }
        
        .faq-item.active .faq-question i {
          transform: rotate(180deg);
        }
        
        .faq-answer {
          padding: 0 1.5rem;
          max-height: 0;
          overflow: hidden;
          transition: var(--transition);
        }
        
        .faq-item.active .faq-answer {
          padding: 0 1.5rem 1.5rem;
          max-height: 500px;
        }
        
        .faq-answer p {
          color: var(--gray);
          margin: 0;
        }
      `}</style>
    </section>
  );
}