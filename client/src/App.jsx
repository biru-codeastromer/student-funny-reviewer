import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReviewForm from './components/ReviewForm';
import ReviewDisplay from './components/ReviewDisplay';
import ParallaxStars from './components/ParallaxStars';
import GraduationCap from './components/GraduationCap';
import AnimatedCard from './components/AnimatedCard';
import GlowingButton from './components/GlowingButton';
import FloatingText from './components/FloatingText';
import ReactConfetti from 'react-confetti';

function App() {
  const [generatedReview, setGeneratedReview] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalScroll;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReviewGenerated = (review) => {
    setGeneratedReview(review);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      <ParallaxStars />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 z-50"
        style={{ scaleX: scrollProgress }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-xl border-b border-gray-800/50 fixed w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center"
          >
            <FloatingText
              text="Student Fun Review"
              className="text-3xl font-bold"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-lg font-medium text-gray-300"
            >
              <FloatingText text="Make Learning Fun! 🎓" delay={0.5} />
            </motion.div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: headerInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: headerInView ? 0 : 20, opacity: headerInView ? 1 : 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl md:text-6xl font-extrabold"
              >
                <FloatingText text="Get Your Funny" />
                <FloatingText text="Student Review!" delay={0.3} />
              </motion.div>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: headerInView ? 0 : 20, opacity: headerInView ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-gray-300"
              >
                Fill in your details and we'll generate a hilarious review just for you!
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: headerInView ? 0 : 20, opacity: headerInView ? 1 : 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <GlowingButton
                  onClick={() => document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' })}
                  className="text-white"
                >
                  Get Started
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </GlowingButton>
              </motion.div>
            </div>
            
            <div className="hidden md:block">
              <GraduationCap />
            </div>
          </div>
        </div>

        {/* Animated Circles Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            id="review-form"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedCard>
              <ReviewForm onReviewGenerated={handleReviewGenerated} />
            </AnimatedCard>
          </motion.div>

          {/* Review Display Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {generatedReview && (
                <AnimatedCard>
                  <ReviewDisplay key="review" review={generatedReview} />
                </AnimatedCard>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-black/50 backdrop-blur-xl border-t border-gray-800/50 py-8 mt-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FloatingText text="Made with ❤️ for students everywhere" />
            <div className="mt-4 flex justify-center space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-purple-400 transition-colors"
                href="#"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-purple-400 transition-colors"
                href="#"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Confetti Effect */}
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          colors={['#9333EA', '#EC4899', '#818CF8', '#38BDF8']}
        />
      )}
    </div>
  );
}

export default App;
