import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";
import AnotherPassengerForm from "./AnotherPassengerForm";

const BookingForm = () => {
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.booking.bookingData);
  const ticketsAmount = useSelector(
    (state) => state.booking.bookingData.ticketsAmount
  );
  const anotherPassengers = useSelector(
    (state) => state.booking.bookingData.anotherPassengers
  );
  const availableTickets = useSelector(
    (state) => state.booking.bookingData.amountAvailableSeats
  );

  const availableSeats = bookingData.seats.filter((seat) => seat.available);

  const addPassenger = () => {
    dispatch(
      bookingSliceActions.newPassenger({
        id: Math.random(),
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      })
    );
  };

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(bookingSliceActions.mainPassengerData({ [name]: value }));
  };

  const numberOfTickets = ticketsAmount === 1 ? "ticket" : "tickets";
  const addPassengerClasses =
    availableTickets === 0
      ? "booking-form__add-passenger-btn--disable"
      : "booking-form__add-passenger-btn";

  return (
    <Fragment>
      {createPortal(
        <div className="booking-form">
          <h1 className="booking-form__title">Buy Tickets</h1>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">From</h3>
            <p className="booking-form__info">{bookingData.from}</p>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">To</h3>
            <p className="booking-form__info">{bookingData.to}</p>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Departure</h3>
            <p className="booking-form__info">{bookingData.departure}</p>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Arrival</h3>
            <p className="booking-form__info">{bookingData.arrival}</p>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Passanger info</h3>
            <form className="booking-form__passanger-form">
              <div className="booking-form__label-wrap">
                <label className="booking-form__label" htmlFor="first-name">
                  First Name
                </label>
                <input
                  className="booking-form__input"
                  type="text"
                  id="first-name"
                  name="firstName"
                  value={bookingData.mainPassenger.firstName}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="booking-form__label-wrap">
                <label className="booking-form__label" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  className="booking-form__input"
                  type="text"
                  id="last-name"
                  name="lastName"
                  value={bookingData.mainPassenger.lastName}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="booking-form__label-wrap">
                <label className="booking-form__label" htmlFor="email">
                  Email
                </label>
                <input
                  className="booking-form__input"
                  type="mail"
                  id="email"
                  name="email"
                  value={bookingData.mainPassenger.email}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="booking-form__label-wrap">
                <label className="booking-form__label" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="booking-form__input"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={bookingData.mainPassenger.phone}
                  onChange={inputChangeHandler}
                />
              </div>
            </form>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Seat number</h3>
            <select
              name="seat-number"
              id="seat-number"
              onChange={(event) => {
                dispatch(bookingSliceActions.selectSeat(event.target.value));
              }}
            >
              <option value="" selected>
                Select seat
              </option>
              {availableSeats.map((seat) => (
                <option value={seat.number}>{seat.number}</option>
              ))}
            </select>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Available seats</h3>
            <p className="booking-form__info">
              {bookingData.amountAvailableSeats}
            </p>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Price</h3>
            <p className="booking-form__info">{bookingData.price} &euro;</p>
          </div>
          <button className={addPassengerClasses} onClick={addPassenger}>
            Add another passenger
          </button>
          {anotherPassengers.length > 0 &&
            anotherPassengers.map((passenger) => (
              <AnotherPassengerForm id={passenger.id} />
            ))}
          <button
            className="booking-form__buy-btn"
            onClick={() => {
              dispatch(bookingSliceActions.orderTickets(bookingData));
            }}
          >
            Buy {ticketsAmount} {numberOfTickets}
          </button>
        </div>,
        document.getElementById("modal")
      )}
      {createPortal(
        <div className="booking-form__backdrop" />,
        document.getElementById("backdrop")
      )}
    </Fragment>
  );
};

export default BookingForm;
