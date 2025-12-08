import Link from 'next/link';
import Image from 'next/image';
import { FaPlay, FaCalendarAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import schedule from '../data/schedules.json';

export default function HeroSection() {
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const [todayShows, setTodayShows] = useState([]);

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const todayDate = getTodayDateString();
    
    // Check if schedule data exists and has shows
    const allShows = schedule?.shows || [];
    
    console.log('Total shows available:', allShows.length);
    console.log('Looking for shows on:', todayDate);
    
    // Filter shows for today's date
    const filteredShows = allShows.filter(show => {
      if (!show || !show.date) return false;
      const showDate = show.date.toString().trim();
      return showDate === todayDate;
    });

    console.log('Today\'s shows found:', filteredShows.length);
    
    if (filteredShows.length > 0) {
      setTodayShows(filteredShows);
      setCurrentShowIndex(0);
    } else {
      // If no shows for today, show next available shows
      console.log('No shows for today, looking for next available...');
      
      // Get all unique dates and sort them
      const allDates = [...new Set(allShows.map(show => show?.date).filter(Boolean))].sort();
      
      // Find the next date after today
      const nextDate = allDates.find(date => date > todayDate) || allDates[0];
      
      if (nextDate) {
        const nextShows = allShows.filter(show => show.date === nextDate);
        setTodayShows(nextShows);
        setCurrentShowIndex(0);
        console.log('Showing shows for date:', nextDate);
      } else {
        // No shows at all - use default
        setTodayShows([{
          id: 'default',
          title: 'Premium Movie Streaming',
          image: '/images/showcase.jpg',
          time: 'Check Schedule',
          genre: 'Entertainment',
          description: 'Experience cinema-quality live streaming at scheduled times. Join viewers worldwide.',
          date: todayDate
        }]);
      }
    }
  }, []);

  useEffect(() => {
    if (todayShows.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentShowIndex((prevIndex) => 
        prevIndex === todayShows.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [todayShows.length]);

  const currentShow = todayShows.length > 0 
    ? todayShows[currentShowIndex] 
    : {
        id: 'default',
        title: 'Premium Movies',
        image: '/images/showcase.jpg',
        time: 'Schedule Coming Soon',
        genre: 'Entertainment',
        description: 'Experience cinema-quality live streaming at scheduled times.',
        date: getTodayDateString()
      };

  const todayDate = getTodayDateString();
  const isToday = currentShow.date === todayDate;
  const isFutureDate = currentShow.date > todayDate;
  
  const formatDateForDisplay = (dateString) => {
    try {
      const date = new Date(dateString);
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      return dateString;
    }
  };

  const imageSrc = currentShow.image || '/images/showcase.jpg';

  return (
    <div className="hero-section">
      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
          padding: 60px 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          width: 100%;
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 50px;
          align-items: center;
        }
        
        @media (min-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
            gap: 70px;
          }
        }
        
        .text-content h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
          .text-content h1 {
            font-size: 2.5rem;
          }
        }
        
        .text-content p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
          margin-bottom: 30px;
        }
        
        .featured-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        }
        
        .featured-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .featured-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin: 0;
        }
        
        .featured-header p {
          color: rgba(255, 255, 255, 0.9);
          margin: 5px 0 0 0;
          font-size: 1.3rem;
          font-weight: 700;
        }
        
        .featured-details {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 15px;
        }
        
        .detail-item {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .button-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin: 25px 0;
        }
        
        @media (min-width: 640px) {
          .button-group {
            flex-direction: row;
          }
        }
        
        .btn-primary, .btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .btn-primary {
          background: #3b82f6;
          color: white;
        }
        
        .btn-primary:hover {
          background: #2563eb;
        }
        
        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .image-container {
          width: 100%;
          height: 450px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        
        @media (min-width: 768px) {
          .image-container {
            height: 500px;
          }
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 50%);
          z-index: 1;
        }
        
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          height: 70px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
          z-index: 2;
        }
        
        .play-button:hover {
          background: #2563eb;
          transform: translate(-50%, -50%) scale(1.1);
        }
        
        .image-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 25px;
          z-index: 2;
        }
        
        .image-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }
        
        .image-content p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
          font-size: 0.95rem;
        }
        
        .now-streaming {
          display: inline-block;
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          padding: 8px 18px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.8rem;
          margin-bottom: 20px;
        }
        
        .show-indicator {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
        }
        
        .indicator-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .indicator-dot.active {
          background: #3b82f6;
          transform: scale(1.3);
        }
        
        .date-info {
          color: #93c5fd;
          font-size: 0.85rem;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .schedule-badge {
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #93c5fd;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .description {
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
          margin: 15px 0;
          font-size: 0.95rem;
        }
      `}</style>

      <div className="hero-container">
        <div className="hero-content">
          <div className="text-content">
            <div className="now-streaming">
              🎬 {isToday ? "NOW STREAMING" : isFutureDate ? "UPCOMING" : "PREMIUM STREAMING"}
            </div>
            
            <h1>
              Watch <span className="gradient-text">Premium Movies</span><br />
              <span style={{color: 'white'}}>Live at Scheduled Times</span>
            </h1>
            
            <p>
              Experience cinema-quality live streaming at fixed schedule times. 
              Join thousands of viewers watching movies together in real-time.
            </p>

            <div className="featured-card">
              <div className="featured-header">
                <FaCalendarAlt style={{color: '#3b82f6', fontSize: '24px'}} />
                <div>
                  <h3>
                    {isToday ? "Today's Featured Show" : 
                     isFutureDate ? `Upcoming Show` : 
                     "Featured"}
                  </h3>
                  <p>{currentShow.title}</p>
                </div>
              </div>
              
              <div className="featured-details">
                <div className="detail-item">⏰ {currentShow.time} GMT</div>
                <div className="detail-item">🎬 {Array.isArray(currentShow.genre) ? currentShow.genre.join(', ') : currentShow.genre}</div>
              </div>
              
              <div className="description">
                {currentShow.description}
              </div>
              
              {!isToday && currentShow.date && (
                <div className="date-info">
                  📅 Showing on: {formatDateForDisplay(currentShow.date)}
                </div>
              )}
            </div>

            <div className="button-group">
              <Link 
                href={currentShow.id !== 'default' ? `/schedules/${currentShow.id}` : '/schedule'}
                className="btn-primary"
              >
                {currentShow.id !== 'default' ? 'Watch Now' : 'View Schedule'}
              </Link>
              <Link 
                href="/schedule"
                className="btn-secondary"
              >
                Full Schedule
              </Link>
            </div>

            {todayShows.length > 1 && (
              <div className="show-indicator">
                {todayShows.map((_, index) => (
                  <div
                    key={index}
                    className={`indicator-dot ${index === currentShowIndex ? 'active' : ''}`}
                    onClick={() => setCurrentShowIndex(index)}
                  />
                ))}
                <div className="schedule-badge">
                  {todayShows.length} show{todayShows.length > 1 ? 's' : ''} {isToday ? 'today' : 'scheduled'}
                </div>
              </div>
            )}
          </div>

          <div className="image-container">
            <Image
              src={imageSrc}
              alt={currentShow.title}
              fill
              priority
              quality={85}
              style={{
                objectFit: 'fit-cover',
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="image-overlay"></div>
            
            <Link 
              href={currentShow.id !== 'default' ? `/schedules/${currentShow.id}` : '/schedule'}
              className="play-button"
            >
              <FaPlay style={{color: 'white', fontSize: '22px', marginLeft: '3px'}} />
            </Link>

            <div className="image-content">
              <h3>{currentShow.title}</h3>
              <p>{currentShow.description}</p>
              {!isToday && currentShow.date && (
                <div className="date-info" style={{marginTop: '10px'}}>
                  📅 {formatDateForDisplay(currentShow.date)} • ⏰ {currentShow.time}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}