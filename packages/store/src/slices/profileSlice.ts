import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileData {
  uuid: string;
  username: string;
  email: string;
  fullName: string;
  familyName: string;
  givenName: string;
  phoneNumber: string;
  profileImage: string;
  gender: string;
  authorities: string[];
}

export interface ProfileState {
  data: ProfileData | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

const initialState: ProfileState = {
  data: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  lastFetch: null,
};

// Async thunk to fetch profile from API
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (endpoint: string = '/auth/me', { rejectWithValue }) => {
    try {
      const response = await fetch(endpoint, { credentials: 'include' });
      
      if (!response.ok) {
        if (response.status === 401) {
          return rejectWithValue('Not authenticated');
        }
        throw new Error('Failed to fetch profile');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

// Async thunk to fetch full profile details
export const fetchFullProfile = createAsyncThunk(
  'profile/fetchFullProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/auth/profile', { credentials: 'include' });
      
      if (!response.ok) {
        if (response.status === 401) {
          return rejectWithValue('Not authenticated');
        }
        throw new Error('Failed to fetch profile');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.isAuthenticated = false;
      state.error = null;
      state.lastFetch = null;
    },
    setProfile: (state, action: PayloadAction<ProfileData>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.lastFetch = Date.now();
    },
  },
  extraReducers: (builder) => {
    // Handle fetchProfile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthenticated = true;
        state.lastFetch = Date.now();
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.data = null;
      });

    // Handle fetchFullProfile
    builder
      .addCase(fetchFullProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFullProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthenticated = true;
        state.lastFetch = Date.now();
      })
      .addCase(fetchFullProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.data = null;
      });
  },
});

export const { clearProfile, setProfile } = profileSlice.actions;
export default profileSlice.reducer;
