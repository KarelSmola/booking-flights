import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking-slice",
  initialState: {
    bookingForm: false,
    bookingData: {
      from: "",
      to: "",
      departure: "",
      arrival: "",
      ticketsAmount: 0,
      price: 0,
      amountAvailableSeats: 0,
      mainPassenger: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        seat: "",
      },
      anotherPassengers: [],
    },
  },
  reducers: {
    buyTicket(state, action) {
      state.bookingForm = true;
      state.bookingData = {
        ...state.bookingData,
        ...action.payload,
        ticketsAmount: state.bookingData.ticketsAmount + 1,
      };
    },
    newPassenger(state, action) {
      state.bookingData = {
        ...state.bookingData,
        ticketsAmount: state.bookingData.ticketsAmount + 1,
        amountAvailableSeats: state.bookingData.amountAvailableSeats - 1,
        anotherPassengers: [
          ...state.bookingData.anotherPassengers,
          { ...action.payload },
        ],
      };
    },
    mainPassengerData(state, action) {
      state.bookingData = {
        ...state.bookingData,
        mainPassenger: {
          ...state.bookingData.mainPassenger,
          ...action.payload,
        },
      };
    },
    anotherPassengersData(state, action) {
      console.log(action.payload);
      state.bookingData = {
        ...state.bookingData,
        anotherPassengers: [
          { ...state.bookingData.anotherPassengers, ...action.payload },
        ],
      };
    },
    selectSeat(state, action) {
      state.bookingData = {
        ...state.bookingData,
        mainPassenger: {
          ...state.bookingData.mainPassenger,
          seat: action.payload,
        },
      };
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
    orderTickets(state, action) {
      console.log(action.payload);
    },
  },
});

export const bookingSliceActions = bookingSlice.actions;
export default bookingSlice;
