import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking-slice",
  initialState: {
    bookingData: {
      from: "",
      to: "",
      departure: "",
      arrival: "",
      seats: 0,
      price: 0,
    },
  },
  reducers: {
    buyTicket(state, action) {
      console.log(action.payload);
      const { from, to, departure, arrival } = action.payload;
      state.bookingData.from = from;
      state.bookingData.to = to;
      state.bookingData.departure = departure;
      state.bookingData.arrival = arrival;
    },
  },
});

export const bookingSliceActions = bookingSlice.actions;
export default bookingSlice;
