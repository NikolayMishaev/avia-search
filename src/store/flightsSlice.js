import { createSlice } from "@reduxjs/toolkit";

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    flights: [],
    airlines: [],
    loading: false,
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
    setLoadingStatus(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { addFlight, addAirline, resetAirline, setLoadingStatus } =
  flightsSlice.actions;

export default flightsSlice.reducer;
