import React from 'react';
import { Year } from '../types';

interface YearSelectionScreenProps {
  onSelect: (year: Year) => void;
  onBack: () => void;
}

const YearSelectionScreen: React.FC<YearSelectionScreenProps> = ({ onSelect, onBack }) => {
  return (
    <div className="w-full max-w-2xl bg-blue-300/80 pixel-border rounded-lg p-8 text-center flex flex-col items-center animate-fade-in">
      <h2 className="text-4xl font-pixel text-white mb-8" style={{textShadow: '3px 3px 0px #000'}}>Escolha o Ano</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <button
          onClick={() => onSelect('Terceiro Ano')}
          className="w-48 h-48 bg-green-600 pixel-border text-white font-pixel text-xl p-4 transform transition-transform hover:scale-105 relative flex items-center justify-center"
           style={{clipPath: 'polygon(0 15%, 100% 15%, 100% 100%, 0 100%)'}}
        >
          <div className="absolute top-0 left-0 w-full h-8 bg-green-700 border-b-4 border-black"></div>
          Terceiro Ano
        </button>
        <button
          onClick={() => onSelect('Quarto Ano')}
           className="w-48 h-48 bg-red-600 pixel-border text-white font-pixel text-xl p-4 transform transition-transform hover:scale-105 relative flex items-center justify-center"
           style={{clipPath: 'polygon(0 15%, 100% 15%, 100% 100%, 0 100%)'}}
        >
           <div className="absolute top-0 left-0 w-full h-8 bg-red-700 border-b-4 border-black"></div>
          Quarto Ano
        </button>
      </div>
       <button onClick={onBack} className="mt-8 text-white hover:text-yellow-300 transition-colors font-pixel text-sm" style={{textShadow: '2px 2px 0px #000'}}>
        &larr; Voltar
      </button>
    </div>
  );
};

export default YearSelectionScreen;