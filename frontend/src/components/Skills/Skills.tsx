"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Icon } from '@iconify/react';
import type { Skill, SkillCategory } from '@/types/skill';

const SKILLS: Skill[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    icon: 'logos:react',
    category: 'Frontend',
    isActive: true,
    description: '2+ years of React development experience. Deep understanding of hooks, context, performance optimization, and architectural patterns.'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: 'logos:nextjs-icon',
    category: 'Frontend',
    isActive: true,
    description: '1.5+ years of Next.js experience. Proficient with App Router, server components, and performance optimization. Experience with ISR, SSG, and SSR.'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'logos:typescript-icon',
    category: 'Frontend',
    isActive: true,
    description: 'Actively using TypeScript in all projects to ensure type safety and improve team development. Experience with advanced types and patterns.'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'logos:javascript',
    category: 'Frontend',
    isActive: true,
    description: 'Core frontend development language with 4+ years of experience. Deep understanding of JavaScript fundamentals, asynchronous programming, and modern features.'
  },
  {
    id: 'tailwindcss',
    name: 'TailwindCSS',
    icon: 'logos:tailwindcss-icon',
    category: 'Frontend',
    isActive: true,
    description: 'Actively using TailwindCSS to create modern and responsive interfaces. Experience with custom configurations and optimization.'
  },
  {
    id: 'materialui',
    name: 'Material UI',
    icon: 'logos:material-ui',
    category: 'Frontend',
    isActive: true,
    description: 'Experience with Material UI for creating consistent user interfaces. Theme customization and component styling.'
  },
  // Backend
  {
    id: 'rust',
    name: 'Rust',
    icon: 'vscode-icons:file-type-rust',
    category: 'Backend',
    isActive: true,
    description: 'Experience in building high-performance backend services. Focus on memory safety and concurrent programming. Integration with various APIs and services.'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: 'logos:nodejs-icon',
    category: 'Backend',
    isActive: true,
    description: 'Experience in backend service development with Node.js. Working with Express, REST APIs, and various service integrations.'
  },
  // Other
  {
    id: 'cicd',
    name: 'CI/CD',
    icon: 'logos:github-actions',
    category: 'Other',
    isActive: true,
    description: 'Experience with CI/CD pipeline setup using GitHub Actions. Automation of testing, building, and deployment processes.'
  },
  {
    id: 'storyblok',
    name: 'Storyblok',
    icon: 'logos:storyblok-icon',
    category: 'Other',
    isActive: true,
    description: 'Experience with Storyblok as headless CMS. Creation of custom components and blocks.'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    icon: 'logos:vercel-icon',
    category: 'Other',
    isActive: true,
    description: 'Experience in deploying and optimizing applications on Vercel platform. Working with analytics and Web Vitals optimization.'
  },
  {
    id: 'nx',
    name: 'NX',
    icon: 'logos:nx',
    category: 'Other',
    isActive: true,
    description: 'Experience with monorepo management using NX. Workspace configuration and development process optimization.'
  }
];

// Добавляем конфигурацию для категорий с иконками
const CATEGORIES = [
  {
    id: 'Frontend',
    icon: 'carbon:application-web',
    label: 'Frontend'
  },
  {
    id: 'Backend',
    icon: 'carbon:terminal',
    label: 'Backend'
  },
  {
    id: 'Other',
    icon: 'carbon:tools',
    label: 'Other'
  }
] as const;

export function Skills() {
  const { ref, isInView } = useInView();
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('Frontend');

  const mainSkills = SKILLS.filter(skill => 
    skill.isActive && ['react', 'nextjs', 'typescript'].includes(skill.id)
  );

  const filteredSkills = SKILLS.filter(skill => 
    skill.category === activeCategory
  );

  return (
    <section className={`relative bg-[var(--bg-primary)] py-24 ${showAll ? '' : 'mb-0'}`}>
      <div className="container-custom">
        <div 
          ref={ref}
          className={`transition-all duration-1000 transform
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-center mb-16
            bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent)]
            bg-clip-text text-transparent">
            Skills
          </h2>

          {/* Main Skills */}
          {!showAll && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 px-4 sm:px-0">
              {mainSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  className="block-bg p-6 sm:p-8 border-2 border-[var(--block-border)] hover:border-[var(--accent)]
                    transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-4">
                    <Icon 
                      icon={skill.icon} 
                      className="w-10 h-10 sm:w-8 sm:h-8"
                    />
                    <div>
                      <h3 className="text-xl sm:text-lg font-bold text-[var(--text-primary)]">
                        {skill.name}
                      </h3>
                      <span className="text-[var(--accent)]">Active</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Show All Button */}
          {!showAll && (
            <div className="text-center">
              <motion.button
                onClick={() => setShowAll(true)}
                className="group relative px-8 py-4 border-2 border-[var(--block-border)] 
                  bg-[var(--block-bg)] rounded-lg overflow-hidden
                  hover:border-[var(--accent)] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Градиентный фон при наведении */}
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 
                  via-[var(--accent)]/10 to-[var(--accent)]/0 
                  translate-x-[-100%] group-hover:translate-x-[100%] 
                  transition-transform duration-1000" 
                />
                
                {/* Текст кнопки */}
                <span className="relative flex items-center gap-2 text-lg font-medium
                  text-gray-400 group-hover:text-white transition-colors">
                  <span>View All Skills</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </span>
              </motion.button>
            </div>
          )}

          {/* Detailed Skills */}
          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-24"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold">
                    Programming Languages / Frameworks
                  </h3>
                  <button
                    onClick={() => setShowAll(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {CATEGORIES.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id as SkillCategory)}
                      className={`px-4 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-xl transition-colors duration-300 
                        flex items-center gap-2 sm:gap-3
                        ${activeCategory === category.id
                          ? 'bg-[var(--block-bg)] text-[var(--accent)] border-2 border-[var(--accent)]'
                          : 'bg-[var(--block-bg)] text-gray-400 border-2 border-[var(--block-border)]'
                        } hover:text-[var(--accent)] hover:border-[var(--accent)]`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon 
                        icon={category.icon} 
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 flex-shrink-0
                          ${activeCategory === category.id ? 'text-[var(--accent)]' : 'text-gray-400'}`}
                      />
                      <span className="min-w-[60px] sm:min-w-[80px] text-center">{category.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Skills Grid */}
                <div className="grid gap-6 px-4 sm:px-0">
                  {filteredSkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      className="block-bg p-6 sm:p-8 border-2 border-[var(--block-border)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-start gap-4">
                        <Icon 
                          icon={skill.icon} 
                          className="w-12 h-12 sm:w-10 sm:h-10 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-[var(--text-primary)]">
                              {skill.name}
                            </h3>
                            <span className="text-[var(--accent)]">Active</span>
                          </div>
                          <p className="text-gray-400 text-base sm:text-sm">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 