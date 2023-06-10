import React from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import FlightsForm from "./components/FlightsForm/FlightsForm";
import Flights from "./components/Flights/Flights";

const App = () => {
  const flightsState = useSelector((state) => state);
  console.log(flightsState);

  return (
    <div className="main-container">
      <div className="main-wrapper">
        <Header />
        <FlightsForm />
        <Flights />
      </div>
    </div>
  );
};

export default App;
