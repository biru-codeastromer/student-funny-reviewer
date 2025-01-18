const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());

// MongoDB Memory Server setup
async function startServer() {
    try {
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('Connected to in-memory MongoDB');
        
        // Review Schema
        const reviewSchema = new mongoose.Schema({
            name: String,
            studyStream: String,
            hobbies: [String],
            funFacts: String,
            generatedReview: String,
            createdAt: { type: Date, default: Date.now }
        });

        const Review = mongoose.model('Review', reviewSchema);

        // Generate funny review based on inputs
        function generateFunnyReview(name, studyStream, hobbies, funFacts) {
            let review = `Dear ${name}, `;
            
            // Study stream based jokes
            const streamJokes = {
                'Computer Science': "You're probably debugging your life more than your code! ",
                'Engineering': "Engineering your way through life, one problem at a time! ",
                'Medicine': "Prescribing laughter as the best medicine since day one! ",
                'Arts': "Making the world more colorful, one masterpiece at a time! ",
                'Business': "Trading sleep for success like it's a bull market! "
            };

            review += streamJokes[studyStream] || "Breaking stereotypes and making history! ";

            // Hobby based jokes
            if (hobbies.some(hobby => hobby.toLowerCase().includes('gaming'))) {
                review += " Your gaming skills are probably better than your exam scores! ";
            }
            if (hobbies.some(hobby => hobby.toLowerCase().includes('cricket'))) {
                review += " Hitting sixes in cricket but getting bowled by assignments! ";
            }
            if (hobbies.some(hobby => hobby.toLowerCase().includes('github'))) {
                review += " Your commit history is longer than your study history! ";
            }

            // Random funny conclusions
            const conclusions = [
                "Keep being awesome, just maybe with less caffeine! ",
                "You're living proof that sleep is optional in college! ",
                "Your future is so bright, you need sunglasses to read your textbooks! ",
                "Legend says your procrastination skills are unmatched! "
            ];

            review += " " + conclusions[Math.floor(Math.random() * conclusions.length)];

            return review;
        }

        // API Routes
        app.post('/api/generate-review', async (req, res) => {
            try {
                const { name, studyStream, hobbies, funFacts } = req.body;
                
                if (!name || !studyStream || !hobbies || !funFacts) {
                    return res.status(400).json({ 
                        success: false, 
                        error: 'All fields are required' 
                    });
                }

                const hobbiesArray = Array.isArray(hobbies) ? hobbies : hobbies.split(',').map(hobby => hobby.trim());
                const generatedReview = generateFunnyReview(name, studyStream, hobbiesArray, funFacts);
                
                const review = new Review({
                    name,
                    studyStream,
                    hobbies: hobbiesArray,
                    funFacts,
                    generatedReview
                });
                
                await review.save();
                res.json({ success: true, review });
            } catch (error) {
                console.error('Error generating review:', error);
                res.status(500).json({ 
                    success: false, 
                    error: 'Failed to generate review. Please try again.' 
                });
            }
        });

        app.get('/api/reviews', async (req, res) => {
            try {
                const reviews = await Review.find().sort({ createdAt: -1 });
                res.json({ success: true, reviews });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });

        app.delete('/api/reviews/:id', async (req, res) => {
            try {
                await Review.findByIdAndDelete(req.params.id);
                res.json({ success: true, message: 'Review deleted successfully' });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });

        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ 
                success: false, 
                error: 'Something went wrong! Please try again later.' 
            });
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
