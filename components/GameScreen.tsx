import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Level, AnswerType } from '../types';
import { GAME_GRID_SIZE } from '../constants';

// --- SVG Icons (Pixel Art Style) ---

const SpikyBeetleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }} className={className}>
        <path d="M3,8h10v3h1v1h-1v1H3v-1H2v-1h1V8z" fill="#8B0000"/>
        <path d="M4,9h8v2H4V9z" fill="#D32F2F"/>
        <path d="M2,7h1v1h10V7h1V6H2v1z" fill="#616161"/>
        <path d="M3,6h1V5h1V4h6v1h1v1h1v1h-1V6H4v1H3V6z" fill="#B71C1C"/>
        <path d="M5,4h2v1H5V4z M9,4h2v1H9V4z" fill="#FFFF00"/>
        <path d="M5,8h1v1H5z M10,8h1v1h-1z" fill="#FFFFFF"/>
        <path d="M5,9h1v1H5z M10,9h1v1h-1z" fill="#FF0000"/>
    </svg>
);


const PixelFrogIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }} className={className}>
      {/* Frog Body */}
      <path d="M4,1h8v1h1v1h1v5h-1v1h-1v1H4v-1H3v-1H2V3h1V2h1V1z" fill="#34A853"/>
      <path d="M5,2h6v1h1v3H4V3h1V2z" fill="#90EE90"/>
      {/* Eyes */}
      <path d="M5,4h2v2H5z M9,4h2v2H9z" fill="#FFFFFF"/>
      <path d="M6,5h1v1H6z M10,5h1v1h-1z" fill="#000000"/>
      {/* Mouth */}
      <path d="M6,8h4v1H6z" fill="#000000"/>
    </svg>
);

const PixelKeyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }} className={className}>
        <path d="M6,2h4v2h1v1h1v2h-2v1h-1v1h-1v-1H7v-1H5V5h1V4h1V2z" fill="#FFD700"/>
        <path d="M7,3h2v1H7V3z" fill="#DAA520"/>
        <path d="M8,7h1v2h2v1h-2v1h-1V7z" fill="#FFD700"/>
    </svg>
);

const PixelCastleIcon: React.FC<{className?: string, open?: boolean}> = ({ className, open = false }) => (
   <svg width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }} className={className}>
      <path d="M2,3h12v11H2V3z" fill="#C0C0C0"/>
      <path d="M3,2h2v2H3V2z M7,2h2v2H7V2z M11,2h2v2h-2V2z" fill="#A9A9A9"/>
      <path d="M3,4h10v9H3V4z" fill="#D3D3D3"/>
      <path d="M6,9h4v5H6V9z" fill={open ? "#000000" : "#A52A2A"}/>
      { !open && <path d="M8,11h1v1H8z" fill="#FFD700"/> }
    </svg>
);

// --- Overlay/Modal Component ---

