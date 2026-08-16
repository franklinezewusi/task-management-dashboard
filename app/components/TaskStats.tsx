import { Task } from '../types/task';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const total = tasks.length;
  const todo = tasks.filter(t => t.status === 'Todo').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">Todo</p>
        <p className="text-2xl font-bold text-yellow-600">{todo}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
        <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
        <p className="text-2xl font-bold text-green-600">{completed}</p>
      </div>
    </div>
  );
};
