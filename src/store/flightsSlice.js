import { createSlice } from "@reduxjs/toolkit";

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    flights: [],
    airlines: [],
  },
  reducers: {
    addFlight(state, action) {
      state.flights = action.payload;
    },
    addAirline(state, action) {
      if (!state.airlines.includes(action.payload)) {
        state.airlines.push(action.payload);
      }
    },
    resetAirline(state) {
      state.airlines = [];
    },
  },
});

export const { addFlight, addAirline, resetAirline } = flightsSlice.actions;

export default flightsSlice.reducer;
