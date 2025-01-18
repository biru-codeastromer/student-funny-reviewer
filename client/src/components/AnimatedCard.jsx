import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AnimatedCard({ children }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="w-full"
      >
        {children}
      </div>
      
      {/* Gradient border effect */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(45deg, #e11d48, #7e22ce, #2563eb)",
          filter: "blur(7px)",
          zIndex: -1,
        }}
      />
    </motion.div>
  );
}
