import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus, TaskFormData } from '@/types/task';

// Mock data
const MOCK_TASKS: Task[] = [
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

const STORAGE_KEY = 'tasks';

// Helper functions
const getTasksFromStorage = (): Task[] => {
  if (typeof window === 'undefined') return MOCK_TASKS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_TASKS));
    return MOCK_TASKS;
  }
  return JSON.parse(stored);
};

const saveTasksToStorage = (tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskStatus | 'All'>('All');

  // Load tasks from localStorage
  useEffect(() => {
    try {
      const storedTasks = getTasksFromStorage();
      setTasks(storedTasks);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (!loading) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, loading]);

  const addTask = useCallback((taskData: TaskFormData) => {
    try {
      const newTask: Task = {
        ...taskData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      setError('Failed to add task');
      throw err;
    }
  }, []);

  const editTask = useCallback((id: string, taskData: TaskFormData) => {
    try {
      setTasks(prev =>
        prev.map(task =>
          task.id === id
            ? {
                ...task,
                ...taskData,
                updatedAt: new Date().toISOString(),
              }
            : task
        )
      );
    } catch (err) {
      setError('Failed to edit task');
      throw err;
    }
  }, []);

  const deleteTask = useCallback((id: string) => {
    try {
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    }
  }, []);

  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    try {
      setTasks(prev =>
        prev.map(task =>
          task.id === id
            ? {
                ...task,
                status,
                updatedAt: new Date().toISOString(),
              }
            : task
        )
      );
    } catch (err) {
      setError('Failed to update status');
      throw err;
    }
  }, []);

  const filteredTasks = tasks.filter(task =>
    filter === 'All' ? true : task.status === filter
  );

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    error,
    filter,
    setFilter,
    addTask,
    editTask,
    deleteTask,
    updateTaskStatus,
  };
};
