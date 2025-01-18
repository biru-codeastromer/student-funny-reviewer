import { useState } from 'react';
import { motion } from 'framer-motion';
import ReviewForm from './components/ReviewForm';
import ReviewDisplay from './components/ReviewDisplay';

function App() {
  const [generatedReview, setGeneratedReview] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <motion.h1 
                className="text-2xl font-bold text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Student Fun Review
              </motion.h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!generatedReview ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get Your Funny Student Review! 🎓
              </h2>
              <p className="text-lg text-gray-600">
                Fill in your details and we'll generate a hilarious review just for you!
              </p>
            </motion.div>
            <ReviewForm setGeneratedReview={setGeneratedReview} />
          </>
        ) : (
          <ReviewDisplay 
            review={generatedReview} 
            onReset={() => setGeneratedReview(null)} 
          />
        )}
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            Made with ❤️ for students who need a laugh
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
