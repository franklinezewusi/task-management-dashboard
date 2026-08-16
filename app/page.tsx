'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskStats } from '@/components/TaskStats';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskList } from '@/components/TaskList';
import { TaskForm } from '@/components/TaskForm';
import { Task } from '@/types/task';

export default function Home() {
  const {
    tasks,
    allTasks,
    loading,
    error,
    filter,
    setFilter,
    addTask,
    editTask,
    deleteTask,
    updateTaskStatus,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingTask) {
        await editTask(editingTask.id, data);
      } else {
        await addTask(data);
      }
      handleFormClose();
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 dark:text-gray-400">Loading tasks...</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Task Dashboard
        </h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
            transition-colors font-medium text-sm md:text-base"
        >
          + New Task
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <TaskStats tasks={allTasks} />
      <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={deleteTask}
        onStatusChange={updateTaskStatus}
      />

      {/* ULTRA COMPACT MODAL */}
      {(isFormOpen || editingTask) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2">
          <div className="bg-white dark:bg-gray-900 rounded-lg w-80 max-w-full">
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                  {editingTask ? 'Edit Task' : 'New Task'}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="text-gray-500 hover:text-gray-700 text-lg leading-none"
                >
                  ✕
                </button>
              </div>
              <TaskForm
                onSubmit={handleFormSubmit}
                onCancel={handleFormClose}
                initialData={editingTask}
                isEditing={!!editingTask}
              />
            </div>
            
          </div>
        </div>
      )}
    </main>
  );
}
