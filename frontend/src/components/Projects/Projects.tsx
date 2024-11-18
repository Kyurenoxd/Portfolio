"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ProjectTabs } from './ProjectTabs';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import type { Project, ProjectMainCategory, ProjectSubCategory } from '@/types/project';
import { Icon } from '@iconify/react';

const MAIN_CATEGORIES = [
  {
    id: 'My Projects',
    icon: 'carbon:user-profile',
    label: 'My Projects'
  },
  {
    id: 'External Projects',
    icon: 'carbon:partnership',
    label: 'External Projects'
  }
] as const;

const SUB_CATEGORIES = [
  {
    id: 'Frontend',
    icon: 'carbon:application-web',
    label: 'Frontend'
  },
  {
    id: 'Backend',
    icon: 'carbon:terminal',
    label: 'Backend'
  }
] as const;

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Portfolio v2',
    description: 'Modern portfolio website with Spotify API integration, smooth animations, and responsive design.',
    mainCategory: 'My Projects',
    subCategory: 'Frontend',
    technologies: ['TypeScript 96.9%', 'CSS 1.8%', 'JavaScript 1.3%'],
    demo: 'Live',
    details: {
      overview: 'A modern portfolio showcasing my projects and skills, built with Next.js and Rust backend',
      features: [
        'Spotify API Integration',
        'Real-time Weather Updates',
        'Responsive Design',
        'Smooth Animations'
      ],
      challenges: ['API Integration', 'Performance Optimization', 'Animation Smoothness'],
      solutions: ['Custom Rust Backend', 'Framer Motion for Animations', 'Optimized Asset Loading']
    }
  },
  {
    id: '2',
    title: 'Weather & Spotify Integration',
    description: 'Backend service built with Rust for real-time weather data and Spotify playback integration.',
    mainCategory: 'My Projects',
    subCategory: 'Backend',
    technologies: ['Rust 98.2%', 'TOML 1.8%'],
    demo: 'Live',
    details: {
      overview: 'High-performance Rust backend service handling real-time weather updates and Spotify integration',
      features: [
        'OpenWeather API Integration',
        'Spotify Current Track Display',
        'Real-time Data Updates',
        'Error Handling & Recovery',
        'Rate Limiting Protection'
      ],
      challenges: [
        'Real-time Data Synchronization',
        'API Rate Limits Management',
        'Error Recovery Strategies'
      ],
      solutions: [
        'Efficient Caching System',
        'Smart Retry Logic',
        'Robust Error Handling'
      ]
    }
  }
];

export function Projects() {
  const { ref, isInView } = useInView();
  const [activeMainCategory, setActiveMainCategory] = useState<ProjectMainCategory>('My Projects');
  const [activeSubCategory, setActiveSubCategory] = useState<ProjectSubCategory>('Frontend');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(project => 
    project.mainCategory === activeMainCategory && 
    project.subCategory === activeSubCategory
  );

  return (
    <section className="relative min-h-screen bg-[var(--bg-primary)] py-24">
      <div className="container-custom">
        <div 
          ref={ref}
          className={`transition-all duration-1000 transform
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-center mb-16
            bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent)]
            bg-clip-text text-transparent">
            Projects
          </h2>

          {/* Main Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {MAIN_CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveMainCategory(category.id);
                  setActiveSubCategory('Frontend');
                }}
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-xl
                  transition-colors duration-300 flex items-center gap-2 sm:gap-3
                  ${activeMainCategory === category.id 
                    ? 'bg-[var(--block-bg)] text-[var(--accent)] border-2 border-[var(--accent)]'
                    : 'bg-[var(--block-bg)] text-gray-400 border-2 border-[var(--block-border)]'
                  } hover:text-[var(--accent)] hover:border-[var(--accent)]`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon 
                  icon={category.icon} 
                  className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 flex-shrink-0
                    ${activeMainCategory === category.id ? 'text-[var(--accent)]' : 'text-gray-400'}`}
                />
                <span className="min-w-[60px] sm:min-w-[120px] text-center">{category.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Sub Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {SUB_CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveSubCategory(category.id)}
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg
                  transition-colors duration-300 flex items-center gap-2 sm:gap-3
                  ${activeSubCategory === category.id 
                    ? 'bg-[var(--block-bg)] text-[var(--accent)] border-2 border-[var(--accent)]'
                    : 'bg-[var(--block-bg)] text-gray-400 border-2 border-[var(--block-border)]'
                  } hover:text-[var(--accent)] hover:border-[var(--accent)]`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon 
                  icon={category.icon} 
                  className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 flex-shrink-0
                    ${activeSubCategory === category.id ? 'text-[var(--accent)]' : 'text-gray-400'}`}
                />
                <span className="min-w-[60px] sm:min-w-[80px] text-center">{category.label}</span>
              </motion.button>
            ))}
          </div>

          {activeMainCategory === 'External Projects' ? (
            <div className="text-center text-gray-400 text-xl">
              Coming Soon...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
} 