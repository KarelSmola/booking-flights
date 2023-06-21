import React from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import FilterFlights from "./components/FilterFlights/FilterFlights";
import Flights from "./components/Flights/Flights";
import BookingForm from "./components/BookingForm.js/BookingForm";
import OrderSummary from "./components/OrderSummary/OrderSummary";

const App = () => {
  const bookingForm = useSelector((state) => state.booking.bookingForm);
  const orderSummary = useSelector((state) => state.booking.orderSummary);

  return (
    <div className="main-container">
      <div className="main-wrapper">
        <Header />
        <FilterFlights />
        <Flights />
        {bookingForm && <BookingForm key={Math.random()} />}
        {orderSummary && <OrderSummary />}
      </div>
    </div>
  );
};

export default App;
