import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import flightsSlice from "./flightsSlice";
import sortSlice from "./sortSlice";
import paginationSlice from "./paginationSlice";

export default configureStore({
  reducer: {
    flights: flightsSlice,
    sort: sortSlice,
    filter: filterSlice,
    pagination: paginationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});
