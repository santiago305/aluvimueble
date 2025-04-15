// components/Preloader.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Detectar el tema actual
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      onAnimationComplete={onFinish}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
    </motion.div>
  );
}
