import { TaskStatus } from '../types/task';

interface TaskFiltersProps {
  currentFilter: TaskStatus | 'All';
  onFilterChange: (filter: TaskStatus | 'All') => void;
}

export const TaskFilters = ({ currentFilter, onFilterChange }: TaskFiltersProps) => {
  const filters: (TaskStatus | 'All')[] = ['All', 'Todo', 'In Progress', 'Completed'];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${
              currentFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
