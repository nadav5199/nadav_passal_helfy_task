# Task Manager

A full-stack task management application built with React (frontend) and Express.js (backend).

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

## Project Structure

```
task-manager/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
└── backend/           # Express.js backend
    ├── routes/
    ├── middleware/
    ├── server.js
    └── package.json
```

## Setup and Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd task-manager/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd task-manager/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the Backend Server

```bash
cd task-manager/backend
npm run dev
```

The backend server will start on **http://localhost:4000**

### Start the Frontend Development Server

In a separate terminal:

```bash
cd task-manager/frontend
npm run dev
```

The frontend will start on **http://localhost:5173**

## API Documentation

The backend provides a RESTful API for task management. All endpoints are prefixed with `/api/tasks`.

### Base URL

```
http://localhost:4000/api/tasks
```

### Task Object Schema

| Field       | Type      | Description                                      |
|-------------|-----------|--------------------------------------------------|
| id          | number    | Unique task identifier (auto-generated)          |
| title       | string    | Task title (required)                            |
| description | string    | Task description (optional)                      |
| priority    | string    | Priority level: `low`, `medium`, or `high`       |
| completed   | boolean   | Task completion status                           |
| createdAt   | string    | ISO timestamp of creation                        |

### Endpoints

#### GET /api/tasks

Retrieve all tasks.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Example task",
    "description": "Task description",
    "priority": "medium",
    "completed": false,
    "createdAt": "2026-02-20T10:30:00.000Z"
  }
]
```

---

#### POST /api/tasks

Create a new task.

**Request Body:**
```json
{
  "title": "New task",
  "description": "Optional description",
  "priority": "high"
}
```

| Field       | Required | Type   | Notes                                |
|-------------|----------|--------|--------------------------------------|
| title       | Yes      | string | Cannot be empty                      |
| description | No       | string |                                      |
| priority    | No       | string | Must be `low`, `medium`, or `high`   |

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "New task",
  "description": "Optional description",
  "priority": "high",
  "completed": false,
  "createdAt": "2026-02-20T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Missing or invalid title, invalid description type, or invalid priority value

---

#### PUT /api/tasks/:id

Update an existing task.

**URL Parameters:**
- `id` - Task ID

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "low"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Updated description",
  "priority": "low",
  "completed": false,
  "createdAt": "2026-02-20T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Validation error
- `404 Not Found` - Task not found

---

#### DELETE /api/tasks/:id

Delete a task.

**URL Parameters:**
- `id` - Task ID

**Response:** `200 OK`

**Error Responses:**
- `404 Not Found` - Task not found

---

#### PATCH /api/tasks/:id/toggle

Toggle the completion status of a task.

**URL Parameters:**
- `id` - Task ID

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Example task",
  "description": "Task description",
  "priority": "medium",
  "completed": true,
  "createdAt": "2026-02-20T10:30:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` - Task not found

## Technologies Used

### Frontend
- React 19
- Vite 7
- Axios (HTTP client)

### Backend
- Express.js 5
- CORS middleware
- In-memory data storage

## Available Scripts

### Frontend

| Command          | Description                    |
|------------------|--------------------------------|
| `npm run dev`    | Start development server       |
| `npm run build`  | Build for production           |
| `npm run preview`| Preview production build       |
| `npm run lint`   | Run ESLint                     |

### Backend

| Command          | Description                    |
|------------------|--------------------------------|
| `npm run dev`    | Start the server               |


### Time spent
- backend - 90 minutes
- frontend - 130 minutes
- ui - 20 minutes