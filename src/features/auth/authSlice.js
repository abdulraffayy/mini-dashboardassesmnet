import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from '../../services/storage';
import { updateProfile } from '../profile/profileSlice';
import { getUsers, setUsers } from '../../services/storage';

const initialState = {
  user: storage.getAuth(),
  error: null,
  loading: false
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      // Check users array in localStorage
      const users = getUsers();
      const foundUser = users.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      // Store auth data
      storage.setAuth(foundUser);
      // Update profile with user data
      dispatch(updateProfile(foundUser));
      return foundUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      // Check if user already exists
      const users = getUsers();
      if (users.some(u => u.email === userData.email)) {
        throw new Error('Email already exists');
      }
      const user = {
        id: Date.now().toString(),
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: null,
        picture: null
      };
      const updatedUsers = [...users, user];
      setUsers(updatedUsers);
      // Store auth data
      storage.setAuth(user);
      // Update profile with user data
      dispatch(updateProfile(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    storage.removeAuth();
    storage.removeProfile();
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
      });
  }
});

export const selectUser = state => state.auth.user;
export const selectAuthError = state => state.auth.error;
export const selectAuthLoading = state => state.auth.loading;

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
