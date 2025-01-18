import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GlowingButton({ children, onClick, className = '', disabled = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`
        relative overflow-hidden px-8 py-4 rounded-xl font-bold
        bg-gradient-to-r from-purple-600 to-pink-600
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      initial={false}
      animate={{
        background: isHovered
          ? 'linear-gradient(90deg, rgb(147, 51, 234) 0%, rgb(236, 72, 153) 100%)'
          : 'linear-gradient(90deg, rgb(124, 58, 237) 0%, rgb(219, 39, 119) 100%)',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      disabled={disabled}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_transparent_0%,_rgba(120,_0,_255,_0.3)_40%,_transparent_80%)]" />
      </motion.div>

      <motion.div
        className="relative z-10 flex items-center justify-center gap-2"
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: isHovered
            ? 'radial-gradient(circle at center, rgba(147, 51, 234, 0.3) 0%, transparent 70%)'
            : 'none',
        }}
      />
    </motion.button>
  );
}