const GameOverlay: React.FC<{
  gameState: 'failed' | 'gameOver' | 'succeeded';
  failureReason: 'wrongAnswer' | 'enemyCollision' | null;
  onReset: () => void;
  onExit: () => void;
  onContinue: () => void;
}> = ({ gameState, failureReason, onReset, onExit, onContinue }) => {
  const baseModalClasses = "fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in font-pixel";
  const modalBoxClasses = "bg-blue-300 pixel-border rounded-lg p-8 text-center flex flex-col items-center gap-4 mx-4";
  const textShadow = {textShadow: '2px 2px 0px #000'};

  const renderButton = (onClick: () => void, text: string, color: string) => (
      <button
        onClick={onClick}
        className={`px-6 py-3 ${color} text-white pixel-border rounded-md transform hover:-translate-y-1 transition-transform`}
      >
        {text}
      </button>
  );

  if (gameState === 'succeeded') {
    return (
      <div className={baseModalClasses}>
        <div className={modalBoxClasses}>
          <h3 className="text-2xl text-white" style={textShadow}>Bom Trabalho!</h3>
          <p className="text-lg text-white" style={textShadow}>Pegue a chave e abra o castelo!</p>
          {renderButton(onContinue, 'Continuar', 'bg-blue-500')}
        </div>
      </div>
    );
  }

  if (gameState === 'failed' || gameState === 'gameOver') {
    let title = '';
    let message = '';
    if (gameState === 'gameOver') {
      title = 'Tempo Esgotado!';
      message = 'Mais sorte da próxima vez!';
    } else if (failureReason === 'enemyCollision') {
      title = 'Você foi pego!';
      message = 'O inimigo te alcançou.';
    } else {
      title = 'Resposta Errada!';
      message = 'Não desista, tente de novo!';
    }

    return (
      <div className={baseModalClasses}>
        <div className={modalBoxClasses}>
          <h3 className="text-2xl text-red-500" style={textShadow}>{title}</h3>
          <p className="text-lg text-white" style={textShadow}>{message}</p>
          <div className="flex gap-4 mt-4">
             {renderButton(onReset, 'Recomeçar', 'bg-yellow-500')}
             {gameState === 'gameOver' && renderButton(onExit, 'Sair', 'bg-gray-500')}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const IntroOverlay: React.FC<{ sentence: React.ReactNode; onContinue: () => void; }> = ({ sentence, onContinue }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in font-pixel">
      <div className="bg-blue-300 pixel-border rounded-lg p-8 text-center flex flex-col items-center gap-4 mx-4">
        <h3 className="text-2xl text-white" style={{textShadow: '2px 2px 0px #000'}}>
          Prepare-se!
        </h3>
        <div className="mt-4 p-4 bg-blue-900/50 rounded-lg text-white text-sm" style={{textShadow: '2px 2px 0px #000'}}>
            <p>A palavra em negrito é Substantivo(S), Adjetivo(A) ou Verbo(V)?</p>
            <p className="text-xl mt-2 text-center py-2 leading-tight">
                {sentence}
            </p>
        </div>
        <button
          onClick={onContinue}
          className="mt-6 px-8 py-3 bg-green-500 text-white pixel-border rounded-md transform hover:-translate-y-1 transition-transform"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};


// --- Game Logic Component ---

interface GameScreenProps {
  level: Level;
  onLevelComplete: () => void;
  onExit: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ level, onLevelComplete, onExit }) => {
  const [frogPos, setFrogPos] = useState({ x: 1, y: 5 });
  const [isHopping, setIsHopping] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [answered, setAnswered] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [message, setMessage] = useState('');
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'failed' | 'gameOver' | 'succeeded'>('intro');
  const [failureReason, setFailureReason] = useState<'wrongAnswer' | 'enemyCollision' | null>(null);
  const [enemies, setEnemies] = useState<Array<{ id: number; x: number; y: number }>>([]);


  const { sentence, boldWord } = level;
  const sentenceParts = sentence.split(boldWord);
  const sentenceJsx = useMemo(() => (
      <>
        {sentenceParts[0]}
        <strong className="text-yellow-300 underline">{boldWord}</strong>
        {sentenceParts[1]}
      </>
  ), [sentence, boldWord]);
  
  const levelConfig = useMemo(() => {
    const otherAnswers = (['S', 'A', 'V'] as AnswerType[]).filter(a => a !== level.correctAnswer);
    
    const positions = [
        { x: 5, y: 2 }, { x: 5, y: 5 }, { x: 5, y: 8 },
    ];

    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    return {
        correctBoxPos: positions[0],
        wrongBox1Pos: positions[1],
        wrongBox2Pos: positions[2],
        keyPos: { x: 10, y: 10 },
        doorPos: { x: 11, y: 5 },
        wrongAnswer1: otherAnswers[0],
        wrongAnswer2: otherAnswers[1],
    };
  }, [level.correctAnswer]);

  const resetLevel = useCallback(() => {
    setFrogPos({ x: 1, y: 5 });
    setTimeLeft(45);
    setAnswered(false);
    setHasKey(false);
    setMessage('');
    setFailureReason(null);
  
    const levelIndex = level.id > 10 ? level.id - 11 : level.id - 1;
    const numEnemies = 3 + Math.floor(levelIndex / 2);
    
    const newEnemies = [];
    const occupiedSpaces = new Set([
      '1,5', 
      `${levelConfig.correctBoxPos.x},${levelConfig.correctBoxPos.y}`,
      `${levelConfig.wrongBox1Pos.x},${levelConfig.wrongBox1Pos.y}`,
      `${levelConfig.wrongBox2Pos.x},${levelConfig.wrongBox2Pos.y}`,
      `${levelConfig.keyPos.x},${levelConfig.keyPos.y}`,
      `${levelConfig.doorPos.x},${levelConfig.doorPos.y}`,
    ]);

    for (let i = 0; i < numEnemies; i++) {
        let x, y, posKey;
        do {
            x = Math.floor(Math.random() * GAME_GRID_SIZE);
            y = Math.floor(Math.random() * GAME_GRID_SIZE);
            posKey = `${x},${y}`;
        } while (occupiedSpaces.has(posKey));
        occupiedSpaces.add(posKey);
        newEnemies.push({ id: i, x, y });
    }
    setEnemies(newEnemies);

  }, [level, levelConfig]);

  const handleReset = useCallback(() => {
    resetLevel();
    setGameState('intro');
  }, [resetLevel]);
  
  const handleContinue = useCallback(() => {
    setAnswered(true);
    setGameState('playing');
  }, []);

  const handleStartGame = useCallback(() => {
    setGameState('playing');
  }, []);

  useEffect(() => {
    resetLevel();
    setGameState('intro');
  }, [level, resetLevel]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      setGameState('gameOver');
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const levelIndex = level.id > 10 ? level.id - 11 : level.id - 1;
    const enemySpeed = Math.max(150, 450 - levelIndex * 25);

    const moveTimer = setInterval(() => {
        setEnemies(currentEnemies => currentEnemies.map(enemy => {
            const dx = frogPos.x - enemy.x;
            const dy = frogPos.y - enemy.y;
            let newX = enemy.x;
            let newY = enemy.y;

            if (Math.abs(dx) > Math.abs(dy)) {
                newX += Math.sign(dx);
            } else if (dy !== 0) {
                newY += Math.sign(dy);
            } else if (dx !== 0) {
                 newX += Math.sign(dx);
            }

            return { ...enemy, x: newX, y: newY };
        }));
    }, enemySpeed);

    return () => clearInterval(moveTimer);
  }, [gameState, frogPos, level.id]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setIsHopping(true);
        setTimeout(() => setIsHopping(false), 100);

        setFrogPos(prev => {
          let newPos = { ...prev };
          if (e.key === 'ArrowUp') newPos.y = Math.max(0, prev.y - 1);
          if (e.key === 'ArrowDown') newPos.y = Math.min(GAME_GRID_SIZE - 1, prev.y + 1);
          if (e.key === 'ArrowLeft') newPos.x = Math.max(0, prev.x - 1);
          if (e.key === 'ArrowRight') newPos.x = Math.min(GAME_GRID_SIZE - 1, prev.x + 1);
          return newPos;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);
  
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (enemies.some(e => e.x === frogPos.x && e.y === frogPos.y)) {
        setFailureReason('enemyCollision');
        setGameState('failed');
        return;
    }
    
    const isAtWrongBox1 = frogPos.x === levelConfig.wrongBox1Pos.x && frogPos.y === levelConfig.wrongBox1Pos.y;
    const isAtWrongBox2 = frogPos.x === levelConfig.wrongBox2Pos.x && frogPos.y === levelConfig.wrongBox2Pos.y;
    if ((isAtWrongBox1 || isAtWrongBox2) && !answered) {
        setFailureReason('wrongAnswer');
        setGameState('failed');
        return;
    }

    if (frogPos.x === levelConfig.correctBoxPos.x && frogPos.y === levelConfig.correctBoxPos.y && !answered) {
        setGameState('succeeded');
        return;
    }
    
    if (frogPos.x === levelConfig.keyPos.x && frogPos.y === levelConfig.keyPos.y && answered && !hasKey) {
        setHasKey(true);
        setMessage('Você pegou a chave! Vá para o castelo!');
    }
    
    if (frogPos.x === levelConfig.doorPos.x && frogPos.y === levelConfig.doorPos.y && hasKey) {
        onLevelComplete();
    }
    
  }, [frogPos, answered, hasKey, onLevelComplete, levelConfig, gameState, enemies]);
  
  const QuestionBox: React.FC<{x:number, y:number, answer:string}> = ({x, y, answer}) => (
      <div className="flex items-center justify-center bg-yellow-200 pixel-border text-black font-pixel text-5xl" style={{ gridArea: `${y + 1} / ${x + 1}` }}>
          {answer}
      </div>
  );

  return (
    <>
      {gameState === 'intro' && <IntroOverlay sentence={sentenceJsx} onContinue={handleStartGame} />}
      {(gameState === 'failed' || gameState === 'gameOver' || gameState === 'succeeded') && 
        <GameOverlay gameState={gameState} failureReason={failureReason} onReset={handleReset} onExit={onExit} onContinue={handleContinue} />}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto font-pixel">
          <div className="w-full lg:w-1/3 bg-blue-300/80 pixel-border rounded-lg p-6 flex flex-col justify-between text-white" style={{textShadow: '2px 2px 0px #000'}}>
              <div>
                  <h2 className="text-2xl">Nível {level.id > 10 ? level.id - 10 : level.id}</h2>
                  <div className="mt-4 p-4 bg-blue-900/50 rounded-lg text-sm">
                      <p>A palavra em negrito é Substantivo(S), Adjetivo(A) ou Verbo(V)?</p>
                      <p className="text-lg mt-2 text-center py-2 leading-tight">
                          {sentenceJsx}
                      </p>
                  </div>
              </div>
              <div className="mt-4">
                  <div className="text-5xl text-center bg-black/70 p-4 rounded-lg">
                      {`00:${timeLeft.toString().padStart(2, '0')}`}
                  </div>
                  <p className="text-center h-14 mt-4 text-yellow-300">{message}</p>
              </div>
              <button onClick={onExit} className="w-full mt-4 px-6 py-3 bg-red-500 pixel-border rounded-lg shadow-lg hover:bg-red-600 transition-all">
                  Sair
              </button>
          </div>
          
          <div className="w-full lg:w-2/3 aspect-square bg-yellow-800 pixel-border rounded-lg p-1 relative overflow-hidden"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, #a16207, #a16207 1px, transparent 1px, transparent calc(100% / 12)), repeating-linear-gradient(90deg, #a16207, #a16207 1px, transparent 1px, transparent calc(100% / 12))' }}>
              <div className="relative w-full h-full">
                  <div className="grid h-full w-full" style={{ gridTemplateColumns: `repeat(${GAME_GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GAME_GRID_SIZE}, 1fr)` }}>
                      <QuestionBox x={levelConfig.correctBoxPos.x} y={levelConfig.correctBoxPos.y} answer={level.correctAnswer} />
                      <QuestionBox x={levelConfig.wrongBox1Pos.x} y={levelConfig.wrongBox1Pos.y} answer={levelConfig.wrongAnswer1} />
                      <QuestionBox x={levelConfig.wrongBox2Pos.x} y={levelConfig.wrongBox2Pos.y} answer={levelConfig.wrongAnswer2} />
                      
                      {answered && (
                        <div className="transition-opacity duration-500 flex items-center justify-center" style={{ gridArea: `${levelConfig.keyPos.y + 1} / ${levelConfig.keyPos.x + 1}`, opacity: hasKey ? 0 : 1 }}>
                          <PixelKeyIcon className="w-3/4 h-3/4" />
                        </div>
                      )}
                      <div className="flex items-center justify-center" style={{ gridArea: `${levelConfig.doorPos.y + 1} / ${levelConfig.doorPos.x + 1}`}}>
                        <PixelCastleIcon open={hasKey} className="w-full h-full" />
                      </div>
                  </div>
                  
                  {enemies.map(enemy => (
                      <div key={enemy.id} style={{
                          position: 'absolute',
                          width: `calc(100% / ${GAME_GRID_SIZE})`,
                          height: `calc(100% / ${GAME_GRID_SIZE})`,
                          top: 0, left: 0,
                          transform: `translate(${enemy.x * 100}%, ${enemy.y * 100}%)`,
                          transition: 'transform 0.4s linear',
                      }}>
                          <SpikyBeetleIcon />
                      </div>
                  ))}

                  <div style={{
                          position: 'absolute',
                          width: `calc(100% / ${GAME_GRID_SIZE})`,
                          height: `calc(100% / ${GAME_GRID_SIZE})`,
                          top: 0, left: 0,
                          transform: `translate(${frogPos.x * 100}%, ${frogPos.y * 100}%)`,
                          transition: 'transform 0.1s linear',
                      }}>
                      <PixelFrogIcon className={`w-full h-full transition-transform duration-100 ease-out ${isHopping ? 'transform scale-125 -translate-y-1' : ''}`} />
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default GameScreen;