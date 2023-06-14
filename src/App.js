import React from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import FilterFlights from "./components/FilterFlights/FilterFlights";
import Flights from "./components/Flights/Flights";
import BookingForm from "./components/BookingForm.js/BookingForm";

const App = () => {
  const bookingForm = useSelector((state) => state.booking.bookingForm);

  return (
    <div className="main-container">
      <div className="main-wrapper">
        <Header />
        <FilterFlights />
        <Flights />
        {bookingForm && <BookingForm />}
      </div>
    </div>
  );
};

export default App;
