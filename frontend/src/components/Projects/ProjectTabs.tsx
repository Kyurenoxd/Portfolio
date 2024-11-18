"use client";

import { motion } from 'framer-motion';
import type { ProjectMainCategory } from '@/types/project';

interface ProjectTabsProps {
  tabs: ProjectMainCategory[];
  activeTab: ProjectMainCategory;
  onTabChange: (tab: ProjectMainCategory) => void;
}

export function ProjectTabs({ tabs, activeTab, onTabChange }: ProjectTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 rounded-full text-lg transition-all duration-300
            ${activeTab === tab 
              ? 'bg-[var(--accent)] text-white font-medium shadow-lg shadow-[var(--accent)]/20'
              : 'bg-[var(--block-bg)] text-gray-400 hover:text-white border-2 border-[var(--block-border)]'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab}
        </motion.button>
      ))}
    </div>
  );
} 