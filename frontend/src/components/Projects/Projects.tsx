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
    label: 'Мои проекты'
  },
  {
    id: 'External Projects',
    icon: 'carbon:partnership',
    label: 'Внешние проекты'
  }
] as const;

const SUB_CATEGORIES = [
  {
    id: 'Frontend',
    icon: 'carbon:application-web',
    label: 'Фронтенд'
  },
  {
    id: 'Backend',
    icon: 'carbon:terminal',
    label: 'Бэкенд'
  }
] as const;

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Портфолио v2',
    description: 'Современный сайт-портфолио с интеграцией Spotify API, плавными анимациями и адаптивным дизайном.',
    mainCategory: 'My Projects',
    subCategory: 'Frontend',
    technologies: ['TypeScript 96.9%', 'CSS 1.8%', 'JavaScript 1.3%'],
    demo: 'Демо',
    github: 'https://github.com/Kyurenoxd/Portfolio',
    details: {
      overview: 'Современное портфолио, демонстрирующее мои проекты и навыки, построенное на Next.js с бэкендом на Rust',
      features: [
        'Интеграция со Spotify',
        'Обновления погоды в реальном времени',
        'Адаптивный дизайн',
        'Плавные анимации'
      ],
      challenges: ['Интеграция API', 'Оптимизация производительности', 'Плавность анимаций'],
      solutions: ['Кастомный бэкенд на Rust', 'Framer Motion для анимаций', 'Оптимизация загрузки ресурсов']
    }
  },
  {
    id: '2',
    title: 'Интеграция погоды и Spotify',
    description: 'Бэкенд-сервис на Rust для получения данных о погоде в реальном времени и интеграции с Spotify.',
    mainCategory: 'My Projects',
    subCategory: 'Backend',
    technologies: ['Rust 98.2%', 'TOML 1.8%'],
    demo: 'Демо',
    details: {
      overview: 'Высокопроизводительный бэкенд-сервис на Rust для обработки обновлений погоды и интеграции со Spotify',
      features: [
        'Интеграция с OpenWeather API',
        'Отображение текущего трека Spotify',
        'Обновления данных в реальном времени',
        'Обработка ошибок и восстановление',
        'Защита от превышения лимитов'
      ],
      challenges: [
        'Синхронизация данных в реальном времени',
        'Управление лимитами API',
        'Стратегии восстановления после ошибок'
      ],
      solutions: [
        'Эффективная система кэширования',
        'Умная логика повторных попыток',
        'Надежная обработка ошибок'
      ]
    }
  },
  {
    id: '3',
    title: 'OSL - OsuServerLauncher',
    description: 'Современный лаунчер для приватных серверов osu! с богатым функционалом и удобным интерфейсом.',
    mainCategory: 'External Projects',
    subCategory: 'Frontend',
    technologies: ['TypeScript 92.1%', 'JavaScript 4.8%', 'CSS 2.8%', 'HTML 0.3%'],
    demo: 'Демо',
    github: 'https://github.com/Kyurenoxd/OSL',
    details: {
      overview: 'Простой, быстрый и многофункциональный лаунчер для управления и подключения к приватным серверам osu!',
      features: [
        'Управление серверами в реальном времени',
        'Автоматическая сортировка серверов',
        'Система избранных серверов',
        'Автоматическое определение пути osu!',
        'Поддержка нескольких языков',
        'Темная/Светлая тема'
      ],
      challenges: [
        'Интеграция с различными серверами',
        'Оптимизация производительности',
        'Кроссплатформенная совместимость'
      ],
      solutions: [
        'Использование Electron для десктопа',
        'React для современного UI',
        'TypeScript для надежности кода',
        'Tailwind CSS для стилизации'
      ]
    }
  },
  {
    id: '4',
    title: 'ServerSync [В разработке]',
    description: 'Высокопроизводительный Discord Server Cloner, написанный на Golang для быстрого клонирования серверов.',
    mainCategory: 'My Projects',
    subCategory: 'Backend',
    technologies: ['Go 82.0%', 'Batchfile 18.0%'],
    github: 'https://github.com/Kyurenoxd/ServerSync',
    details: {
      overview: 'Инструмент для клонирования Discord серверов с сохранением всей структуры и настроек, написанный на Go',
      features: [
        'Клонирование структуры серверов Discord',
        'Копирование ролей с сохранением прав и цветов',
        'Копирование каналов с сохранением разрешений',
        'Копирование категорий и их структуры',
        'Перенос настроек сервера и аватара',
        'Копирование эмодзи'
      ],
      challenges: [
        'Работа с Discord API',
        'Оптимизация процесса клонирования',
        'Обработка больших объемов данных'
      ],
      solutions: [
        'Эффективная обработка запросов к API',
        'Параллельное выполнение операций',
        'Оптимизированная структура данных'
      ]
    }
  },
  {
    id: '5',
    title: 'Scared))0) [В разработке]',
    description: 'Discord бот для сервера zxcursed с расширенным функционалом модерации и развлекательными командами.',
    mainCategory: 'External Projects',
    subCategory: 'Backend',
    technologies: ['Go 100%'],
    discord: 'https://discord.gg/zxcursed',
    discordName: 'zxcursed',
    githubPlaceholder: 'https://github.com/Kyurenoxd/scared-zxcursed',
    details: {
      overview: 'Многофункциональный Discord бот для сервера zxcursed, разрабатываемый на Golang',
      features: [
        'Система модерации',
        'Развлекательные команды',
        'Интеграция с API Discord',
        'Система уровней',
        'Автоматизация задач сервера'
      ],
      challenges: [
        'Оптимизация производительности',
        'Масштабируемость системы',
        'Обработка большого количества событий'
      ],
      solutions: [
        'Эффективная архитектура',
        'Кэширование данных',
        'Асинхронная обработка событий'
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
            Проекты
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
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
} 