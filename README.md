# Task Management Dashboard

A simple, responsive task management dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ Create, Read, Update, Delete tasks
- ✅ Task status management (Todo, In Progress, Completed)
- ✅ Filter tasks by status
- ✅ Responsive design (mobile & desktop)
- ✅ Persistent data storage using localStorage
- ✅ Form validation
- ✅ Task statistics
- ✅ Overdue task indicators

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management
- **localStorage** - Data persistence

  ## Challenges Encountered
 - **State Management Across Components
     Challenge: Managing task state across multiple components while keeping them in sync.
     Solution: Created a custom useTasks hook that centralizes all task operations and state management.
  - **Responsive Modal Design
      Challenge: Making the task creation/edit modal work well on all screen sizes, especially mobile.
      Solution: Used Tailwind's responsive classes and implemented a bottom-sheet design for mobile devices.


  ## What I Would Improve (With More Time)
  - **Advanced Filtering
  - **Additional Features (Calendar view, Due date reminders)
      
   

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/franklinezewusi/task-management-dashboard.git
cd task-management-dashboard
