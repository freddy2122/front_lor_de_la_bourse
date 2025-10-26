import React from 'react';

// Importez le chemin vers votre vidéo.
// Vite s'occupera de la placer au bon endroit lors de la construction du projet.
import videoSrc from '../../assets/videos/trading-background.mp4';

const VideoBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-brand-blue">
      {/* La balise vidéo pour l'arrière-plan */}
      <video
        className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-0"
        autoPlay  // Lecture automatique
        loop      // Tourne en boucle
        muted     // Le son est coupé (obligatoire pour l'autoplay sur la plupart des navigateurs)
        playsInline // Essentiel pour la lecture sur les appareils iOS
      >
        <source src={videoSrc} type="video/mp4" />
        Votre navigateur ne supporte pas les vidéos.
      </video>

      {/* La superposition d'opacité noire pour assurer la lisibilité du texte */}
      <div className="absolute inset-0 w-full h-full bg-black opacity-70 z-10"></div>
    </div>
  );
};

export default VideoBackground;
