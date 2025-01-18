import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReviewForm from './components/ReviewForm';
import ReviewDisplay from './components/ReviewDisplay';

function App() {
  const [generatedReview, setGeneratedReview] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleReviewGenerated = (review) => {
    setGeneratedReview(review);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center"
          >
            <motion.h1 
              className="text-2xl font-bold text-indigo-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Student Fun Review
            </motion.h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-sm font-medium text-gray-500"
            >
              Make Learning Fun! 🎓
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
        className="pt-24 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: headerInView ? 0 : 20, opacity: headerInView ? 1 : 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Get Your Funny Student Review! 🎓
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: headerInView ? 0 : 20, opacity: headerInView ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8"
          >
            Fill in your details and we'll generate a hilarious review just for you!
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ReviewForm onReviewGenerated={handleReviewGenerated} />
          </motion.div>

          {/* Review Display Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {generatedReview && (
                <ReviewDisplay key="review" review={generatedReview} />
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
        className="bg-white/80 backdrop-blur-md py-8 mt-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>Made with ❤️ for students everywhere</p>
          </div>
        </div>
      </motion.footer>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Add confetti animation here */}
        </div>
      )}
    </div>
  );
}

export default App;
