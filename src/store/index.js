import { configureStore, createSlice } from "@reduxjs/toolkit";

const bookingFlights = createSlice({
  name: "booking-flights",
  initialState: {
    from: "",
    to: "",
    departure: "",
    arrival: "",
    seats: 0,
    price: 0,
  },
  reducers: {
    order(state, action) {
      const { from, to, departure, arrival } = action.payload;
      state.from = from;
      state.to = to;
      state.departure = departure;
      state.arrival = arrival;
    },
  },
});

const store = configureStore({ reducer: bookingFlights.reducer });

export const bookingFlightsActions = bookingFlights.actions;
export default store;
