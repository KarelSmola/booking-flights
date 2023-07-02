import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

import Button from "../../UI/Button";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.booking.bookingData);
  const anotherPassengers = bookingData.anotherPassengers;

  const numberOfTickets =
    bookingData.ticketsAmount === 1 ? "ticket" : "tickets";

  return (
    <Fragment>
      {createPortal(
        <div className="order-summary">
          <h1 className="order-summary__title">Thank you for your order</h1>
          <p>
            You bought {bookingData.ticketsAmount} {numberOfTickets}
          </p>
          <p>Price {bookingData.price} &euro;</p>
          <p>{bookingData.mainPassenger.firstName}</p>
          <p>{bookingData.mainPassenger.lastName}</p>
          <p>{bookingData.mainPassenger.email}</p>
          <p>{bookingData.mainPassenger.phone}</p>
          <p>{bookingData.mainPassenger.seat}</p>
          <ul>
            {anotherPassengers.map((nextPassenger) => (
              <li>
                <p>{nextPassenger.firstName}</p>
                <p>{nextPassenger.lastName}</p>
                <p>{nextPassenger.email}</p>
                <p>{nextPassenger.phone}</p>
              </li>
            ))}
          </ul>
          <Button
            onClick={() => {
              dispatch(bookingSliceActions.closeSummary());
            }}
          >
            OK
          </Button>
          <Button
            className="order-summary__close-summary-btn"
            onClick={() => {
              dispatch(bookingSliceActions.closeSummary());
            }}
          >
            X
          </Button>
        </div>,
        document.getElementById("modal")
      )}
    </Fragment>
  );
};

export default OrderSummary;
