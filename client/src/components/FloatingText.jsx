import { motion } from 'framer-motion';

export default function FloatingText({ text, delay = 0 }) {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className={letter === " " ? "mr-2" : ""}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
