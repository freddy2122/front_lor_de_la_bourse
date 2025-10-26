import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const SuccessToast = ({ message, duration = 7000, onDismiss }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Démarre le minuteur pour la barre de progression et la disparition
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100); // Met à jour la barre toutes les 100ms

    // Minuteur pour faire disparaître le toast
    const timeout = setTimeout(() => {
      onDismiss();
    }, duration);

    // Nettoyage au démontage du composant
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onDismiss]);

  return (
    <div className="fixed top-5 right-5 w-full max-w-sm bg-white shadow-2xl rounded-lg p-4 z-50 animate-fade-in-down">
      <div className="flex items-start">
        {/* Icône de succès */}
        <div className="flex-shrink-0">
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>

        {/* Message */}
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold text-gray-900">Dossier Soumis !</p>
          <p className="mt-1 text-sm text-gray-600">{message}</p>
        </div>

        {/* Bouton pour fermer manuellement */}
        <div className="ml-4 flex-shrink-0 flex">
          <button onClick={onDismiss} className="inline-flex text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="absolute bottom-0 left-0 h-1 bg-gray-200 rounded-bl-lg w-full">
        <div
          className="h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-bl-lg"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        ></div>
      </div>
    </div>
  );
};

export default SuccessToast;
