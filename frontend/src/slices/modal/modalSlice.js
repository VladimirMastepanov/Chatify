/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    visibilityAddModalWindow: false,
    visibilityRenameModalWindow: false,
    visibilityRemoveModalWindow: false,
  },
  reducers: {
    showAddModalWindow: (state) => {
      state.visibilityAddModalWindow = true;
    },
    hideAddModalWindow: (state) => {
      state.visibilityAddModalWindow = false;
    },
    showRenameModalWindow: (state) => {
      state.visibilityRenameModalWindow = true;
    },
    hideRenameModalWindow: (state) => {
      state.visibilityRenameModalWindow = false;
    },
    showRemoveModalWindow: (state) => {
      state.visibilityRemoveModalWindow = true;
    },
    hideRemoveModalWindow: (state) => {
      state.visibilityRemoveModalWindow = false;
    },
  },
});

export const {
  showAddModalWindow,
  hideAddModalWindow,
  showRemoveModalWindow,
  hideRemoveModalWindow,
  showRenameModalWindow,
  hideRenameModalWindow,
} = modalSlice.actions;
export const visibilityAddModalWindow = (state) => state.visibilityAddModalWindow;
export const visibilityRemoveModalWindow = (state) => state.visibilityRemoveModalWindow;
export const visibilityRenameModalWindow = (state) => state.visibilityRenameModalWindow;
export default modalSlice.reducer;
