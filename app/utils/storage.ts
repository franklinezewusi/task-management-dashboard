import { Task } from '../types/task';

const STORAGE_KEY = 'tasks';

export const getTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
