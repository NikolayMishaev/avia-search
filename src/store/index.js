import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import flightsSlice from "./flightsSlice";
import sortSlice from "./sortSlice";

export default configureStore({
  reducer: {
    flights: flightsSlice,
    sort: sortSlice,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});
