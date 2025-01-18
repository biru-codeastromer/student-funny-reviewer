import { motion } from 'framer-motion';

function ReviewDisplay({ review, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white shadow-xl rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Your Funny Review! 🎉
        </h3>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-800 leading-relaxed">
            {review.generatedReview}
          </p>
        </div>

        <div className="space-y-4">
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
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onReset}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Generate Another Review
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ReviewDisplay;
