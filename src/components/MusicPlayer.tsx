import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { DUMMY_SONGS } from '../data';

export function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentSong = DUMMY_SONGS[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % DUMMY_SONGS.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + DUMMY_SONGS.length) % DUMMY_SONGS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => nextSong();

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full max-w-sm h-min bg-black border-4 border-[#f0f] brutalist-shadow-cyan p-6 relative font-mono z-10 flex flex-col justify-between mt-8 lg:mt-0">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="absolute -top-3 right-4 bg-[#f0f] text-black px-2 py-1 font-pixel text-[10px] border-2 border-black">
         AUDIO_BUFFER_ACTIVE
      </div>
      
      <div className="flex flex-col gap-6 mt-2">
        {/* Visualizer Block */}
        <div className="w-full h-24 bg-black border-4 border-[#0ff] flex items-end justify-between p-2 gap-1 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className={`w-full bg-[#0ff] border-t-2 border-white ${isPlaying ? 'animate-pulse' : ''}`}
              style={{
                height: isPlaying ? `${Math.random() * 80 + 20}%` : '10%',
                transition: 'height 0.2s',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Current Song Info */}
        <div className="flex flex-col gap-2 border-l-4 border-[#0ff] pl-4 py-2">
          <h3 className="font-pixel text-[12px] text-white uppercase glitch" data-text={currentSong.title}>
            {currentSong.title}
          </h3>
          <p className="font-mono text-xl text-[#f0f] uppercase font-bold tracking-wider pt-2">
            {currentSong.artist}
          </p>
        </div>
        
        <div className="w-full h-[4px] bg-[#f0f] my-1"></div>

        {/* Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between font-pixel text-[10px] text-[#0ff]">
            <span>T:{formatTime(progress)}</span>
            <span>D:{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleProgressChange}
            className="w-full"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-2">
          <button 
            onClick={toggleMute}
            className="text-[#f0f] hover:text-black hover:bg-[#f0f] p-2 border-4 border-[#f0f] transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>

          <div className="flex gap-4">
            <button 
              onClick={prevSong}
              className="p-2 border-4 border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black transition-colors cursor-pointer"
            >
              <SkipBack className="w-6 h-6 fill-current" />
            </button>
            <button 
              onClick={togglePlay}
              className="p-2 border-4 border-[#fff] text-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current" />
              )}
            </button>
            <button 
              onClick={nextSong}
              className="p-2 border-4 border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black transition-colors cursor-pointer"
            >
              <SkipForward className="w-6 h-6 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
