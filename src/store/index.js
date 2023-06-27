import { configureStore } from "@reduxjs/toolkit";
import flightsSlice from "./flightsSlice";
import bookingSlice from "./bookingSlice";
import ordersSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    flights: flightsSlice.reducer,
    booking: bookingSlice.reducer,
    orders: ordersSlice.reducer,
  },
});

export default store;
