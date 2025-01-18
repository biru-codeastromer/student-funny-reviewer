# Student Funny Review Generator

A fun web application that generates humorous reviews based on student information, including their study stream, hobbies, and fun facts.

## Features

- Interactive form for student information input
- Dynamic review generation with personalized humor
- Beautiful, responsive UI with animations
- MongoDB integration for storing reviews
- RESTful API endpoints

## Tech Stack

- Frontend: React.js with Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js
- Database: MongoDB
- Additional: Axios for API calls, HeadlessUI for components

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

### Backend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/student-reviews
   PORT=3000
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- POST `/api/generate-review`: Generate and save a new review
- GET `/api/reviews`: Fetch all stored reviews
- DELETE `/api/reviews/:id`: Delete a specific review

## Contributing

Feel free to submit issues and enhancement requests!
