# Task Manager

[Live Demo](https://task-management-app-two-ashy.vercel.app/)

## Description

The project is a Task Manager application built using React, Redux for state management, and Tailwind CSS for styling. It allows users to manage tasks by adding, editing, deleting, and marking tasks as complete or pending.

## Features

- Add new tasks with title, description, due date, and status (pending/completed).
- Edit existing tasks including title, description, and due date.
- Delete tasks.
- Tasks can be sorted by due date (ascending/descending) and filtered by status (completed/pending).
- Mark tasks as complete or pending.
- Responsive design using Tailwind CSS.

## Installation

1. Clone the repository: `git clone https://github.com/gShubham7/Task-Management-App.git`
2. Navigate to the project directory: `cd Task-Management-App/`
3. Install dependencies: `npm install`
4. Run the project: `npm run dev`

## Test

1. Run jest test: `npm test`

## Usage

1. Start the development server: `npm start`
2. Open your browser and go to `http://localhost:5173/` to view the application.

## Technologies Used

- React
- Redux
- Tailwind CSS
- Jest Unit Testing

## Project Structure

```
project-name/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── EditTaskModal.jsx
│   │   ├── EditTaskModal.test.jsx
│   │   ├── Navbar.jsx
│   │   ├── Navbar.test.jsx
│   │   ├── Taskform.jsx
│   │   ├── Taskform.test.jsx
│   │   ├── Tasklist.jsx
│   │   ├── Tasklist.test.jsx
│   ├── redux/
|   |   ├── actions.js
│   │   ├── reducers.js
│   │   ├── store.js
│   │   └── types.js
│   └── App.jsx
│
├── .gitignore
├── package.json
├── README.md
└── ...

```
