import { configureStore, createSlice } from "@reduxjs/toolkit";
import data from "../data/data";
import { weekdays } from "../data/data";

const transformedData = data.map((flight) => {
  const departure = new Date(flight.departure);
  const arrival = new Date(flight.arrival);

  const departureDate = `${
    weekdays[departure.getDay()]
  } ${departure.getDate()}. ${
    departure.getMonth() + 1
  }. ${departure.getHours()}:${
    departure.getMinutes() < 10
      ? "0" + departure.getMinutes()
      : departure.getMinutes()
  }`;

  const arrivalDate = `${weekdays[arrival.getDay()]} ${arrival.getDate()}. ${
    arrival.getMonth() + 1
  }. ${arrival.getHours()}:${
    arrival.getMinutes() < 10
      ? "0" + arrival.getMinutes()
      : arrival.getMinutes()
  }`;

  const seats = flight.seats;
  const seatsOverview = seats.map((freeSeat) => freeSeat.available);
  const freeSeats = seatsOverview.filter((seat) => seat).length;

  let transformedFlight = {
    ...flight,
    departure: departureDate,
    arrival: arrivalDate,
    amountAvailableSeats: freeSeats,
  };

  return transformedFlight;
});

console.log(transformedData);

const bookingFlights = createSlice({
  name: "booking-flights",
  initialState: {
    flights: transformedData,
    bookingData: {
      from: "",
      to: "",
      departure: "",
      arrival: "",
      seats: 0,
      price: 0,
    },
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
    onChange(state, action) {
      state.bookingData = { ...state.bookingData, ...action.payload };
    },
    fillBookingData(state, action) {
      console.log(action.payload);
      state.bookingData.from = action.payload.from;
    },
  },
});

const store = configureStore({ reducer: bookingFlights.reducer });

export const bookingFlightsActions = bookingFlights.actions;
export default store;
