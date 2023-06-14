import { configureStore } from "@reduxjs/toolkit";
import flightsSlice from "./flightsSlice";
import bookingSlice from "./bookingSlice";

const store = configureStore({
  reducer: { flights: flightsSlice.reducer, booking: bookingSlice.reducer },
});

export default store;
