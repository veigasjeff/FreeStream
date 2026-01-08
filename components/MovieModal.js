// export default function MovieModal({ isOpen, onClose, movie }) {
//   if (!isOpen || !movie) return null;

//   const rating = movie.ratingCount > 0 
//     ? (movie.ratingTotal / movie.ratingCount).toFixed(1) 
//     : '0.0';

//   return (
//     <div className="modal active">
//       <div className="modal-content">
//         <span className="close-modal" onClick={onClose}>&times;</span>
//         <div className="modal-body" id="movieModalContent">
//           <div className="movie-details-header">
//             <div className="movie-details-poster">
//               <img 
//                 src={movie.poster} 
//                 alt={movie.title}
//                 style={{ objectFit: "fill" }}
//                 onError={(e) => {
//                   e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';
//                 }}
//               />
//             </div>
//             <div className="movie-details-info">
//               <h2>{movie.title}</h2>
//               <div className="movie-details-meta">
//                 <span className="meta-badge genre">{movie.genre}</span>
//                 <span className="meta-badge language">{movie.language}</span>
//                 <span className="meta-badge year">{movie.date}</span>
//               </div>
//               <div className="movie-details-rating">
//                 <div className="rating-stars">{'★'.repeat(5)}</div>
//                 <div className="rating-value">{rating}/10</div>
//               </div>
//               <div className="movie-details-content">
//                 <h3>Description</h3>
//                 <p>{movie.content || movie.description}</p>
//               </div>
//               <div className="cast-crew">
//                 <div className="cast-member">
//                   <h4>Director</h4>
//                   <p>{movie.director?.join(', ') || 'Not specified'}</p>
//                 </div>
//                 <div className="cast-member">
//                   <h4>Cast</h4>
//                   <p>{movie.cast?.slice(0, 3).join(', ') || 'Not specified'}</p>
//                 </div>
//               </div>
//               <div className="movie-details-actions">
//                 <button className="btn-primary">
//                   <i className="fas fa-play"></i> Watch Movie
//                 </button>
//                 {movie.downloadUrl && (
//                   <a href={movie.downloadUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer">
//                     <i className="fas fa-download"></i> Download
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .modal {
//           display: none;
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.9);
//           z-index: 2000;
//           overflow-y: auto;
//           padding: 1rem;
//         }
        
//         .modal.active {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .modal-content {
//           background: var(--dark-light);
//           border-radius: var(--radius);
//           max-width: 1000px;
//           width: 100%;
//           max-height: 90vh;
//           overflow-y: auto;
//           position: relative;
//           animation: modalSlideIn 0.3s ease;
//           box-shadow: var(--shadow);
//         }
        
//         .close-modal {
//           position: absolute;
//           top: 1rem;
//           right: 1rem;
//           width: 40px;
//           height: 40px;
//           background: var(--input-bg);
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: var(--light);
//           cursor: pointer;
//           z-index: 10;
//           transition: var(--transition);
//           font-size: 1.5rem;
//         }
        
//         .close-modal:hover {
//           background: var(--primary);
//           color: #ffffff;
//           transform: rotate(90deg);
//         }
        
//         .modal-body {
//           padding: clamp(1rem, 3vw, 2rem);
//         }
        
//         .movie-details-header {
//           display: grid;
//           grid-template-columns: clamp(200px, 30vw, 300px) 1fr;
//           gap: clamp(1rem, 3vw, 2rem);
//           margin-bottom: 2rem;
//         }
        
//         .movie-details-poster {
//           border-radius: var(--radius);
//           overflow: hidden;
//           height: auto;
//           aspect-ratio: 2/3;
//         }
        
//         .movie-details-poster img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
        
//         .movie-details-info h2 {
//           font-size: clamp(1.5rem, 4vw, 2.5rem);
//           margin-bottom: 1rem;
//         }
        
//         .movie-details-meta {
//           display: flex;
//           gap: 1rem;
//           margin-bottom: 1.5rem;
//           flex-wrap: wrap;
//         }
        
//         .meta-badge {
//           padding: 0.5rem 1rem;
//           background: var(--input-bg);
//           border-radius: var(--radius-sm);
//           font-size: 0.9rem;
//         }
        
//         .meta-badge.genre {
//           background: rgba(229, 9, 20, 0.2);
//           color: var(--primary);
//         }
        
//         .meta-badge.language {
//           background: rgba(0, 180, 216, 0.2);
//           color: var(--accent);
//         }
        
//         .movie-details-rating {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 1.5rem;
//         }
        
//         .rating-stars {
//           color: #ffd700;
//           font-size: 1.2rem;
//         }
        
//         .rating-value {
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: var(--light);
//         }
        
//         .movie-details-content {
//           margin-bottom: 2rem;
//         }
        
//         .movie-details-content h3 {
//           margin-bottom: 1rem;
//           color: var(--light);
//         }
        
//         .movie-details-content p {
//           color: var(--gray);
//           line-height: 1.8;
//         }
        
//         .cast-crew {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(clamp(150px, 15vw, 200px), 1fr));
//           gap: 1.5rem;
//           margin-bottom: 2rem;
//         }
        
//         .cast-member {
//           text-align: left;
//         }
        
//         .cast-member h4 {
//           font-size: 1rem;
//           margin-bottom: 0.2rem;
//           color: var(--light);
//         }
        
//         .cast-member p {
//           color: var(--gray);
//           font-size: 0.9rem;
//         }
        
//         .movie-details-actions {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }
        
//         .btn-primary {
//           padding: 1rem 2rem;
//           background: var(--gradient);
//           color: white;
//           border: none;
//           border-radius: var(--radius-sm);
//           font-weight: 600;
//           cursor: pointer;
//           transition: var(--transition);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           flex: 1;
//           min-width: 200px;
//         }
        
