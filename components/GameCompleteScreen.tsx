import React from 'react';

const PixelTrophyIcon: React.FC = () => (
    <svg width="128" height="128" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
      <path d="M9,4h14v2h-14z" fill="#FFD700"/>
      <path d="M10,6h12v2h-12z" fill="#FFC700"/>
      <path d="M11,8h10v2h-10z" fill="#FFB700"/>
      <path d="M12,10h8v10h-8z" fill="#FFD700"/>
      <path d="M13,12h6v6h-6z" fill="#FFFFFF"/>
      <path d="M14,13h4v4h-4z" fill="#FFD700"/>
      <path d="M15,14h2v2h-2z" fill="#DAA520"/>
      <path d="M14,20h4v2h-4z" fill="#FFB700"/>
      <path d="M12,22h8v2h-8z" fill="#DAA520"/>
      <path d="M10,24h12v2h-12z" fill="#B8860B"/>
      <path d="M8,8h3v2h-3z" fill="#FFD700"/>
      <path d="M21,8h3v2h-3z" fill="#FFD700"/>
      <path d="M7,10h2v2h-2z" fill="#FFC700"/>
      <path d="M23,10h2v2h-2z" fill="#FFC700"/>
      <path d="M6,12h2v4h-2z" fill="#FFB700"/>
      <path d="M24,12h2v4h-2z" fill="#FFB700"/>
    </svg>
);


interface GameCompleteScreenProps {
  onBackToMenu: () => void;
}

const GameCompleteScreen: React.FC<GameCompleteScreenProps> = ({ onBackToMenu }) => {
  return (
    <div className="w-full max-w-2xl bg-blue-300/80 pixel-border rounded-lg p-8 text-center flex flex-col items-center animate-fade-in-down font-pixel">
      <h1 className="text-4xl md:text-5xl text-white mb-4" style={{textShadow: '3px 3px 0px #000'}}>
        Parabéns!
      </h1>
      <PixelTrophyIcon />
      <p className="text-xl text-white mt-4 mb-8 leading-tight" style={{textShadow: '2px 2px 0px #000'}}>
        Você é um Mestre do Português!
      </p>
      <button
        onClick={onBackToMenu}
        className="px-8 py-4 bg-yellow-400 text-black pixel-border rounded-lg transform transition-transform hover:scale-105"
      >
        Voltar ao Menu
      </button>
    </div>
  );
};

export default GameCompleteScreen;