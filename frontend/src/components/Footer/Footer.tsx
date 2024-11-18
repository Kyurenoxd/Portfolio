"use client";

import { Icon } from '@iconify/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer() {
  const [showPolicy, setShowPolicy] = useState(false);

  return (
    <footer className="relative bg-[var(--bg-primary)] py-8 border-t border-[var(--block-border)]">
      <div className="container-custom">
        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://discord.gg/u2cgU8g3D9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[var(--accent)] transition-colors"
          >
            <Icon icon="fa6-brands:discord" className="w-6 h-6" />
          </a>
          <a
            href="https://t.me/Kyurenoxd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[var(--accent)] transition-colors"
          >
            <Icon icon="fa6-brands:telegram" className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright & Policy */}
        <div className="text-center text-sm text-gray-400">
          <p className="mb-2">© 2024 Kyureno • All rights reserved</p>
          <button
            onClick={() => setShowPolicy(true)}
            className="text-[var(--accent)] hover:underline text-sm"
          >
            Privacy Policy
          </button>
        </div>

        {/* Privacy Policy Modal */}
        <AnimatePresence>
          {showPolicy && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                onClick={() => setShowPolicy(false)}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: "spring",
                  duration: 0.5,
                  bounce: 0.3
                }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[var(--block-bg)] p-8 rounded-lg max-w-2xl w-full max-h-[90vh] 
                  overflow-y-auto border-2 border-[var(--block-border)] relative">
                  <div className="flex justify-between items-center mb-6">
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold text-[var(--text-primary)]"
                    >
                      Privacy Policy
                    </motion.h2>
                    <motion.button
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => setShowPolicy(false)}
                      className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[var(--block-border)] rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon icon="carbon:close" className="w-6 h-6" />
                    </motion.button>
                  </div>

                  <motion.div 
                    className="space-y-4 text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p>1. No personal data is collected or processed.</p>
                    <p>2. The website uses Spotify API exclusively to display the currently playing track.</p>
                    <p>3. All website materials, including texts, images, and code, are protected by copyright.</p>
                    <p>4. Copying and using materials without written permission is prohibited.</p>
                    <p>5. If you have any questions, you can contact me through Discord (@https://discord.gg/u2cgU8g3D9) or Telegram (@Kyurenoxd).</p>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
} 