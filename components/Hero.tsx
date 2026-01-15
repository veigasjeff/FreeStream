
import React, { useState } from 'react';

interface HeroProps {
    onSearch: (term: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const stats = [
        { icon: 'fas fa-film', value: '5000+', label: 'Movies' },
        { icon: 'fas fa-tv', value: '50+', label: 'Live Channels' },
        { icon: 'fas fa-hd', value: 'HD/4K', label: 'Quality' },
        { icon: 'fas fa-user', value: '100%', label: 'Free Forever' },
    ];

    return (
        <section id="home" className="relative bg-cover bg-center min-h-[75vh] md:min-h-[90vh] flex items-center justify-center text-center text-white" style={{ backgroundImage: `url(https://freestreaming.vercel.app/og-image.jpg)` }}>
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4">
                    Watch Unlimited <span className="text-primary">Movies & TV Shows</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                    FreeStream™ lets you watch free HD movies and TV shows online without registration. Explore thousands of latest movies, popular TV series, and multi-language content — all available for instant streaming.
                </p>
<h2 className="font-display font-black text-2xl sm:text-2xl md:text-2xl lg:text-2xl leading-tight mb-4">
                  Only Latest <span className="text-primary">Movies, TV shows, Live Sports, Live News & TV Series are Updated Daily.</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                    Discover newly released movies available for free streaming in HD quality. Watch online anytime without signing up.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 transition-transform hover:scale-105 hover:bg-white/20">
                            <i className={`${stat.icon} text-primary text-2xl sm:text-3xl`}></i>
                            <div>
                                <h3 className="font-bold text-lg sm:text-xl">{stat.value}</h3>
                                <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for movies, TV shows..."
                            className="w-full bg-white/10 border-2 border-transparent focus:border-primary text-white placeholder-gray-400 rounded-full py-3 px-6 text-lg focus:outline-none focus:ring-0 transition-all"
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark text-white font-bold rounded-full py-2 px-6 transition-colors">
                            <i className="fas fa-search mr-2 hidden sm:inline"></i>
                            <span>Search</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Hero;
