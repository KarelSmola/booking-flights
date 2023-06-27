import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingForm: false,
  orderSummary: false,
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
    nextPassengers: false,
    anotherPassengers: [],
    anotherPassengersForm: {
      firstName: { value: "", isTouched: false },
      lastName: { value: "", isTouched: false },
      email: { value: "", isTouched: false },
      phone: { value: "", isTouched: false },
    },
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
          { ...action.payload },
        ],
      };
    },
    nextPassengerInputValue(state, action) {
      const name = action.payload.name;
      const value = action.payload.value;
      console.log(name, value);
      state.bookingData = {
        ...state.bookingData,
        anotherPassengersForm: {
          ...state.bookingData.anotherPassengersForm,
          firstName: {
            ...state.bookingData.anotherPassengersForm.firstName,
            name: value,
          },
        },
      };
    },
    deletePassenger(state, action) {
      state.bookingData = {
        ...state.bookingData,
        anotherPassengers: [
          ...state.bookingData.anotherPassengers.filter(
            (passenger) => passenger.id !== action.payload
          ),
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
    closeBookingForm() {
      return initialState;
    },
    closeSummary(state) {
      state.orderSummary = false;
    },
  },
});

export const bookingSliceActions = bookingSlice.actions;
export default bookingSlice;
