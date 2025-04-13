# Forum App

This is a full-stack forum application built using modern web technologies. The app allows users to create posts, comment on posts, upvote posts, and manage user authentication.

## Features

- User authentication (signup, login, and logout)
- Create, edit, and delete posts
- Create, edit, and delete comments on posts
- Upvote posts
- View user activity history
- Pagination added 5 posts per page
- Interactive user interface

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for building RESTful APIs.
- **Drizzle ORM**: Type-safe ORM for database interactions.
- **PostgreSQL**: Relational database for storing application data.
- **TypeScript**: Strongly typed programming language for better code quality.
- **dotenv**: For managing environment variables.
- **bcrypt**: For hashing passwords securely.
- **Nodemon**: For automatic server restarts during development.
- **Concurrently**: For running multiple commands simultaneously during development.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit**: For state management.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests.
- **Vite**: Build tool for fast development and production builds.
- **TypeScript**: For type safety in the frontend code.

### Database

- **PostgreSQL**: Used as the database for storing users, posts, comments, and upvotes.

## Project Structure

### Backend

- `src/`: Contains the server-side code.
  - `controllers/`: Handles the business logic for routes.
  - `routes/`: Defines API endpoints.
  - `db/`: Contains database schema and connection logic.
- `drizzle/`: Contains database migration files.
- `drizzle.config.ts`: Configuration for Drizzle ORM.

### Frontend

- `src/`: Contains the client-side code.
  - `components/`: Reusable UI components.
  - `features/`: Redux slices for state management.
  - `utils/`: Utility functions.
  - `App.tsx`: Main application component.
  - `index.tsx`: Entry point for the React app.

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL database set up

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the `.env` file with your database credentials in the root as `DATABASE_URL`

4. Run database migrations:

   ```bash
   npm run migrate
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Accessing the App

- The backend server runs on `http://localhost:3000`.
- The frontend app runs on `http://localhost:5173`.
