import React from 'react';
import { Year, Level } from '../types';
import { LEVELS } from '../constants';

// Fix: Define the missing LevelSelectionScreenProps interface.
interface LevelSelectionScreenProps {
  year: Year;
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
  completedLevels: Set<number>;
}

const LevelSelectionScreen: React.FC<LevelSelectionScreenProps> = ({ year, onSelectLevel, onBack, completedLevels }) => {
  const yearLevels = LEVELS.filter(level => level.year === year);

  const BrickButton: React.FC<{level: Level, index: number}> = ({ level, index }) => {
    const isCompleted = completedLevels.has(level.id);
    const brickBg = isCompleted ? 'bg-yellow-700' : 'bg-yellow-500';
    const brickShadow = isCompleted ? 'shadow-[inset_0_6px_0_0_#a16207]' : 'shadow-[inset_0_6px_0_0_#f59e0b]';

    return (
       <button
        key={level.id}
        onClick={() => onSelectLevel(level)}
        className={`p-4 font-pixel text-2xl rounded-lg pixel-border text-black transition-all duration-200 relative transform hover:-translate-y-1 ${brickBg} ${brickShadow}`}
      >
        <span className="absolute top-1 left-2 text-black text-xs -mt-1">
          {isCompleted ? '★' : ''}
        </span>
        {index + 1}
      </button>
    );
  }

  return (
    <div className="w-full max-w-4xl bg-blue-300/80 pixel-border rounded-lg p-8 text-center animate-fade-in">
      <h2 className="text-4xl font-pixel text-white mb-4" style={{textShadow: '3px 3px 0px #000'}}>{year}</h2>
      <p className="text-base text-white mb-6 font-pixel" style={{textShadow: '2px 2px 0px #000'}}>Escolha um nível!</p>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {yearLevels.map((level, index) => (
          <BrickButton key={level.id} level={level} index={index} />
        ))}
      </div>
      <button onClick={onBack} className="mt-8 text-white hover:text-yellow-300 transition-colors font-pixel text-sm" style={{textShadow: '2px 2px 0px #000'}}>
        &larr; Voltar para Anos
      </button>
    </div>
  );
};

export default LevelSelectionScreen;