//         .btn-primary:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3);
//         }
        
//         .btn-secondary {
//           padding: 1rem 2rem;
//           background: var(--input-bg);
//           color: var(--light);
//           border: none;
//           border-radius: var(--radius-sm);
//           font-weight: 600;
//           cursor: pointer;
//           transition: var(--transition);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           flex: 1;
//           min-width: 200px;
//           text-decoration: none;
//         }
        
//         .btn-secondary:hover {
//           background: var(--border-color);
//         }
        
//         @media (max-width: 850px) {
//           .movie-details-header {
//             grid-template-columns: 1fr;
//           }
          
//           .movie-details-poster {
//             max-width: 300px;
//             margin: 0 auto;
//           }
          
//           .movie-details-actions {
//             flex-direction: column;
//           }
          
//           .btn-primary, .btn-secondary {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }







export default function MovieModal({ isOpen, onClose, movie, onWatchClick }) {
  if (!isOpen || !movie) return null;

  const rating = movie.ratingCount > 0 
    ? (movie.ratingTotal / movie.ratingCount).toFixed(1) 
    : '0.0';

  const handleWatchClick = () => {
    onWatchClick(movie);
  };

  return (
    <div className="modal active">
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div className="modal-body" id="movieModalContent">
          <div className="movie-details-header">
            <div className="movie-details-poster">
              <img 
                src={movie.poster} 
                alt={movie.title}
                style={{ objectFit: "fill" }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';
                }}
              />
            </div>
            <div className="movie-details-info">
              <h2>{movie.title}</h2>
              <div className="movie-details-meta">
                <span className="meta-badge genre">{movie.genre}</span>
                <span className="meta-badge language">{movie.language}</span>
                <span className="meta-badge year">{movie.date}</span>
              </div>
              <div className="movie-details-rating">
                <div className="rating-stars">{'★'.repeat(5)}</div>
                <div className="rating-value">{rating}/10</div>
              </div>
              <div className="movie-details-content">
                <h3>Description</h3>
                <p>{movie.content || movie.description}</p>
              </div>
              <div className="cast-crew">
                <div className="cast-member">
                  <h4>Director</h4>
                  <p>{movie.director?.join(', ') || 'Not specified'}</p>
                </div>
                <div className="cast-member">
                  <h4>Cast</h4>
                  <p>{movie.cast?.slice(0, 3).join(', ') || 'Not specified'}</p>
                </div>
              </div>
              <div className="movie-details-actions">
                <button className="btn-primary" onClick={handleWatchClick}>
                  <i className="fas fa-play"></i> Watch Movie
                </button>
                {movie.downloadUrl && (
                  <a href={movie.downloadUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-download"></i> Download
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          z-index: 2000;
          overflow-y: auto;
          padding: 1rem;
        }
        
        .modal.active {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .modal-content {
          background: var(--dark-light);
          border-radius: var(--radius);
          max-width: 1000px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: modalSlideIn 0.3s ease;
          box-shadow: var(--shadow);
        }
        
        .close-modal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          background: var(--input-bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--light);
          cursor: pointer;
          z-index: 10;
          transition: var(--transition);
          font-size: 1.5rem;
        }
        
        .close-modal:hover {
          background: var(--primary);
          color: #ffffff;
          transform: rotate(90deg);
        }
        
        .modal-body {
          padding: clamp(1rem, 3vw, 2rem);
        }
        
        .movie-details-header {
          display: grid;
          grid-template-columns: clamp(200px, 30vw, 300px) 1fr;
          gap: clamp(1rem, 3vw, 2rem);
          margin-bottom: 2rem;
        }
        
        .movie-details-poster {
          border-radius: var(--radius);
          overflow: hidden;
          height: auto;
          aspect-ratio: 2/3;
        }
        
        .movie-details-poster img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .movie-details-info h2 {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          margin-bottom: 1rem;
        }
        
        .movie-details-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        
        .meta-badge {
          padding: 0.5rem 1rem;
          background: var(--input-bg);
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
        }
        
        .meta-badge.genre {
          background: rgba(229, 9, 20, 0.2);
          color: var(--primary);
        }
        
        .meta-badge.language {
          background: rgba(0, 180, 216, 0.2);
          color: var(--accent);
        }
        
        .movie-details-rating {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .rating-stars {
          color: #ffd700;
          font-size: 1.2rem;
        }
        
        .rating-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--light);
        }
        
        .movie-details-content {
          margin-bottom: 2rem;
        }
        
        .movie-details-content h3 {
          margin-bottom: 1rem;
          color: var(--light);
        }
        
        .movie-details-content p {
          color: var(--gray);
          line-height: 1.8;
        }
        
        .cast-crew {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(150px, 15vw, 200px), 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .cast-member {
          text-align: left;
        }
        
        .cast-member h4 {
          font-size: 1rem;
          margin-bottom: 0.2rem;
          color: var(--light);
        }
        
        .cast-member p {
          color: var(--gray);
          font-size: 0.9rem;
        }
        
        .movie-details-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .btn-primary {
          padding: 1rem 2rem;
          background: var(--gradient);
          color: white;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex: 1;
          min-width: 200px;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3);
        }
        
        .btn-secondary {
          padding: 1rem 2rem;
          background: var(--input-bg);
          color: var(--light);
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex: 1;
          min-width: 200px;
          text-decoration: none;
        }
        
        .btn-secondary:hover {
          background: var(--border-color);
        }
        
        @media (max-width: 850px) {
          .movie-details-header {
            grid-template-columns: 1fr;
          }
          
          .movie-details-poster {
            max-width: 300px;
            margin: 0 auto;
          }
          
          .movie-details-actions {
            flex-direction: column;
          }
          
          .btn-primary, .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}