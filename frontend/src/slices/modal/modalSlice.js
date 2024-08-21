/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    visible: false,
  },
  reducers: {
    showModalWindow: (state, action) => {
      state.type = action.payload;
      state.visible = true;
    },
    hideModalWindow: (state) => {
      state.type = null;
      state.visible = false;
    },
  },
});

export const {
  showModalWindow,
  hideModalWindow,
} = modalSlice.actions;
export const typeModalWindowSelector = (state) => state.modal.type;
export const visibilityModalWindowSelector = (state) => state.modal.visible;
export default modalSlice.reducer;
