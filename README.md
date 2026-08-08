# Job Posting App - Backend

This is the backend service for the Job Posting App. It is a RESTful API built using [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/)).

## Prerequisites

- Node.js installed on your local machine
- A MongoDB database (local instance or a cloud database like MongoDB Atlas)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root of the backend directory (`Job_Posting-BE`) and configure your necessary environment variables, such as your MongoDB connection string.

3. **Run the server:**
   ```bash
   node index.js
   ```
   The server will start and listen on port `3001` by default.

## API Endpoints

The server provides the following endpoints for managing job postings:

### Jobs
- **POST** `/api/add-job`
  - Creates a new job post.
- **POST** `/api/add-seedbulkdata`
  - Allows inserting multiple job posts at once (seeding data).
- **GET** `/api/all-job`
  - Retrieves all available job posts.
- **GET** `/api/get-job/:id`
  - Retrieves a specific job post by its unique ID.
- **PUT** `/api/update-job/:jobId`
  - Updates the details of an existing job post.
- **DELETE** `/api/delete-job/:id`
  - Deletes a job post by its ID.

## Technologies Used
- **Express.js**: Web framework for handling routing and HTTP requests.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables from a `.env` file.
