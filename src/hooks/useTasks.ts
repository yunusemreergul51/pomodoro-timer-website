import { useState, useEffect } from 'react';
import { Task, TaskFilter } from '../types';
import { storage } from '../utils/storage';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => storage.getTasks());
  const [activeTaskId, setActiveTaskId] = useState<string | null>(() => storage.getActiveTaskId());
  const [filter, setFilter] = useState<TaskFilter>('all');

  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    storage.saveActiveTaskId(activeTaskId);
  }, [activeTaskId]);

  const addTask = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [...prev, newTask]);
    // If no task is currently active, make the newly added one active
    if (!activeTaskId) {
      setActiveTaskId(newTask.id);
    }
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => {
      const targetTask = prev.find((t) => t.id === id);
      const willBeCompleted = targetTask ? !targetTask.completed : false;

      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );

      // If the currently active task was just completed, advance to the next incomplete task
      if (id === activeTaskId && willBeCompleted) {
        const currentIndex = prev.findIndex((t) => t.id === id);
        // Look ahead first, then from the start
        const nextIncomplete =
          prev.slice(currentIndex + 1).find((t) => !t.completed) ||
          prev.slice(0, currentIndex).find((t) => !t.completed);

        setActiveTaskId(nextIncomplete ? nextIncomplete.id : null);
      }

      return updated;
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      if (activeTaskId === id) {
        const currentIndex = prev.findIndex((t) => t.id === id);
        const remaining = prev.filter((t) => t.id !== id);
        const nextIncomplete =
          remaining.slice(currentIndex).find((t) => !t.completed) ||
          remaining.find((t) => !t.completed);

        setActiveTaskId(nextIncomplete ? nextIncomplete.id : null);
        return remaining;
      }
      return prev.filter((t) => t.id !== id);
    });
  };

  const editTask = (id: string, newTitle: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => {
      const remaining = prev.filter((t) => !t.completed);
      if (activeTaskId && !remaining.some((t) => t.id === activeTaskId)) {
        setActiveTaskId(null);
      }
      return remaining;
    });
  };

  const selectActiveTask = (id: string) => {
    setActiveTaskId((prev) => (prev === id ? null : id));
  };

  const activeTask = tasks.find((t) => t.id === activeTaskId) || null;

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    allTasksCount: tasks.length,
    activeTask,
    activeTaskId,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
    selectActiveTask,
  };
}
