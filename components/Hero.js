export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Watch Unlimited <span className="highlight">Movies & TV Shows</span></h1>
        <p className="hero-subtitle">
          Stream 5000+ HD movies, latest TV shows, live sports and news channels. 
          No registration, no subscription fees.
        </p>
        
        <div className="hero-stats">
          <div className="stat-card">
            <i className="fas fa-film"></i>
            <div>
              <h3>5000+</h3>
              <p>Movies</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-tv"></i>
            <div>
              <h3>50+</h3>
              <p>Live Channels</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-hd"></i>
            <div>
              <h3>HD/4K</h3>
              <p>Quality</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-user"></i>
            <div>
              <h3>100%</h3>
              <p>Free Forever</p>
            </div>
          </div>
        </div>
        
        <div className="hero-search">
          <input type="text" id="heroSearch" placeholder="Search for movies, TV shows..." />
          <button id="heroSearchBtn">
            <i className="fas fa-search"></i> Search
          </button>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          background: linear-gradient(var(--hero-overlay), var(--hero-overlay)),
                      url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          padding: clamp(4rem, 10vh, 8rem) 5%;
          margin-top: 60px;
          transition: background 0.3s ease;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(229, 9, 20, 0.1), rgba(0, 180, 216, 0.1));
          z-index: 1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          width: 100%;
        }
        
        .hero-title {
          margin-bottom: 1.5rem;
          animation: fadeInUp 1s ease;
        }
        
        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.3rem);
          max-width: 700px;
          margin: 0 auto 3rem;
          animation: fadeInUp 1s ease 0.2s both;
        }
        
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: clamp(1rem, 2vw, 2rem);
          flex-wrap: wrap;
          margin-bottom: 3rem;
          animation: fadeInUp 1s ease 0.4s both;
        }
        
        .stat-card {
          background: var(--dark-light);
          backdrop-filter: blur(10px);
          padding: clamp(1rem, 2vw, 1.5rem);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: clamp(140px, 15vw, 200px);
          transition: var(--transition);
          flex: 1;
          max-width: 300px;
          box-shadow: var(--card-shadow);
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          background: var(--primary);
        }
        .stat-card:hover h3, .stat-card:hover p, .stat-card:hover i {
          color: #ffffff;
        }
        
        .stat-card i {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          color: var(--primary);
        }
        
        .stat-card h3 {
          margin: 0;
          color: var(--light);
        }
        
        .stat-card p {
          margin: 0;
          color: var(--gray);
        }
        
        .hero-search {
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
          animation: fadeInUp 1s ease 0.6s both;
        }
        
        .hero-search input {
          width: 100%;
          padding: 1.2rem 1.5rem;
          background: var(--dark-light);
          border: 2px solid var(--border-color);
          border-radius: 50px;
          color: var(--light);
          font-size: 1.1rem;
          margin-bottom: 1rem;
          transition: var(--transition);
          box-shadow: var(--card-shadow);
        }
        
        .hero-search input:focus {
          outline: none;
          border-color: var(--primary);
          background: var(--dark-light);
        }
        
        .hero-search button {
          width: 100%;
          padding: 1.2rem;
          background: var(--gradient);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .hero-search button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(229, 9, 20, 0.3);
        }
        
        @media (max-width: 600px) {
          .hero {
            background-attachment: scroll;
            padding-top: 80px;
          }
          
          .stat-card {
            min-width: 45%;
          }
        }
      `}</style>
    </section>
  );
}