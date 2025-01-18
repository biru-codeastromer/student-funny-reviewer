import { useState } from 'react';
import { motion } from 'framer-motion';
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

function ReviewForm({ setGeneratedReview }) {
  const [formData, setFormData] = useState({
    name: '',
    studyStream: '',
    hobbies: '',
    funFacts: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
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
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

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

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={formVariants}
      className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-300"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        Generate Your Funny Review
      </h2>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
            placeholder="Enter your name"
          />
        </motion.div>

        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Study Stream</label>
          <select
            name="studyStream"
            value={formData.studyStream}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
          >
            <option value="">Select your stream</option>
            {studyStreams.map(stream => (
              <option key={stream} value={stream}>{stream}</option>
            ))}
          </select>
        </motion.div>

        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hobbies (comma-separated)
          </label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            required
            placeholder="e.g., gaming, reading, sports"
            className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
          />
        </motion.div>

        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fun Facts About You</label>
          <textarea
            name="funFacts"
            value={formData.funFacts}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Tell us something interesting about yourself!"
            className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
          />
        </motion.div>

        <motion.button
          variants={inputVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-md text-white font-medium 
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            } 
            transform transition-all duration-300 shadow-md hover:shadow-lg`}
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
            'Generate Funny Review'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default ReviewForm;
