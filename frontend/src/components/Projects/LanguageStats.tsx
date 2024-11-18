"use client";

import { motion } from 'framer-motion';

interface Language {
  name: string;
  percentage: number;
  color: string;
}

interface LanguageStatsProps {
  languages: Language[];
}

const COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  CSS: '#563d7c',
  Rust: '#dea584',
  TOML: '#333333'
};

export function LanguageStats({ languages }: LanguageStatsProps) {
  return (
    <div className="mt-4">
      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full overflow-hidden flex">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            className="h-full"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: COLORS[lang.name as keyof typeof COLORS] || '#666',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        ))}
      </div>

      {/* Language List */}
      <div className="mt-3 flex flex-wrap gap-3">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: COLORS[lang.name as keyof typeof COLORS] || '#666'
              }}
            />
            <span className="text-sm text-gray-400">
              {lang.name} <span className="font-medium">{lang.percentage}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 