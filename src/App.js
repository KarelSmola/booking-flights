import React from "react";
import Header from "./components/Header/Header";
import FilterFlights from "./components/FilterFlights/FilterFlights";
import Flights from "./components/Flights/Flights";
import BookingForm from "./components/BookingForm.js/BookingForm";

const App = () => {
  return (
    <div className="main-container">
      <div className="main-wrapper">
        <Header />
        <FilterFlights />
        <Flights />
        <BookingForm />
      </div>
    </div>
  );
};

export default App;
