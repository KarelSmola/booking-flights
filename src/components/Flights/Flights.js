import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flightsSliceActions } from "../../store/flightsSlice";

import { DeparturePlane, ArrivalPlane, Clock, Euro, Seat } from "../UI/Icons";

const Flights = () => {
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.flights);
  const filterData = useSelector((state) => state.flights.filterData);

  const orderTicket = (flight) => {
    dispatch(flightsSliceActions.buyTicket(flight));
  };

  return (
    <div className="flights">
      <ul className="flights__list">
        {flights
          .filter((flight) => {
            const itemFlight = flight.from.toLowerCase();
            const searchFlight = filterData.from.toLowerCase();
            const toFlight = flight.to.toLowerCase();
            const searchToFlight = filterData.to.toLowerCase();
            const departureFlight = flight.departure.toLowerCase();
            const searchDepartureFlight = filterData.departure.toLowerCase();
            const arrivalFlight = flight.arrival.toLowerCase();
            const searchArrivalFlight = filterData.arrival.toLowerCase();

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
                orderTicket(flight);
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
              <button className="flights__order-btn">Buy</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Flights;
