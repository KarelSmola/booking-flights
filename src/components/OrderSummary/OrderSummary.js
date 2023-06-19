import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      {createPortal(
        <div className="order-summary">
          <h1 className="order-summary__title">Thank you for your order</h1>
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
