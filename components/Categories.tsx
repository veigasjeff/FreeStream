
import React from 'react';

interface CategoriesProps {
    genres: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const categoryIcons: { [key: string]: string } = {
    action: 'fa-gun',
    comedy: 'fa-face-laugh',
    drama: 'fa-masks-theater',
    horror: 'fa-ghost',
    'sci-fi': 'fa-rocket',
    romance: 'fa-heart',
    thriller: 'fa-user-secret',
    adult: 'fa-eye-slash',
    adventure: 'fa-mountain-sun',
    fantasy: 'fa-dragon',
    crime: 'fa-handcuffs',
    war: 'fa-shield-halved',
    biography: 'fa-user-pen',
    history: 'fa-landmark',
    family: 'fa-users',
    mystery: 'fa-magnifying-glass',
    all: 'fa-film',
    news: 'fa-newspaper',
    sports: 'fa-futbol',
    tvseries: 'fa-tv',
    tvshow: 'fa-tv',
};

const Categories: React.FC<CategoriesProps> = ({ genres, selectedCategory, onSelectCategory }) => {
    return (
        <section id="categories">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-8 border-l-4 border-primary pl-4">
                🎬 Browse by Category
            </h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
                {genres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => onSelectCategory(genre)}
                        className={`px-4 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 flex items-center gap-2 ${
                            selectedCategory === genre.toLowerCase() 
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <i className={`fas ${categoryIcons[genre.toLowerCase()] || 'fa-film'}`}></i>
                        <span className="capitalize">{genre}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Categories;
