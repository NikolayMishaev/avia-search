import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    flightsPerPage: 2,
  },
  reducers: {
    addFlightsPerPage(state) {
      state.flightsPerPage = state.flightsPerPage + 2;
    },
    resetFlightsPerPage(state) {
      state.flightsPerPage = 2;
    },
  },
});

export const { addFlightsPerPage, resetFlightsPerPage } =
  paginationSlice.actions;

export default paginationSlice.reducer;
