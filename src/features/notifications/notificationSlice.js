import { createSlice, createSelector } from '@reduxjs/toolkit';
import storage from '../../services/storage';

const initialState = {
  items: storage.getNotifications()
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const newNotification = {
        id: Date.now(),
        text: action.payload,
        read: false,
        timestamp: new Date().toISOString(),
      };
      state.items.push(newNotification);
      storage.setNotifications(state.items);
    },
    toggleReadStatus: (state, action) => {
      const notification = state.items.find(note => note.id === action.payload);
      if (notification) {
        notification.read = !notification.read;
        storage.setNotifications(state.items);
      }
    },
    clearAllNotifications: (state) => {
      state.items = [];
      storage.setNotifications([]);
    },
    loadNotifications: (state) => {
      state.items = storage.getNotifications();
    }
  },
});

// Memoized Selectors
const selectAllNotifications = state => state.notifications.items;

export const selectSortedNotifications = createSelector(
  [selectAllNotifications],
  (notifications) => {
    return [...notifications].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }
);

export const selectUnreadCount = createSelector(
  [selectAllNotifications],
  (notifications) => {
    return notifications.filter(note => !note.read).length;
  }
);

export const {
  addNotification,
  toggleReadStatus,
  clearAllNotifications,
  loadNotifications
} = notificationSlice.actions;

export default notificationSlice.reducer;
