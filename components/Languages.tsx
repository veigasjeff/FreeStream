
import React from 'react';

interface LanguagesProps {
    languages: string[];
    onSelectLanguage: (language: string) => void;
}

const Languages: React.FC<LanguagesProps> = ({ languages, onSelectLanguage }) => {
    return (
        <section id="languages">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-8 border-l-4 border-primary pl-4">
                🌍 Browse by Language
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {languages.map(lang => (
                    <button 
                        key={lang} 
                        onClick={() => onSelectLanguage(lang)}
                        className="bg-gray-800 text-center p-6 rounded-lg group hover:bg-primary transition-all duration-300 cursor-pointer"
                    >
                        <h3 className="text-lg font-bold group-hover:text-white transition-colors">{lang}</h3>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Languages;
