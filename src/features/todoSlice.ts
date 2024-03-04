import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Filter, Task } from '../types';

const loadTasks = (): Task[] => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    return JSON.parse(savedTasks) as Task[];
  }
  return [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

interface ITodoState {
  tasks: Task[];
  filter: Filter;
}

const initialState: ITodoState = {
  tasks: loadTasks(),
  filter: 'all',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    editTask: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
        saveTasks(state.tasks);
      }
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    moveTask: (state, action: PayloadAction<{ id: string; newIndex: number }>) => {
      const { id, newIndex } = action.payload;
      const currentIndex = state.tasks.findIndex((task) => task.id === id);
      if (currentIndex !== -1) {
        const [task] = state.tasks.splice(currentIndex, 1);
        state.tasks.splice(newIndex, 0, task);
        saveTasks(state.tasks);
      }
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask, setFilter, moveTask } = todoSlice.actions;
export default todoSlice.reducer;
