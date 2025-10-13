import React, { useState } from 'react';
import HowToPlayModal from './HowToPlayModal';

const CuteFrogIcon: React.FC = () => (
    <svg width="128" height="128" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Main body shape */}
      <path d="M50 25 C 20 25, 10 45, 10 65 C 10 90, 25 95, 50 95 C 75 95, 90 90, 90 65 C 90 45, 80 25, 50 25 Z" fill="#8BC34A"/>
      {/* Eye bumps */}
      <ellipse cx="35" cy="27" rx="16" ry="14" fill="#8BC34A"/>
      <ellipse cx="65" cy="27" rx="16" ry="14" fill="#8BC34A"/>
      
      {/* Eyes */}
      <circle cx="35" cy="30" r="9" fill="#212121"/>
      <circle cx="65" cy="30" r="9" fill="#212121"/>
      
      {/* Cheeks */}
      <circle cx="25" cy="58" r="8" fill="#F8BBD0"/>
      <circle cx="75" cy="58" r="8" fill="#F8BBD0"/>
      
      {/* Mouth */}
      <path d="M40 68 C 45 78 55 78 60 68" stroke="#212121" strokeWidth="3" fill="transparent" strokeLinecap="round"/>
    </svg>
);


interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <>
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
      <div className="w-full max-w-2xl bg-blue-300/80 pixel-border rounded-lg p-8 text-center flex flex-col items-center animate-fade-in-down">
        <h1 className="text-3xl md:text-5xl font-pixel text-white text-shadow-lg mb-4" style={{textShadow: '3px 3px 0px #000'}}>
          Português para Mobilinhos
        </h1>
        <CuteFrogIcon />
        <p className="text-lg text-white mt-4 mb-8 font-pixel" style={{textShadow: '2px 2px 0px #000'}}>
          Ajude o sapo a pular na resposta certa!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button
            onClick={onStart}
            className="w-48 h-32 bg-green-600 pixel-border text-white font-pixel text-2xl p-4 transform transition-transform hover:scale-105 relative flex items-center justify-center"
            style={{clipPath: 'polygon(0 15%, 100% 15%, 100% 100%, 0 100%)'}}
          >
            <div className="absolute top-0 left-0 w-full h-6 bg-green-700 border-b-4 border-black"></div>
            Iniciar
          </button>
          <button
            onClick={() => setShowHowToPlay(true)}
            className="w-48 h-32 bg-yellow-500 pixel-border text-black font-pixel text-xl p-4 transform transition-transform hover:scale-105 relative flex items-center justify-center text-center"
            style={{clipPath: 'polygon(0 15%, 100% 15%, 100% 100%, 0 100%)'}}
          >
            <div className="absolute top-0 left-0 w-full h-6 bg-yellow-600 border-b-4 border-black"></div>
            Como Jogar
          </button>
        </div>
        <p className="text-xs text-white mt-8 font-pixel" style={{textShadow: '1px 1px 0px #000'}}>
          Feito por: Maria Fernanda Fava e Maria Beatriz Tourinho - 6 ano - Escola Móbile
        </p>
      </div>
    </>
  );
};

export default StartScreen;