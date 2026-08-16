import { Task, TaskStatus } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const statusColors = {
  'Todo': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        {/* Task Info */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {task.description || 'No description'}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
              {task.status}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Due: {formatDate(task.dueDate)}
            </span>
            {isOverdue && (
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                ⚠️ Overdue
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 dark:border-gray-700 pt-3">
          {/* Status Dropdown */}
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          
          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 
              rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors font-medium"
          >
            ✏️ Edit
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => {
              if (confirm(`Delete "${task.title}"?`)) {
                onDelete(task.id);
              }
            }}
            className="px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 
              rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};
