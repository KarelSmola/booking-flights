import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking-slice",
  initialState: {
    bookingForm: true,
    bookingData: {
      from: "",
      to: "",
      departure: "",
      arrival: "",
      ticketsAmount: 1,
      price: 0,
      amountAvailableSeats: 0,
      anotherPassangers: [],
    },
  },
  reducers: {
    buyTicket(state, action) {
      state.bookingForm = true;
      state.bookingData = { ...action.payload, anotherPassangers: [] };
      console.log(action.payload);
    },
    newPassenger(state, action) {
      state.bookingData.ticketsAmount = state.bookingData.ticketsAmount + 1;
      state.bookingData.anotherPassangers = [
        ...state.bookingData.anotherPassangers,
        { ...action.payload },
      ];
    },
  },
});

export const bookingSliceActions = bookingSlice.actions;
export default bookingSlice;
