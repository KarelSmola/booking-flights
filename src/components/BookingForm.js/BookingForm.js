import React, { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";
import AnotherPassengerForm from "./AnotherPassengerForm";
import AnotherPassengers from "../AnotherPassengers/AnotherPassengers";

const BookingForm = () => {
  const [isTouched, setIsTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    seat: false,
  });

  const dispatch = useDispatch();
  const bookingState = useSelector((state) => state.booking);
  const bookingData = useSelector((state) => state.booking.bookingData);
  const ticketsAmount = useSelector(
    (state) => state.booking.bookingData.ticketsAmount
  );
  const availableTickets = useSelector(
    (state) => state.booking.bookingData.amountAvailableSeats
  );

  const availableSeats = bookingData.seats.filter((seat) => seat.available);

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(
      bookingSliceActions.mainPassengerData({
        [name]: value,
      })
    );
  };

  const inputBlurHandler = (event) => {
    const name = event.target.name;
    setIsTouched((prevState) => {
      return { ...prevState, [name]: true };
    });
  };

  const invalidClasses = `${"booking-form__input"} ${"booking-form__input--invalid"}`;
  const validClasses = `${"booking-form__input"}`;

  const validFirstName = bookingData.mainPassenger.firstName.trim() !== "";
  const invalidFirstName = !validFirstName && isTouched.firstName;
  const firstNameClasses = invalidFirstName ? invalidClasses : validClasses;

  const validLastName = bookingData.mainPassenger.lastName.trim() !== "";
  const invalidLastName = !validLastName && isTouched.lastName;
  const lastNameClasses = invalidLastName ? invalidClasses : validClasses;

  const validEmail =
    bookingData.mainPassenger.email.includes("@") &&
    bookingData.mainPassenger.email.trim().length > 5;
  const invalidEmail = !validEmail && isTouched.email;
  const emailClasses = invalidEmail ? invalidClasses : validClasses;

  const validPhone = bookingData.mainPassenger.phone.trim() !== "";
  const invalidPhone = !validPhone && isTouched.phone;
  const phoneClasses = invalidPhone ? invalidClasses : validClasses;

  const validSeat = bookingData.mainPassenger.seat !== "";
  const invalidSeat = !validSeat && isTouched.seat;
  const seatClasses = invalidSeat ? invalidClasses : validClasses;

  const newPassenger = () => {
    dispatch(bookingSliceActions.nextPassenger());
  };

  const buyTickets = (data) => {
    setIsTouched((prevState) => {
      return {
        ...prevState,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        seat: true,
      };
    });

    if (
      !validFirstName ||
      !validLastName ||
      !validEmail ||
      !validPhone ||
      !validSeat
    ) {
      return;
    }

    dispatch(bookingSliceActions.orderTickets(data));
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
            <h3 className="booking-form__info-title">Main passanger</h3>
            <form className="booking-form__passanger-form">
              <div className="booking-form__label-wrap">
                <label className="booking-form__label" htmlFor="first-name">
                  First Name
                </label>
                <input
                  className={firstNameClasses}
                  type="text"
                  id="first-name"
                  name="firstName"
                  value={bookingData.mainPassenger.firstName}
                  onChange={inputChangeHandler}
                  onBlur={inputBlurHandler}
                />
              </div>
              <div className="booking-form__label-wrap">
                <label className="booking-form__label" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  className={lastNameClasses}
                  type="text"
                  id="last-name"
                  name="lastName"
                  value={bookingData.mainPassenger.lastName}
                  onChange={inputChangeHandler}
                  onBlur={inputBlurHandler}
                />
              </div>
              <div className="booking-form__label-wrap">
                <label className="booking-form__label" htmlFor="email">
                  Email
                </label>
                <input
                  className={emailClasses}
                  type="mail"
                  id="email"
                  name="email"
                  value={bookingData.mainPassenger.email}
                  onChange={inputChangeHandler}
                  onBlur={inputBlurHandler}
                />
              </div>
              <div className="booking-form__label-wrap">
                <label className="booking-form__label" htmlFor="phone">
                  Phone
                </label>
                <input
                  className={phoneClasses}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={bookingData.mainPassenger.phone}
                  onChange={inputChangeHandler}
                  onBlur={inputBlurHandler}
                />
              </div>
            </form>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Seat number</h3>
            <select
              className={seatClasses}
              name="seat"
              id="seat"
              onBlur={inputBlurHandler}
              onChange={(event) => {
                dispatch(bookingSliceActions.selectSeat(event.target.value));
              }}
            >
              <option value="">Select seat</option>
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
          <button className={addPassengerClasses} onClick={newPassenger}>
            Add another passenger
          </button>
          {bookingState.nextPassenger && <AnotherPassengerForm />}
          <AnotherPassengers />
          <button
            className="booking-form__buy-btn"
            onClick={() => {
              buyTickets(bookingData);
            }}
          >
            Buy {ticketsAmount} {numberOfTickets}
          </button>
          <button
            className="booking-form__close-btn"
            onClick={() => {
              dispatch(bookingSliceActions.closeBookingForm());
            }}
          >
            X
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
