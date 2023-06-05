import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, IUser, authInitialState } from './authState';

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    onLogin: (state, { payload }: { payload: IUser }) => {
      state.status = AuthStatus.AUTHENTICATED;
      state.user = payload;
    },
    onLogout: (state) => {
      state.status = AuthStatus.NOT_AUTHENTICATED;
      state.user = undefined;
    },
    onChecking: (state) => {
      state.status = AuthStatus.CHECKING;
      state.user = undefined;
      state.error = undefined;
    },
    onError: (state, { payload }: { payload: string }) => {
      state.status = AuthStatus.NOT_AUTHENTICATED;
      state.user = undefined;
      state.error = payload;
    },
  },
});

export const { onLogin, onLogout, onChecking, onError } = authSlice.actions;