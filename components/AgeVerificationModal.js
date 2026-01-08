import { useEffect } from 'react';

export default function AgeVerificationModal({ isOpen, onConfirm, onDeny }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal active" id="ageModal">
      <div className="modal-content age-modal">
        <div className="age-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h2>Age Verification Required</h2>
        <p>This content is restricted to adults 18 years or older.</p>
        <p>By clicking "I am 18+", you confirm you are of legal age to view adult content.</p>
        <div className="age-buttons">
          <button className="btn-primary" onClick={onConfirm}>
            I am 18+
          </button>
          <button className="btn-secondary" onClick={onDeny}>
            I am under 18
          </button>
        </div>
        <p className="age-warning">
          Access to adult content is restricted by law in many jurisdictions.
        </p>
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
          z-index: 3000;
          overflow-y: auto;
          padding: 1rem;
          align-items: center;
          justify-content: center;
        }
        
        .modal.active {
          display: flex;
        }
        
        .modal-content {
          background: var(--dark-light);
          border-radius: var(--radius);
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: modalSlideIn 0.3s ease;
          box-shadow: var(--shadow);
          text-align: center;
          padding: 2rem;
        }
        
        .age-icon {
          font-size: clamp(3rem, 6vw, 4rem);
          color: var(--primary);
          margin-bottom: 1.5rem;
        }
        
        .age-modal h2 {
          margin-bottom: 1rem;
          color: var(--light);
        }
        
        .age-modal p {
          color: var(--gray);
          margin-bottom: 1.5rem;
        }
        
        .age-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .age-warning {
          font-size: 0.9rem;
          color: var(--gray);
          opacity: 0.7;
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
        }
        
        .btn-secondary:hover {
          background: var(--border-color);
        }
        
        @media (max-width: 768px) {
          .age-buttons {
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