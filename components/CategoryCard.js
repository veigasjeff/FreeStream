export default function CategoryCard({ category, count, onClick }) {
  const icons = {
    'Action': 'fa-gun',
    'Comedy': 'fa-face-laugh',
    'Drama': 'fa-masks-theater',
    'Horror': 'fa-ghost',
    'Sci-Fi': 'fa-rocket',
    'Romance': 'fa-heart',
    'Thriller': 'fa-user-secret',
    'Adult': 'fa-eye-slash',
    'Adventure': 'fa-mountain-sun',
    'Fantasy': 'fa-dragon',
    'Crime': 'fa-handcuffs',
    'War': 'fa-shield-halved',
    'Biography': 'fa-user-pen',
    'History': 'fa-landmark',
    'Family': 'fa-users',
    'Mystery': 'fa-magnifying-glass',
    'News': 'fa-newspaper',
    'Sports': 'fa-baseball',
    'TvSeries': 'fa-tv',
    'TvShow': 'fa-film'
  };

  return (
    <div 
      className="category-card" 
      data-category={category.toLowerCase()}
      onClick={onClick}
    >
      <i className={`fas ${icons[category] || 'fa-film'}`}></i>
      <h3>{category}</h3>
      <span>{count} Movies</span>

      <style jsx>{`
        .category-card {
          background: var(--dark-light);
          border-radius: var(--radius);
          padding: clamp(1rem, 3vw, 2rem);
          text-align: center;
          transition: var(--transition);
          cursor: pointer;
          border: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
        }
        
        .category-card:hover {
          background: var(--primary);
          transform: translateY(-5px);
          box-shadow: var(--shadow);
        }
        
        .category-card i {
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 1rem;
          color: var(--primary);
        }
        
        .category-card:hover i,
        .category-card:hover h3,
        .category-card:hover span {
          color: #ffffff;
        }
        
        .category-card h3 {
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          margin-bottom: 0.5rem;
        }
        
        .category-card span {
          color: var(--gray);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}