import React from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import FilterFlights from "./components/FilterFlights/FilterFlights";
import Flights from "./components/Flights/Flights";

const App = () => {
  const flightsState = useSelector((state) => state);

  return (
    <div className="main-container">
      <div className="main-wrapper">
        <Header />
        <FilterFlights />
        <Flights />
      </div>
    </div>
  );
};

export default App;
