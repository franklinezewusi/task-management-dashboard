import { useState } from 'react';
import { Task, TaskFormData } from '@/types/task';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel?: () => void;
  initialData?: Task;
  isEditing?: boolean;
}

export const TaskForm = ({ onSubmit, onCancel, initialData, isEditing = false }: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'Todo',
    dueDate: initialData?.dueDate || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof TaskFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <div className="mb-1.5">
        <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-2 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Title"
        />
        {errors.title && <p className="text-[10px] text-red-600 mt-0.5">{errors.title}</p>}
      </div>

      {/* Description */}
      <div className="mb-1.5">
        <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-2 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Description"
        />
      </div>

      {/* Status + Due Date */}
      <div className="flex gap-1.5 mb-1.5">
        <div className="w-1/2">
          <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-2 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="w-1/2">
          <label className="block text-[10px] font-medium text-gray-700 dark:text-gray-300">
            Due Date *
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-2 py-0.5 text-xs border border-gray-300 dark:border-gray-600 rounded 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          {errors.dueDate && <p className="text-[10px] text-red-600 mt-0.5">{errors.dueDate}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-1.5 pt-1.5 mt-0.5 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          className="flex-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 
            transition-colors text-xs font-medium"
        >
          {isEditing ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
            rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-xs font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
