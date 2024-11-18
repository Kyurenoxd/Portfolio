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
            About Me
          </h2>

          <div className={`space-y-8 text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto font-medium
            transition-all duration-1000 delay-400
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <p>
              A Senior Full-stack Developer with 4+ years of professional experience in building
              high-performance web applications and scalable systems.
            </p>
            <p>
              I excel in both frontend and backend development, with deep expertise in the React ecosystem
              and strong proficiency in Rust. As an experienced UI/UX designer, I combine technical skills
              with a keen eye for design to create exceptional user experiences.
            </p>
            <p>
              My approach integrates clean architecture principles with modern design patterns,
              ensuring both aesthetic appeal and technical excellence in every project.
            </p>
          </div>

          {/* Statistics */}
          <div className={`grid grid-cols-3 gap-12 mt-16 max-w-4xl mx-auto
            transition-all duration-1000 delay-600
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="text-center">
              <h3 className="text-4xl lg:text-5xl font-bold text-[var(--accent)]">4+</h3>
              <p className="text-lg text-gray-400 mt-2">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl lg:text-5xl font-bold text-[var(--accent)]">50+</h3>
              <p className="text-lg text-gray-400 mt-2">Client Projects</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl lg:text-5xl font-bold text-[var(--accent)]">30+</h3>
              <p className="text-lg text-gray-400 mt-2">Open Source</p>
            </div>
          </div>

          {/* Skills Tags */}
          <div className={`mt-16 flex flex-wrap gap-3 justify-center
            transition-all duration-1000 delay-800
            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {[
              'React', 
              'Next.js', 
              'TypeScript', 
              'Rust', 
              'UI/UX Design', 
              'System Design'
            ].map((skill) => (
              <span 
                key={skill}
                className="px-6 py-3 rounded-full text-lg bg-[var(--block-border)] 
                  text-gray-300 border-2 border-[var(--block-border)] opacity-80
                  hover:opacity-100 transition-opacity font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 