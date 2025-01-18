import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import config from '../config';

const studyStreams = [
  'Computer Science',
  'Engineering',
  'Medicine',
  'Arts',
  'Business',
  'Other'
];

const emojiMap = {
  'Computer Science': '💻',
  'Engineering': '⚙️',
  'Medicine': '⚕️',
  'Arts': '🎨',
  'Business': '💼',
  'Other': '🤔'
};

function ReviewForm({ setGeneratedReview }) {
  const [formData, setFormData] = useState({
    name: '',
    studyStream: '',
    hobbies: '',
    funFacts: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.studyStream) {
      setError('Please select your study stream');
      return false;
    }
    if (!formData.hobbies.trim()) {
      setError('Please enter at least one hobby');
      return false;
    }
    if (!formData.funFacts.trim()) {
      setError('Please share some fun facts about yourself');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      });
      setLoading(false);
      return;
    }

    try {
      const hobbiesArray = formData.hobbies.split(',').map(hobby => hobby.trim());
      
      const response = await axios.post(`${config.apiUrl}/api/generate-review`, {
        ...formData,
        hobbies: hobbiesArray
      });

      if (response.data.success) {
        setGeneratedReview(response.data.review);
      } else {
        setError(response.data.error || 'Failed to generate review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.response?.data?.error || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setError(''); // Clear error when user starts typing
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Generate Your Funny Review
        </h2>
        <p className="text-gray-600 mt-2">Fill in your details below ✨</p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md"
        >
          <p className="text-red-700">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
            placeholder="Enter your name"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Study Stream
          </label>
          <div className="relative">
            <select
              name="studyStream"
              value={formData.studyStream}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 appearance-none"
            >
              <option value="">Select your stream</option>
              {studyStreams.map(stream => (
                <option key={stream} value={stream}>
                  {emojiMap[stream]} {stream}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hobbies (comma-separated)
          </label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
            placeholder="e.g., gaming, reading, sports"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fun Facts About You
          </label>
          <textarea
            name="funFacts"
            value={formData.funFacts}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
            placeholder="Tell us something interesting about yourself!"
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-lg text-white font-medium transition-all duration-300
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </div>
          ) : (
            'Generate Funny Review ✨'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default ReviewForm;
