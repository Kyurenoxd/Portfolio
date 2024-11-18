"use client";

import { Icon } from '@iconify/react';
import { useSpotify } from '@/hooks/useSpotify';
import { motion, AnimatePresence } from 'framer-motion';

export function SpotifyPlayer() {
  const { track, loading } = useSpotify();

  return (
    <section className="relative bg-[var(--bg-primary)] py-32 md:py-48 lg:py-64 min-h-screen flex items-center">
      <div className="container-custom max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={track?.title || 'not-playing'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="block-bg border-2 border-[var(--block-border)] hover:border-[var(--accent)] 
              transition-all duration-300 relative overflow-hidden mx-4"
          >
            {/* Mobile Layout (Stack) */}
            <div className="flex flex-col md:hidden">
              {/* Album Cover with Glow */}
              <div className="relative w-full aspect-square">
                {/* Glow Effect */}
                {track?.dominant_color && (
                  <div
                    className="absolute inset-0 blur-2xl transition-opacity duration-700"
                    style={{ 
                      background: track.dominant_color,
                      opacity: track.is_playing ? 0.3 : 0.15,
                      transform: 'scale(1.5)',
                    }}
                  />
                )}
                <div className="relative w-full h-full bg-[var(--block-border)]
                  flex items-center justify-center overflow-hidden z-10 rounded-t-lg"
                >
                  {track?.cover ? (
                    <motion.img 
                      src={track.cover} 
                      alt="Album Cover"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <Icon 
                      icon="carbon:music" 
                      className="w-32 h-32 text-gray-400"
                    />
                  )}
                </div>
              </div>

              {/* Track Info */}
              <div className="flex-1 z-10 p-8">
                <motion.h3 
                  className="text-2xl font-medium text-[var(--text-primary)] mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {track?.title || 'Not Playing'}
                </motion.h3>
                <motion.p 
                  className="text-xl text-gray-400 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {track?.artist || 'No Artist'}
                </motion.p>
                <div className="flex items-center gap-4 text-base text-gray-400">
                  <span>{formatTime(track?.progress || 0)}</span>
                  <div className="flex-1 h-2 bg-[var(--block-border)] rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        background: 'white',
                        width: `${track ? (track.progress / track.duration) * 100 : 0}%`,
                        opacity: track?.is_playing ? 0.8 : 0.4,
                      }}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${track ? (track.progress / track.duration) * 100 : 0}%` 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span>{formatTime(track?.duration || 0)}</span>
                </div>
              </div>
            </div>

            {/* Desktop Layout (Side by Side) */}
            <div className="hidden md:flex items-center gap-8 p-10">
              {/* Album Cover with Glow */}
              <div className="relative">
                {/* Glow Effect */}
                {track?.dominant_color && (
                  <div
                    className="absolute inset-0 blur-2xl transition-opacity duration-700"
                    style={{ 
                      background: track.dominant_color,
                      opacity: track.is_playing ? 0.3 : 0.15,
                      transform: 'scale(1.5)',
                    }}
                  />
                )}
                <div className="relative w-48 h-48 bg-[var(--block-border)] rounded-lg 
                  flex items-center justify-center overflow-hidden z-10">
                  {track?.cover ? (
                    <motion.img 
                      src={track.cover} 
                      alt="Album Cover"
                      className="w-full h-full object-cover rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <Icon 
                      icon="carbon:music" 
                      className="w-24 h-24 text-gray-400"
                    />
                  )}
                </div>
              </div>

              {/* Track Info */}
              <div className="flex-1 z-10">
                <motion.h3 
                  className="text-3xl font-medium text-[var(--text-primary)] mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {track?.title || 'Not Playing'}
                </motion.h3>
                <motion.p 
                  className="text-2xl text-gray-400 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {track?.artist || 'No Artist'}
                </motion.p>
                <div className="flex items-center gap-4 text-base text-gray-400">
                  <span>{formatTime(track?.progress || 0)}</span>
                  <div className="flex-1 h-2 bg-[var(--block-border)] rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        background: 'white',
                        width: `${track ? (track.progress / track.duration) * 100 : 0}%`,
                        opacity: track?.is_playing ? 0.8 : 0.4,
                      }}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${track ? (track.progress / track.duration) * 100 : 0}%` 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span>{formatTime(track?.duration || 0)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
} 