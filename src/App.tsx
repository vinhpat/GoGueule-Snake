import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black relative flex flex-col items-center justify-center p-4 lg:p-10 text-xl overflow-hidden font-mono">
      {/* Noise and CRT overlays */}
      <div className="crt-overlay"></div>
      <div className="static-noise"></div>
      
      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center gap-12 tearing">
        
        <header className="flex flex-col items-center gap-4 border-4 border-[#0ff] p-6 w-full text-center bg-black brutalist-shadow-magenta">
          <div className="flex items-center gap-4 md:gap-6">
            <Terminal className="w-12 h-12 md:w-16 md:h-16 text-[#f0f]" />
            <h1 
              className="font-pixel text-2xl md:text-5xl lg:text-7xl text-white uppercase glitch tracking-tighter"
              data-text="SYS.KERN_EXEC"
            >
              SYS.KERN_EXEC
            </h1>
          </div>
          <div className="font-pixel text-[#0ff] text-[10px] md:text-xs uppercase tracking-widest mt-2 flex flex-col gap-1 items-center">
            <span>[ALLOCATING RAM... OK]</span>
            <span>[MOUNTING VIRTUAL ENV... V_SNAKE01]</span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-16 lg:gap-12">
          <div className="w-full flex-1 flex justify-center lg:justify-end">
            <SnakeGame />
          </div>
          <div className="w-full flex-1 flex justify-center lg:justify-start">
            <MusicPlayer />
          </div>
        </div>
        
        <footer className="w-full border-t-4 border-[#0ff] pt-4 flex justify-between font-pixel text-[10px] md:text-xs text-[#f0f] bg-black p-4 brutalist-shadow-cyan">
           <span>{">"}_ MEMORY_BANK: 0x9FA3B2</span>
           <span className="animate-pulse">_WAITING_FOR_INPUT</span>
        </footer>
      </div>
    </div>
  );
}
