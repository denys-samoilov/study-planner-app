import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    isOpen: boolean;
    message: string;
    type?: ToastType;
    onClose: () => void;
    duration?: number;
}

export function Toast({isOpen, message, type = 'success', onClose, duration = 3000 }: ToastProps) {
    if (!isOpen) return null;

    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }, [onClose, duration]);

    const bgClasses = {
      success: 'bg-success text-white',
      error: 'bg-danger text-white',
      info: 'bg-dark text-white',
    };

    return (
      <div 
        className={`toast show position-fixed bottom-0 end-0 m-4 shadow ${bgClasses[type]}`}
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
        style={{ zIndex: 1080, minWidth: '250px' }}
      >
        <div className="d-flex align-items-center p-3">
          <div className="toast-body p-0 flex-grow-1">
            {message}
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white ms-3" 
            aria-label="Close" 
            onClick={onClose}
          />
        </div>
      </div>
    );
}