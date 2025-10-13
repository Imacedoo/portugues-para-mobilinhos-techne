import React, { useState, useCallback } from 'react';
import { Year, Level } from './types';
import { LEVELS } from './constants';
import StartScreen from './components/StartScreen';
import YearSelectionScreen from './components/YearSelectionScreen';
import LevelSelectionScreen from './components/LevelSelectionScreen';
import GameScreen from './components/GameScreen';
import GameCompleteScreen from './components/GameCompleteScreen';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'start' | 'year-select' | 'level-select' | 'game' | 'game-complete'>('start');
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());

  const handleStart = useCallback(() => {
    setScreen('year-select');
  }, []);

  const handleYearSelect = useCallback((year: Year) => {
    setSelectedYear(year);
    setScreen('level-select');
  }, []);

  const handleLevelSelect = useCallback((level: Level) => {
    setCurrentLevel(level);
    setScreen('game');
  }, []);
  
  const handleBackToMenu = useCallback(() => {
      setCurrentLevel(null);
      setSelectedYear(null);
      setCompletedLevels(new Set());
      setScreen('start');
  }, []);
  
  const handleBackToLevelSelect = useCallback(() => {
      setCurrentLevel(null);
      setScreen('level-select');
  }, []);

  const handleLevelComplete = useCallback(() => {
    if (!currentLevel) return;

    const newCompletedLevels = new Set(completedLevels);
    newCompletedLevels.add(currentLevel.id);
    setCompletedLevels(newCompletedLevels);

    if (newCompletedLevels.size === LEVELS.length) {
      setScreen('game-complete');
      return;
    }

    const currentYearLevels = LEVELS.filter(l => l.year === selectedYear).sort((a, b) => a.id - b.id);
    const currentLevelIndex = currentYearLevels.findIndex(l => l.id === currentLevel.id);

    if (currentLevelIndex < currentYearLevels.length - 1) {
      const nextLevel = currentYearLevels[currentLevelIndex + 1];
      setCurrentLevel(nextLevel);
    } else {
      // Completed all levels for the year
      alert(`Parabéns! Você completou todos os níveis do ${selectedYear}!`);
      setCurrentLevel(null);
      setScreen('level-select');
    }
  }, [currentLevel, selectedYear, completedLevels]);


  const renderScreen = () => {
    switch (screen) {
      case 'start':
        return <StartScreen onStart={handleStart} />;
      case 'year-select':
        return <YearSelectionScreen onSelect={handleYearSelect} onBack={handleBackToMenu} />;
      case 'level-select':
        if (selectedYear) {
          return <LevelSelectionScreen year={selectedYear} onSelectLevel={handleLevelSelect} onBack={() => setScreen('year-select')} completedLevels={completedLevels} />;
        }
        return null; // Should not happen
      case 'game':
        if (currentLevel) {
          return <GameScreen level={currentLevel} onLevelComplete={handleLevelComplete} onExit={handleBackToLevelSelect} />;
        }
        return null; // Should not happen
      case 'game-complete':
        return <GameCompleteScreen onBackToMenu={handleBackToMenu} />;
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      {renderScreen()}
    </div>
  );
};

export default App;