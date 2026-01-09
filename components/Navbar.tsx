
import React, { useState } from 'react';

interface NavbarProps {
    onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };
    
    const navLinks = [
        { href: '#home', icon: 'fas fa-home', text: 'Home' },
        { href: '#categories', icon: 'fas fa-list', text: 'Categories' },
        { href: '#movies', icon: 'fas fa-film', text: 'Movies' },
        { href: '#languages', icon: 'fas fa-globe', text: 'Languages' },
    ];

    return (
        <nav className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="#home" className="flex-shrink-0 flex items-center gap-2 text-white">
                            <i className="fas fa-play-circle text-primary text-3xl"></i>
                            <span className="font-display font-black text-2xl tracking-tight">Free<span className="text-primary">Stream</span>™</span>
                        </a>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navLinks.map((link) => (
                                    <a key={link.text} href={link.href} className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        <i className={`${link.icon} mr-2`}></i>{link.text}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search movies..."
                                className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-48 focus:w-64"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                            <i className="fas fa-bars text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>
            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                           <a key={link.text} href={link.href} className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors">
                                <i className={`${link.icon} mr-2`}></i>{link.text}
                            </a>
                        ))}
                         <form onSubmit={handleSearchSubmit} className="relative px-3 pt-2">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search movies..."
                                className="bg-gray-800 w-full text-white placeholder-gray-400 border border-gray-700 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
