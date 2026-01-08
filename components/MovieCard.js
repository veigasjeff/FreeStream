export default function MovieCard({ movie, view = 'grid', onWatchClick, onDetailsClick }) {
  const rating = movie.ratingCount > 0 
    ? (movie.ratingTotal / movie.ratingCount).toFixed(1) 
    : '0.0';

  return (
    <div className={`movie-card ${view === 'list' ? 'list-view' : ''}`}>
      <div className="movie-poster">
        <img 
          src={movie.poster} 
          alt={movie.title}
          style={{ objectFit: "contain" }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80';
          }}
        />
        <div className="movie-badge">{movie.language}</div>
      </div>
      <div className="movie-content">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <div className="movie-rating">
            {'★'.repeat(Math.floor(rating))}
            <span>{rating}</span>
          </div>
          <div className="movie-views">
            <i className="fas fa-eye"></i> {movie.views.toLocaleString()}
          </div>
        </div>
        <div className="movie-genre">{movie.genre}</div>
        <p className="movie-description">{movie.description.substring(0, 100)}...</p>
        <div className="movie-actions">
          <button className="watch-btn" onClick={() => onWatchClick(movie)}>
            <i className="fas fa-play"></i> Watch Now
          </button>
          <button className="details-btn" onClick={() => onDetailsClick(movie)}>
            <i className="fas fa-info-circle"></i> Details
          </button>
        </div>
      </div>

      <style jsx>{`
        .movie-card {
          background: var(--dark-light);
          border-radius: var(--radius);
          overflow: hidden;
          transition: var(--transition);
          cursor: pointer;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          box-shadow: var(--card-shadow);
        }
        
        .movie-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary);
        }
        
        .movie-poster {
          position: relative;
          height: clamp(220px, 40vh, 350px);
          overflow: hidden;
        }
        
        .movie-poster img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        
        .movie-card:hover .movie-poster img {
          transform: scale(1.1);
        }
        
        .movie-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--primary);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 2;
        }
        
        .movie-content {
          padding: clamp(1rem, 2vw, 1.5rem);
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .movie-content h3 {
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .movie-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .movie-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #ffd700;
          font-weight: 600;
        }
        
        .movie-views {
          color: var(--gray);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        
        .movie-genre {
          display: inline-block;
          background: var(--input-bg);
          color: var(--gray);
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-size: 0.8rem;
          margin-bottom: 1rem;
          align-self: flex-start;
        }
        
        .movie-description {
          color: var(--gray);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .movie-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
        }
        
        .watch-btn {
          flex: 1;
          padding: 0.8rem;
          background: var(--gradient);
          color: white;
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-weight: 600;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .watch-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3);
        }
        
        .details-btn {
          padding: 0.8rem 1rem;
          background: var(--input-bg);
          color: var(--light);
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .details-btn:hover {
          background: var(--border-color);
        }
        
        @media (max-width: 600px) {
          .movie-card {
            height: clamp(300px, 50vh, 450px);
            position: relative;
            overflow: hidden;
          }
          
          .movie-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent 50%);
            z-index: 1;
          }
          
          .movie-poster {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
          
          .movie-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem;
            z-index: 2;
            background: transparent;
          }
          
          .movie-content h3 {
            color: #ffffff;
            font-size: 1.4rem;
            margin-bottom: 0.5rem;
          }
          
          .movie-meta {
            color: #f5f5f5;
            margin-bottom: 1rem;
          }
          
          .movie-rating {
            color: #ffd700;
          }
          
          .movie-views {
            color: #f5f5f5;
          }
          
          .movie-genre {
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            margin-bottom: 1rem;
          }
          
          .movie-description {
            color: #f5f5f5;
            margin-bottom: 1rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .movie-actions {
            position: relative;
            z-index: 3;
            flex-direction: column;
          }
          
          .watch-btn, .details-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}