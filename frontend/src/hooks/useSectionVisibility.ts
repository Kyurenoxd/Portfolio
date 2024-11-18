"use client";

import { useEffect, useState } from 'react';

export function useSectionVisibility() {
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Начинаем эффекты после 30% прокрутки экрана
      const fadeStart = windowHeight * 0.3;
      // Заканчиваем к 90% прокрутки для более плавного эффекта
      const fadeEnd = windowHeight * 0.9;
      
      if (scrollPosition <= fadeStart) {
        setOpacity(1);
        setBlur(0);
      } else if (scrollPosition >= fadeEnd) {
        setOpacity(0);
        setBlur(8);
      } else {
        const fadeRange = fadeEnd - fadeStart;
        const fadeProgress = (scrollPosition - fadeStart) / fadeRange;
        // Используем нелинейную функцию для более плавного затухания
        setOpacity(Math.cos(fadeProgress * Math.PI / 2));
        setBlur(fadeProgress * 8);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { opacity, blur };
} 