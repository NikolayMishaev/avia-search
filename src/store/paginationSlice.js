import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    flightsPerPage: 2,
  },
  reducers: {
    addFlightsPerPage(state, action) {
      state.flightsPerPage = state.flightsPerPage + action.payload;
    },
    resetFlightsPerPage(state) {
      state.flightsPerPage = 2;
    },
  },
});

export const { addFlightsPerPage, resetFlightsPerPage } =
  paginationSlice.actions;

export default paginationSlice.reducer;
