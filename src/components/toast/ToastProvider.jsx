import React, { createContext, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const push = (type, message, opts = {}) => {
    const id = ++idCounter;
    const duration = opts.duration ?? 3000;
    setToasts((prev) => [...prev, { id, type, message }]);
    if (duration > 0) {
      setTimeout(() => remove(id), duration);
    }
    return id;
  };

  const api = useMemo(() => ({
    success: (msg, opts) => push('success', msg, opts),
    error: (msg, opts) => push('error', msg, opts),
    info: (msg, opts) => push('info', msg, opts),
    remove,
  }), []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              'min-w-[260px] max-w-[360px] px-4 py-3 rounded shadow-lg text-white',
              t.type === 'success' && 'bg-green-600',
              t.type === 'error' && 'bg-red-600',
              t.type === 'info' && 'bg-gray-800',
            ].filter(Boolean).join(' ')}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm leading-snug">{t.message}</p>
              <button onClick={() => remove(t.id)} className="text-white/80 hover:text-white text-sm">✕</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
