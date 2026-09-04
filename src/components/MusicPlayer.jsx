import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

const MusicPlayer = forwardRef(({ autoStart = false }, ref) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const audioSources = weddingConfig.musicTrack.audioUrls || [weddingConfig.musicTrack.audioUrl];

  useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Retrying audio with alternate source:", err);
            handleAudioError();
          });
      }
    },
    pauseMusic: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }));

  useEffect(() => {
    if (autoStart && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log('Autoplay deferred until user interaction'));
    }
  }, [autoStart]);

  const handleAudioError = () => {
    // Try next audio source URL if available
    if (trackIndex < audioSources.length - 1) {
      const nextIdx = trackIndex + 1;
      setTrackIndex(nextIdx);
      if (audioRef.current) {
        audioRef.current.src = audioSources[nextIdx];
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("Next source blocked", e));
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(handleAudioError);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSources[trackIndex]}
        loop
        preload="auto"
        onError={handleAudioError}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed bottom-4 left-4 z-[80] flex items-center"
      >
        <div className="bg-glass-dark border border-gold/40 text-champagne rounded-full p-2 md:p-2.5 shadow-royal backdrop-blur-md flex items-center gap-3 pr-4">
          
          {/* Play / Pause Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gold-gradient text-royal-maroon flex items-center justify-center shadow-md cursor-pointer hover:brightness-110 transition-all"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-royal-maroon text-royal-maroon" />
            ) : (
              <Play className="w-5 h-5 fill-royal-maroon text-royal-maroon ml-0.5" />
            )}
          </motion.button>

          {/* Equalizer Waveform & Song Title */}
          <div className="flex flex-col justify-center text-left max-w-[130px] md:max-w-[170px] overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-sans tracking-widest text-gold/90 font-semibold flex items-center gap-1">
                <Music className="w-3 h-3 text-gold animate-pulse" /> Now Playing
              </span>

              {/* Animated Audio Equalizer Bars */}
              {isPlaying && !isMuted && (
                <div className="flex items-end gap-[2px] h-3 ml-1">
                  <span className="w-[2px] bg-gold rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
                  <span className="w-[2px] bg-gold rounded-full animate-[bounce_0.8s_infinite_300ms] h-2/3" />
                  <span className="w-[2px] bg-gold rounded-full animate-[bounce_0.8s_infinite_200ms] h-4/5" />
                  <span className="w-[2px] bg-gold rounded-full animate-[bounce_0.8s_infinite_400ms] h-1/2" />
                </div>
              )}
            </div>

            <p className="text-xs font-cormorant text-champagne truncate font-medium">
              {weddingConfig.musicTrack.title}
            </p>
          </div>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="p-1.5 hover:text-gold text-champagne/70 transition-colors ml-1 cursor-pointer"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-gold/90" />
            )}
          </button>
        </div>
      </motion.div>
    </>
  );
});

export default MusicPlayer;
