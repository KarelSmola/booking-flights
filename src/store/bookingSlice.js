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
      ticketsAmount: 0,
      price: 0,
      amountAvailableSeats: 0,
      anotherPassengers: [],
    },
  },
  reducers: {
    buyTicket(state, action) {
      state.bookingForm = true;
      state.bookingData = {
        ...action.payload,
        ticketsAmount: state.bookingData.ticketsAmount + 1,
        anotherPassengers: [],
      };
      console.log(action.payload);
    },
    newPassenger(state, action) {
      state.bookingData.ticketsAmount = state.bookingData.ticketsAmount + 1;
      state.bookingData.amountAvailableSeats =
        state.bookingData.amountAvailableSeats - 1;
      state.bookingData.anotherPassengers = [
        ...state.bookingData.anotherPassengers,
        { ...action.payload },
      ];
    },
    onChange(state, action) {
      console.log(action.payload);
    },
    removePassenger(state, action) {
      state.bookingData.ticketsAmount = state.bookingData.ticketsAmount - 1;
      state.bookingData.amountAvailableSeats =
        state.bookingData.amountAvailableSeats + 1;
      state.bookingData.anotherPassengers =
        state.bookingData.anotherPassengers.filter((passenger) => {
          return passenger.id !== action.payload;
        });
    },
  },
});

export const bookingSliceActions = bookingSlice.actions;
export default bookingSlice;
