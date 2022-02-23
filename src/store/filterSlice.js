import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    oneTransfer: false,
    withoutTransfers: false,
    priceFrom: 0,
    priceUpTo: 0,
    airlines: [],
  },
  reducers: {
    toggleOneTransfer(state) {
      state.oneTransfer = !state.oneTransfer;
    },
    togglewithoutTransfers(state) {
      state.withoutTransfers = !state.withoutTransfers;
    },
    addPriceFrom(state, action) {
      state.priceFrom = action.payload;
    },
    addPriceUpTo(state, action) {
      state.priceUpTo = action.payload;
    },
    toggleAirlines(state, action) {
      state.airlines = state.airlines.includes(action.payload)
        ? state.airlines.filter((i) => i !== action.payload)
        : [...state.airlines, action.payload];
    },
  },
});

export const {
  toggleOneTransfer,
  togglewithoutTransfers,
  addPriceFrom,
  addPriceUpTo,
  toggleAirlines,
} = filterSlice.actions;

export default filterSlice.reducer;
