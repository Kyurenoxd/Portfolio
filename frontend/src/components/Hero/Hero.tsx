"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

export function Hero() {
  const { opacity, blur } = useSectionVisibility();

  return (
    <section 
      className="relative min-h-screen bg-[var(--bg-primary)] flex items-center justify-center"
    >
      <div 
        className="container-custom transition-all duration-700"
        style={{ 
          opacity,
          filter: `blur(${blur}px)`,
          transform: `scale(${1 - blur / 50})`
        }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 lg:mb-6 text-[var(--text-primary)]">
                Hello! I&apos;m
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold mb-6 
                bg-gradient-to-r from-[#2D2729] via-[#6366F1] to-[#2D2729] 
                bg-clip-text text-transparent 
                drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]
                animate-gradient-x
                bg-[length:200%_auto]
                whitespace-nowrap"
              >
                Kyureno
              </h1>
            </motion.div>
          </div>

          <motion.div 
            className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src="/hero-icon.png"
              alt="Hero Icon"
              fill
              className="object-contain rounded-full"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 