import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import notificationsReducer from '../features/notifications/notificationSlice';
import tasksReducer from '../features/tasks/tasksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    notifications: notificationsReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths that may contain non-serializable values
        ignoredActionPaths: [
          'meta.arg',
          'payload.timestamp',
          'payload.picture'
        ],
        ignoredPaths: [
          'auth.user.picture',
          'profile.profile.picture',
          'notifications.items.timestamp',
          'tasks.tasks.createdAt'
        ],
      },
    }),
});

// Setup store subscription to sync with storage
store.subscribe(() => {
  const state = store.getState();
  
  // We don't need to sync everything as our slices handle their own storage
  // This is just for debugging and backup purposes
  localStorage.setItem('qarar_store_backup', JSON.stringify({
    lastUpdate: new Date().toISOString(),
    auth: state.auth,
    profile: state.profile,
    notifications: state.notifications,
    tasks: state.tasks
  }));
});

export default store;
