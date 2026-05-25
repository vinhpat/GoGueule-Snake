import React from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { Cpu, RotateCcw } from 'lucide-react';

export function SnakeGame() {
  const { snake, food, isGameOver, isPaused, score, resetGame, GRID_SIZE } = useSnakeGame();

  return (
    <div className="w-full max-w-min flex flex-col p-6 bg-black brutalist-border-cyan brutalist-shadow-magenta z-10 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-[400px] mb-6 border-b-4 border-[#f0f] pb-4 font-pixel">
        <div className="flex items-center gap-3 text-[#0ff]">
          <Cpu className="w-6 h-6" />
          <span className="text-xl">
            0x{score.toString(16).padStart(4, '0').toUpperCase()}
          </span>
        </div>
        <div className="flex gap-2 text-[10px] uppercase">
          {isGameOver && (
            <span className="text-white bg-[#f0f] px-2 py-1 animate-pulse border-2 border-white">
              ERR_FATAL
            </span>
          )}
          {isPaused && !isGameOver && (
            <span className="text-black bg-[#0ff] px-2 py-1 border-2 border-white">
              HALTED
            </span>
          )}
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="relative bg-black border-4 border-[#fff] overflow-hidden"
        style={{
          width: `${GRID_SIZE * 20}px`,
          height: `${GRID_SIZE * 20}px`,
        }}
      >
        {/* Grid Background Effect */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" 
             style={{
               backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px)`,
               backgroundSize: `20px 20px`,
             }}>
        </div>

        {/* Snake rendering */}
        {snake.map((segment, idx) => (
          <div
            key={`${segment.x}-${segment.y}-${idx}`}
            className="absolute z-10 font-mono flex items-center justify-center text-[12px] text-black font-black"
            style={{
              left: `${segment.x * 20}px`,
              top: `${segment.y * 20}px`,
              width: '20px',
              height: '20px',
              backgroundColor: idx === 0 ? '#ff00ff' : '#00ffff',
              border: '2px solid black'
            }}
          >
            {idx === 0 ? 'X' : ''}
          </div>
        ))}

        {/* Food rendering */}
        <div
          className="absolute z-10"
          style={{
            left: `${food.x * 20}px`,
            top: `${food.y * 20}px`,
            width: '20px',
            height: '20px',
            backgroundColor: '#000',
            border: '2px solid #00ffff'
          }}
        >
          <div className="w-full h-full bg-[#ff00ff] animate-pulse"></div>
        </div>

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/90">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 p-4 bg-black border-4 border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black transition-colors font-pixel text-xs brutalist-shadow-magenta cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              REBOOT_SEQ
            </button>
          </div>
        )}

      </div>

      <div className="mt-6 text-center font-mono text-[14px] text-[#fff] bg-[#f0f]/20 p-2 border-2 border-[#f0f]">
        I/O CTRL: [W][A][S][D] | PAUSE: [SPACE]
      </div>
    </div>
  );
}
