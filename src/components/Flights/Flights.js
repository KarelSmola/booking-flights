import React, { useState } from "react";
import data from "../../data/data";
import { weekdays } from "../../data/data";

import { DeparturePlane, ArrivalPlane, Clock, Euro, Seat } from "../UI/Icons";

const Flights = () => {
  const [flights, setFlights] = useState(data);
  // console.log(data);

  const transformDeparture = flights.map((flight) => {
    let date = new Date(flight.departure);
    const newDeparture = `${weekdays[date.getDay()]} ${date.getDate()}. ${
      date.getMonth() + 1
    }. ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
    return newDeparture;
  });

  const transformArrival = flights.map((flight) => {
    let date = new Date(flight.arrival);
    const newArrival = `${date.getDate()}. ${
      date.getMonth() + 1
    }. ${date.getFullYear()} ${date.getHours()}:${
      date.getMinutes() < "10" ? "0" + date.getMinutes() : date.getMinutes()
    }`;
    return newArrival;
  });

  const freeSeatsAmount = flights.map((seatsAll) => {
    const seats = seatsAll.seats;
    const seatsOverview = seats.map((freeSeat) => freeSeat.available);
    const freeSeats = seatsOverview.filter((seat) => seat).length;
    return freeSeats;
  });

  return (
    <div className="flights">
      <ul className="flights__list">
        {flights.map((flight, index) => (
          <li className="flights__flight-wrap" key={flight.id}>
            <div className="flights__flight-item-wrap">
              <DeparturePlane />
              <p className="flights__flight-from">{flight.from}</p>
            </div>
            <div className="flights__flight-item-wrap">
              <ArrivalPlane />
              <p className="flights__flight-to">{flight.to}</p>
            </div>
            <p className="flights__flight-departure">
              {transformDeparture[index]}
            </p>
            <p className="flights__flight-arrival">{transformArrival[index]}</p>
            <div className="flights__flight-item-wrap">
              <Clock />
              <p>{flight.duration}</p>
            </div>
            <div className="flights__flight-item-wrap">
              <Euro />
              <p>{flight.price}</p>
            </div>
            <div className="flights__flight-item-wrap">
              <Seat />
              <p>{freeSeatsAmount[index]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
