import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookingFlightsActions } from "../../store";

import { DeparturePlane, ArrivalPlane, Clock, Euro, Seat } from "../UI/Icons";

const Flights = () => {
  const dispatch = useDispatch()
  const flights = useSelector((state) => state.flights);
  const bookingData = useSelector((state) => state.bookingData);


  const fillBookingForm = (flight) => {
    dispatch(bookingFlightsActions.fillBookingData(flight))
    console.log(flight);
  };

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
              departureFlight.includes(searchDepartureFlight) &&
              arrivalFlight.includes(searchArrivalFlight)
            );
          })
          .map((flight) => (
            <li
              className={
                flight.amountAvailableSeats === 0
                  ? "flights__flight-wrap flights__flight-wrap--sold-out"
                  : "flights__flight-wrap"
              }
              key={flight.id}
              onClick={() => {
                fillBookingForm(flight);
              }}
            >
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
                <p>{flight.amountAvailableSeats}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Flights;
