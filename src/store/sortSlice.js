import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sortingCriteria: "price increase",
  },
  reducers: {
    toggleSortingCriteria(state, action) {
      state.sortingCriteria = action.payload;
    },
  },
});

export const { toggleSortingCriteria } = sortSlice.actions;

export default sortSlice.reducer;
