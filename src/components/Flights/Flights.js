import React from "react";
import { useSelector } from "react-redux";

import { DeparturePlane, ArrivalPlane, Clock, Euro, Seat } from "../UI/Icons";

const Flights = () => {
  const flights = useSelector((state) => state.flights);
  const bookingData = useSelector((state) => state.bookingData);

  const freeSeatsAmount = flights.map((seatsAll) => {
    const seats = seatsAll.seats;
    const seatsOverview = seats.map((freeSeat) => freeSeat.available);
    const freeSeats = seatsOverview.filter((seat) => seat).length;
    return freeSeats;
  });

  return (
    <div className="flights">
      <ul className="flights__list">
        {flights
          .filter((flight) => {
            const itemFlight = flight.from.toLowerCase();
            const searchFlight = bookingData.from.toLowerCase();
            const toFlight = flight.to.toLowerCase();
            const searchToFlight = bookingData.to.toLowerCase();
            const departureFlight = flight.departure.toLowerCase();
            const searchDepartureFlight = bookingData.departure.toLowerCase();
            const arrivalFlight = flight.arrival.toLowerCase();
            const searchArrivalFlight = bookingData.arrival.toLowerCase();

            return (
              itemFlight.startsWith(searchFlight) &&
              toFlight.startsWith(searchToFlight) &&
              departureFlight.startsWith(searchDepartureFlight) &&
              arrivalFlight.startsWith(searchArrivalFlight)
            );
          })
          .map((flight, index) => (
            <li className="flights__flight-wrap" key={flight.id}>
              <div className="flights__flight-item-wrap">
                <DeparturePlane />
                <p className="flights__flight-from">{flight.from}</p>
              </div>
              <div className="flights__flight-item-wrap">
                <ArrivalPlane />
                <p className="flights__flight-to">{flight.to}</p>
              </div>
              <p className="flights__flight-departure">{flight.departure}</p>
              <p className="flights__flight-arrival">{flight.arrival}</p>
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
