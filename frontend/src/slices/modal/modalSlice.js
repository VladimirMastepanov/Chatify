/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isAddModalVisible: false,
    isRenameModalVisible: false,
    isRemoveModalVisible: false,
  },
  reducers: {
    showAddModalWindow: (state) => {
      state.isAddModalVisible = true;
    },
    hideAddModalWindow: (state) => {
      state.isAddModalVisible = false;
    },
    showRenameModalWindow: (state) => {
      state.isRenameModalVisible = true;
    },
    hideRenameModalWindow: (state) => {
      state.isRenameModalVisible = false;
    },
    showRemoveModalWindow: (state) => {
      state.isRemoveModalVisible = true;
    },
    hideRemoveModalWindow: (state) => {
      state.isRemoveModalVisible = false;
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
export const visibilityAddModalWindow = (state) => state.modal.isAddModalVisible;
export const visibilityRemoveModalWindow = (state) => state.modal.isRemoveModalVisible;
export const visibilityRenameModalWindow = (state) => state.modal.isRenameModalVisible;
export default modalSlice.reducer;
