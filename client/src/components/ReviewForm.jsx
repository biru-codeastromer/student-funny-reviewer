import { useState } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8">
        <div className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter your name"
            />
          </div>

          {/* Study Stream Dropdown */}
          <div>
            <label htmlFor="studyStream" className="block text-sm font-medium text-gray-700">
              Study Stream
            </label>
            <select
              name="studyStream"
              id="studyStream"
              value={formData.studyStream}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              <option value="">Select your stream</option>
              {studyStreams.map(stream => (
                <option key={stream} value={stream}>{stream}</option>
              ))}
            </select>
          </div>

          {/* Hobbies Input */}
          <div>
            <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">
              Hobbies (comma-separated)
            </label>
            <input
              type="text"
              name="hobbies"
              id="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              placeholder="e.g., gaming, reading, music"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          {/* Fun Facts Textarea */}
          <div>
            <label htmlFor="funFacts" className="block text-sm font-medium text-gray-700">
              Fun Facts About You
            </label>
            <textarea
              name="funFacts"
              id="funFacts"
              rows={4}
              value={formData.funFacts}
              onChange={handleChange}
              placeholder="Share some interesting facts about yourself!"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Funny Review'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default ReviewForm;
