import { createSlice } from '@reduxjs/toolkit';
import storage from '../../services/storage';
import { logout } from '../auth/authSlice';

const initialState = {
  profile: storage.getProfile() || {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    picture: null
  }
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = {
        ...state.profile,
        ...action.payload
      };
      storage.setProfile(state.profile);
    },
    resetProfile: (state) => {
      state.profile = initialState.profile;
      storage.removeProfile();
    },
    loadProfile: (state) => {
      const savedProfile = storage.getProfile();
      if (savedProfile) {
        state.profile = savedProfile;
      }
    }
  },
  extraReducers: (builder) => {
    // Reset profile when user logs out
    builder.addCase(logout.fulfilled, (state) => {
      state.profile = initialState.profile;
    });
  }
});

// Selectors
export const selectProfile = state => state.profile.profile;

export const { updateProfile, resetProfile, loadProfile } = profileSlice.actions;
export default profileSlice.reducer;