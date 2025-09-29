# Gal Senior Care Foundation Quiz System

A full-stack web application built with Next.js frontend and Express.js backend for managing quizzes and educational content for senior care.

## Project Structure

```
GalSeniorCareFoundation/
├── frontend/          # Next.js React application
├── backend/           # Express.js API server
```

## Backend Setup

The backend is built with Express.js and TypeScript.

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the backend directory:

```bash
# Create .env file
touch .env  # On Windows: type nul > .env
```

Add the following environment variables to `.env`:

```env
PORT=3001
```

### 4. Running Backend

- **Development Mode**:
  ```bash
  nodemon
  ```

- **Production Build**:
  ```bash
  npm start
  ```

## Frontend Setup

The frontend is built with NextJS and TypeScript.

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Running Frontend

- **Development Mode**:
  ```bash
  npm run dev
  ```

- **Production Build**:
  ```bash
  npm run build
  npm run start
  ```

## Development Workflow

To run both frontend and backend simultaneously:

1. **Terminal 1 - Backend**:
   ```bash
   cd backend
   nodemon
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

### Development URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001