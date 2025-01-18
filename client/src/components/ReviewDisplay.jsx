import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function ReviewDisplay({ review, onReset }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit="exit"
      className="max-w-2xl mx-auto"
    >
      <motion.div
        variants={textVariants}
        className="text-2xl font-bold mb-6 text-center"
      >
        Your Funny Review! 🎉
      </motion.div>

      <motion.div
        variants={textVariants}
        className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6"
      >
        <p className="text-lg text-gray-800 leading-relaxed">
          {review.generatedReview}
        </p>
      </motion.div>

      <motion.div
        variants={textVariants}
        className="space-y-4"
      >
        <div>
          <h4 className="text-sm font-medium text-gray-500">Study Stream</h4>
          <p className="text-base text-gray-900">{review.studyStream}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Hobbies</h4>
          <p className="text-base text-gray-900">
            {review.hobbies.join(', ')}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Fun Facts</h4>
          <p className="text-base text-gray-900">{review.funFacts}</p>
        </div>
      </motion.div>

      <motion.div
        variants={textVariants}
        className="mt-8 flex justify-center"
      >
        <button
          onClick={onReset}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Generate Another Review
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ReviewDisplay;
