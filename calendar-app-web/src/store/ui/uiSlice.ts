import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModelOpen: false,
  },
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModelOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModelOpen = false;
    },
  }
});

export const { onCloseDateModal, onOpenDateModal } = uiSlice.actions;