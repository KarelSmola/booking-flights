import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingForm: false,
  orderSummary: false,
  mainPassenger: false,
  nextPassengers: false,
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
};

const bookingSlice = createSlice({
  name: "booking-slice",
  initialState,
  reducers: {
    buyTicket(state, action) {
      state.bookingForm = true;
      state.bookingData = {
        ...state.bookingData,
        ...action.payload,
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
      console.log(action.payload);
      state.mainPassenger = true;
      state.bookingData = {
        ...state.bookingData,
        ticketsAmount: state.bookingData.ticketsAmount + 1,
        amountAvailableSeats: state.bookingData.amountAvailableSeats - 1,
        mainPassenger: {
          ...state.bookingData.mainPassenger,
          ...action.payload.mainPassenger,
        },
        seats: [...action.payload.seats],
      };
    },
    removeMainPassengerData(state, action) {
      state.mainPassenger = false;
      state.bookingData = {
        ...state.bookingData,
        ticketsAmount: state.bookingData.ticketsAmount - 1,
        amountAvailableSeats: state.bookingData.amountAvailableSeats + 1,
        seats: [...action.payload.seats],
      };
    },
    toggleNextPassengerForm(state) {
      state.nextPassengers = !state.nextPassengers;
    },
    anotherPassengerConfirmed(state, action) {
      state.bookingData = {
        ...state.bookingData,
        ticketsAmount: state.bookingData.ticketsAmount + 1,
        amountAvailableSeats: state.bookingData.amountAvailableSeats - 1,
        anotherPassengers: [
          ...state.bookingData.anotherPassengers,
          ...action.payload.anotherPassenger,
        ],
        seats: [...action.payload.seats],
      };
    },
    closeAnotherPassengerForm(state) {
      state.nextPassengers = false;
    },
    deletePassenger(state, action) {
      state.bookingData = {
        ...state.bookingData,
        ticketsAmount: state.bookingData.ticketsAmount - 1,
        amountAvailableSeats: state.bookingData.amountAvailableSeats + 1,
        anotherPassengers: [
          ...state.bookingData.anotherPassengers.filter(
            (passenger) => passenger.id !== action.payload.id
          ),
        ],
        seats: [...action.payload.seats],
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
      state.bookingData = {
        ...state.bookingData,
        ...action.payload,
      };
      state.orderSummary = true;
      state.bookingForm = false;
    },
    resetInputValues(state) {
      state.bookingData = {
        ...state.bookingData,
        mainPassenger: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          seat: "",
        },
      };
    },
    closeBookingForm(state) {
      state.bookingForm = false;
      state.orderSummary = true;
    },
    closeSummary(state) {
      state.orderSummary = false;
    },
  },
});

export const bookingSliceActions = bookingSlice.actions;
export default bookingSlice;
