
import React, { useState } from 'react';

const faqData = [
    {
        question: "Is FreeStream really free?",
        answer: "Yes! FreeStream is 100% free forever. No subscriptions, no hidden fees, no registration required. Just visit and start watching."
    },
    {
        question: "What quality are the movies?",
        answer: "All content is available in HD (720p/1080p) quality. Many movies also support 4K streaming where available."
    },
    {
        question: "Are there any viewing limits?",
        answer: "No limits at all! Watch as many movies and shows as you want, for as long as you want, completely unlimited."
    },
    {
        question: "Is it available worldwide?",
        answer: "Yes! FreeStream is accessible from any country without geographic restrictions."
    }
];

const FaqItem: React.FC<{ item: typeof faqData[0]; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-800">
            <button onClick={onClick} className="w-full flex justify-between items-center text-left py-5 px-6">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <i className={`fas fa-chevron-down transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-gray-400">{item.answer}</p>
                </div>
            </div>
        </div>
    );
}


const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-8 border-l-4 border-primary pl-4">
                ❓ Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg">
                {faqData.map((item, index) => (
                    <FaqItem 
                        key={index} 
                        item={item} 
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Faq;
