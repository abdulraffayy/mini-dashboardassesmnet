import { createSlice } from '@reduxjs/toolkit';
import storage from '../../services/storage';
import { addNotification } from '../notifications/notificationSlice';

const DEFAULT_TASKS = [
  { id: '1', text: 'Finish report', completed: true },
  { id: '2', text: 'Email client', completed: false },
  { id: '3', text: 'Update website', completed: false },
];

const storedTasks = storage.getTasks();
const initialState = {
  tasks: storedTasks && storedTasks.length > 0 ? storedTasks : DEFAULT_TASKS
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString()
      };
      state.tasks.push(newTask);
      storage.setTasks(state.tasks);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        storage.setTasks(state.tasks);
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      storage.setTasks(state.tasks);
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, removed);
      storage.setTasks(state.tasks);
    },
    loadTasks: (state) => {
      state.tasks = storage.getTasks();
    }
  }
});

// Action creators
export const { addTask, toggleTask, removeTask, reorderTasks, loadTasks } = tasksSlice.actions;

// Thunks
export const addTaskWithNotification = (text) => (dispatch) => {
  dispatch(addTask(text));
  dispatch(addNotification(`New task added: ${text}`));
};

export const toggleTaskWithNotification = (id, text) => (dispatch) => {
  dispatch(toggleTask(id));
  dispatch(addNotification(`Task completed: ${text}`));
};

export const removeTaskWithNotification = (id, text) => (dispatch) => {
  dispatch(removeTask(id));
  dispatch(addNotification(`Task removed: ${text}`));
};

// Selectors
export const selectAllTasks = state => state.tasks.tasks;
export const selectCompletedTasks = state => state.tasks.tasks.filter(task => task.completed);
export const selectIncompleteTasks = state => state.tasks.tasks.filter(task => !task.completed);

export default tasksSlice.reducer;
