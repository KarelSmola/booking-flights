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
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    seat: "",
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
    setInputValue((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const inputBlurHandler = (event) => {
    const name = event.target.name;
    setIsTouched((prevState) => {
      return { ...prevState, [name]: true };
    });
  };

  const invalidClasses = `${"booking-form__input"} ${"booking-form__input--invalid"}`;
  const validClasses = `${"booking-form__input"}`;

  const validFirstName = inputValue.firstName.trim() !== "";
  const invalidFirstName = !validFirstName && isTouched.firstName;
  const firstNameClasses = invalidFirstName ? invalidClasses : validClasses;

  const validLastName = inputValue.lastName.trim() !== "";
  const invalidLastName = !validLastName && isTouched.lastName;
  const lastNameClasses = invalidLastName ? invalidClasses : validClasses;

  const validEmail =
    inputValue.email.includes("@") && inputValue.email.trim().length > 5;
  const invalidEmail = !validEmail && isTouched.email;
  const emailClasses = invalidEmail ? invalidClasses : validClasses;

  const validPhone = inputValue.phone.trim() !== "";
  const invalidPhone = !validPhone && isTouched.phone;
  const phoneClasses = invalidPhone ? invalidClasses : validClasses;

  const validSeat = inputValue.seat !== "";
  const invalidSeat = !validSeat && isTouched.seat;
  const seatClasses = invalidSeat ? invalidClasses : validClasses;

  const toggleForm = () => {
    dispatch(bookingSliceActions.toggleNextPassengerForm());
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

    const { firstName, lastName, email, phone, seat } = inputValue;

    const bookingData = {
      ...data,
      mainPassenger: {
        firstName,
        lastName,
        email,
        phone,
        seat,
      },
    };

    dispatch(bookingSliceActions.orderTickets(bookingData));
    setInputValue({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      seat: "",
    });
  };

  const numberOfTickets = ticketsAmount === 1 ? "ticket" : "tickets";
  const addPassengerClasses = bookingState.anotherPassengers
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
                  value={inputValue.firstName}
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
                  value={inputValue.lastName}
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
                  value={inputValue.email}
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
                  value={inputValue.phone}
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
              onChange={inputChangeHandler}
            >
              <option value="">Select seat</option>
              {availableSeats.map((seat) => (
                <option value={seat.number}>{seat.number}</option>
              ))}
            </select>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Available seats</h3>
            <p className="booking-form__info">{availableTickets}</p>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Price</h3>
            <p className="booking-form__info">{bookingData.price} &euro;</p>
          </div>
          {bookingData.anotherPassengers.length === 0 ? (
            <button className={addPassengerClasses} onClick={toggleForm}>
              {bookingState.nextPassengers
                ? `${"I don't want to add next passenger"}`
                : `${"Add another passenger"}`}
            </button>
          ) : (
            ""
          )}

          {bookingState.nextPassengers && <AnotherPassengerForm />}
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
