
import React from 'react';
import { Page } from '../App';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        onNavigate(page);
        window.scrollTo(0, 0);
    };
    
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2 mb-4">
                            <i className="fas fa-play-circle text-primary text-3xl"></i>
                            <span className="font-display font-black text-2xl text-white">Free<span className="text-primary">Stream</span>™</span>
                        </a>
                        <p className="text-sm">Watch free movies, TV shows, live sports and news channels in HD quality without any subscription.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#categories" className="hover:text-primary transition-colors">Categories</a></li>
                            <li><a href="#languages" className="hover:text-primary transition-colors">Languages</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'privacy')} className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'terms')} className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'dmca')} className="hover:text-primary transition-colors">DMCA</a></li>
                            <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-primary transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-4">Download App</h3>
                        <p className="text-sm mb-4">Get our Android app for a better experience.</p>
                        <a href="https://median.co/share/pwwoxpk" className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            <i className="fab fa-android mr-2"></i> Download APK
                        </a>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} FreeStream™. All content is provided for entertainment purposes only.</p>
                    <p className="mt-2 opacity-70">Disclaimer: We do not host any content. All content is provided by third-party services.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
