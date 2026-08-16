import { Task } from '@/types/task';


let tasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage',
    description: 'Create wireframes and mockups for the new homepage design',
    status: 'In Progress',
    dueDate: '2026-08-20',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Set up Database',
    description: 'Configure PostgreSQL database and create initial schema',
    status: 'Todo',
    dueDate: '2026-08-25',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Write Documentation',
    description: 'Document API endpoints and user guide',
    status: 'Completed',
    dueDate: '2026-08-10',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getTasks = () => tasks;
export const setTasks = (newTasks: Task[]) => { tasks = newTasks; };
export const addTask = (task: Task) => { tasks.unshift(task); };
export const deleteTask = (id: string) => { 
  tasks = tasks.filter(t => t.id !== id); 
};
export const updateTask = (id: string, updatedTask: Task) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = updatedTask;
  }
};
export const findTask = (id: string) => tasks.find(t => t.id === id);
