
import React from 'react';

interface AgeVerificationModalProps {
    onConfirm: () => void;
    onDeny: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onConfirm, onDeny }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gray-900 border border-primary/50 rounded-lg shadow-2xl max-w-sm w-full p-8 text-center">
                <div className="text-primary text-5xl mb-4">
                    <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Age Verification Required</h2>
                <p className="text-gray-400 mb-6">
                    This content is restricted to adults 18 years or older. By clicking "I am 18+", you confirm you are of legal age.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={onConfirm}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105"
                    >
                        I am 18+
                    </button>
                    <button
                        onClick={onDeny}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        I am under 18
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgeVerificationModal;
