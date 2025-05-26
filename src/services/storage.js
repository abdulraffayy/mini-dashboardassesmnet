/**
 * Storage Service
 * 
 * Provides a centralized interface for managing persistent data in localStorage.
 * Handles serialization/deserialization and provides type-specific methods
 * for different data types (auth, profile, tasks, notifications).
 * 
 * Features:
 * - Error handling for localStorage operations
 * - JSON parsing/stringifying
 * - Separate methods for different data types
 * - Default values when data doesn't exist
 */

const STORAGE_KEYS = {
  AUTH: 'qarar_auth',
  PROFILE: 'qarar_profile',
  TASKS: 'qarar_tasks',
  NOTIFICATIONS: 'qarar_notifications'
};

/**
 * Generic method to get data from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed data or default value
 */
const getData = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Generic method to set data in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
const setData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
  }
};

// Authentication
export const getAuth = () => getData(STORAGE_KEYS.AUTH);
export const setAuth = (user) => setData(STORAGE_KEYS.AUTH, user);
export const removeAuth = () => localStorage.removeItem(STORAGE_KEYS.AUTH);

// Profile
export const getProfile = () => getData(STORAGE_KEYS.PROFILE);
export const setProfile = (profile) => setData(STORAGE_KEYS.PROFILE, profile);
export const removeProfile = () => localStorage.removeItem(STORAGE_KEYS.PROFILE);

// Tasks
export const getTasks = () => getData(STORAGE_KEYS.TASKS, []);
export const setTasks = (tasks) => setData(STORAGE_KEYS.TASKS, tasks);
export const removeTasks = () => localStorage.removeItem(STORAGE_KEYS.TASKS);

// Notifications
export const getNotifications = () => getData(STORAGE_KEYS.NOTIFICATIONS, []);
export const setNotifications = (notifications) => setData(STORAGE_KEYS.NOTIFICATIONS, notifications);
export const removeNotifications = () => localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);

// Users (array for all registered users)
export const getUsers = () => getData('qarar_users', []);
export const setUsers = (users) => setData('qarar_users', users);
export const removeUsers = () => localStorage.removeItem('qarar_users');

export default {
  getAuth,
  setAuth,
  removeAuth,
  getProfile,
  setProfile,
  removeProfile,
  getTasks,
  setTasks,
  removeTasks,
  getNotifications,
  setNotifications,
  removeNotifications
};