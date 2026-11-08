import { useEffect } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    isOpen: boolean;
    message: string;
    type?: ToastType;
    duration?: number;
    onUndo?: () => void; 
}

export function Toast({ isOpen, message, type = 'success', duration = 3000, onUndo }: ToastProps) {
  
  const {hideToast} = useTaskContext();
  
  useEffect(() => {
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }, [hideToast, duration]);

    
    if (!isOpen) return null;

    

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
        style={{ zIndex: 1080, minWidth: '280px' }}
      >
        <div className="d-flex align-items-center p-3">
          <div className="toast-body p-0 flex-grow-1">
            {message}
          </div>
          {onUndo && (
            <button 
              type="button" 
              className="btn btn-sm btn-light text-dark fw-bold ms-2 px-2 py-1"
              onClick={() => {
                onUndo();
              }}
            >
              Undo
            </button>
          )}
          <button 
            type="button" 
            className="btn-close btn-close-white ms-3" 
            aria-label="Close" 
            onClick={hideToast}
          />
        </div>
      </div>
    );
}