import { motion } from 'framer-motion';

export default function ReviewDisplay({ review, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-800"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 text-center"
      >
        Your Funny Review
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="prose prose-invert max-w-none"
      >
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <p className="text-xl text-gray-300 leading-relaxed whitespace-pre-wrap">
              {review.generatedReview}
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Study Stream</h4>
              <p className="text-base text-gray-300">{review.studyStream}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Hobbies</h4>
              <p className="text-base text-gray-300">
                {review.hobbies.join(', ')}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Fun Facts</h4>
              <p className="text-base text-gray-300">{review.funFacts}</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                navigator.clipboard.writeText(review.generatedReview);
                // You could add a toast notification here
              }}
            >
              Copy Review 
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ml-4"
              onClick={onReset}
            >
              Generate Another Review
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
