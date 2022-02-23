import { createSlice } from "@reduxjs/toolkit";

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    flights: [],
  },
  reducers: {
    addFlight(state, action) {
      state.flights = action.payload;
    },
  },
});

export const { addFlight } = flightsSlice.actions;

export default flightsSlice.reducer;
