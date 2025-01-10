"use client";

import { useInView } from '@/hooks/useInView';

export function About() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
      <div className="container-custom max-w-6xl">
        <div 
          ref={ref}
          className={`block-bg p-12 md:p-16 lg:p-20 backdrop-blur-sm border-4 border-[var(--block-border)] 
            transition-all duration-1000 transform
            ${isInView 
              ? 'opacity-100 translate-y-0 blur-0' 
              : 'opacity-0 translate-y-10 blur-sm'
            }`}
        >
          <h2 
            className={`text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r 
              from-[var(--text-primary)] to-[var(--accent)] bg-clip-text 
              text-transparent mb-12 text-center transition-all duration-1000 delay-200
              ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            Обо мне
          </h2>

          <div className={`space-y-8 text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto font-medium
            transition-all duration-1000 delay-400
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <p>
              Full-stack разработчик с более чем 4-летним профессиональным опытом в создании
              высокопроизводительных веб-приложений и масштабируемых систем.
            </p>
            <p>
              Я преуспеваю как в frontend, так и в backend разработке, имею глубокие знания экосистемы React
              и сильные навыки в Golang. Как опытный UI/UX дизайнер, я сочетаю технические навыки
              с чутким восприятием дизайна для создания исключительного пользовательского опыта.
            </p>
            <p>
              Мой подход объединяет принципы чистой архитектуры с современными паттернами проектирования,
              обеспечивая как эстетическую привлекательность, так и техническое совершенство в каждом проекте.
            </p>
          </div>

          {/* Statistics */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 max-w-4xl mx-auto
            transition-all duration-1000 delay-600
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="text-center p-4 md:p-6 rounded-2xl border-2 border-[var(--block-border)] 
              bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-transparent
              hover:border-[var(--accent)] transition-all duration-300">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--accent)]">4+</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-2 md:mt-3 font-medium">Лет опыта</p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-2xl border-2 border-[var(--block-border)]
              bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-transparent
              hover:border-[var(--accent)] transition-all duration-300">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--accent)]">50+</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-2 md:mt-3 font-medium">Клиентских проектов</p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-2xl border-2 border-[var(--block-border)]
              bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-transparent
              hover:border-[var(--accent)] transition-all duration-300">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--accent)]">30+</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-2 md:mt-3 font-medium">Open Source проектов</p>
            </div>
          </div>

          {/* Skills Tags */}
          <div className={`mt-8 md:mt-16 flex flex-wrap gap-2 md:gap-4 justify-center
            transition-all duration-1000 delay-800
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {[
              { name: 'React', color: '#61DAFB' },
              { name: 'Next.js', color: '#000000' },
              { name: 'TypeScript', color: '#3178C6' },
              { name: 'Golang', color: '#00ADD8' },
              { name: 'UI/UX Design', color: '#FF69B4' },
              { name: 'System Design', color: '#9333EA' }
            ].map((skill) => (
              <span 
                key={skill.name}
                className="px-4 py-2 md:px-8 md:py-4 rounded-xl text-base md:text-lg
                  backdrop-blur-sm border-2 border-[var(--block-border)]
                  hover:scale-105 hover:border-[var(--accent)]
                  transition-all duration-300 font-medium
                  bg-gradient-to-r from-[rgba(255,255,255,0.05)] to-transparent"
                style={{
                  textShadow: `0 0 10px ${skill.color}`,
                  color: skill.color
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 