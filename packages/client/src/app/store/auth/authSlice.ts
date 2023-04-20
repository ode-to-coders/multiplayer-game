import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/auth/authApi';

export type AuthState = {
  user: {
    isAuth: boolean;
  };
};

const initialState = {
  user: {
    isAuth: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(
      state,
      action: {
        type: string;
        payload: boolean;
      }
    ) {
      state.user.isAuth = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, state => {
      state.user.isAuth = true;
    });
  },
});

export const { setIsAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
