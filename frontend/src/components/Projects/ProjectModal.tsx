"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 
            flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--block-bg)] p-6 md:p-8 rounded-xl max-w-4xl w-full 
              max-h-[90vh] overflow-y-auto border-2 border-[var(--block-border)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white
                transition-colors"
            >
              Закрыть
            </button>

            <h2 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">
              {project.title}
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--accent)]">Обзор</h3>
                <p className="text-gray-300">{project.details.overview}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--accent)]">Особенности</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {project.details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--accent)]">Сложности</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {project.details.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--accent)]">Решения</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {project.details.solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 