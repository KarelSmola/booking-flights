import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.booking.bookingData);

  return (
    <Fragment>
      {createPortal(
        <div className="order-summary">
          <h1 className="order-summary__title">Thank you for your order</h1>
          <p>You bought {bookingData.ticketsAmount} ticket</p>
          <p>Price {bookingData.price} &euro;</p>
          <p>{bookingData.mainPassenger.firstName}</p>
          <p>{bookingData.mainPassenger.lastName}</p>
          <p>{bookingData.mainPassenger.email}</p>
          <p>{bookingData.mainPassenger.phone}</p>
          <p>{bookingData.mainPassenger.seat}</p>
          <button
            onClick={() => {
              dispatch(bookingSliceActions.closeSummary());
            }}
          >
            OK
          </button>
          <button
            className="order-summary__close-summary-btn"
            onClick={() => {
              dispatch(bookingSliceActions.closeSummary());
            }}
          >
            X
          </button>
        </div>,
        document.getElementById("modal")
      )}
    </Fragment>
  );
};

export default OrderSummary;
