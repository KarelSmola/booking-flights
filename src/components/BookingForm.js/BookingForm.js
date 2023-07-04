import React, { Fragment, useReducer } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";
import { flightsSliceActions } from "../../store/flightsSlice";
import AnotherPassengerForm from "./AnotherPassengerForm";
import AnotherPassengers from "../AnotherPassengers/AnotherPassengers";
import MainPassenger from "../MainPassenger/MainPassenger";

import Button from "../../UI/Button";

const initialState = {
  inputValues: { firstName: "", lastName: "", email: "", phone: "", seat: "" },
  blur: {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    seat: false,
  },
};

const formReducer = (state, action) => {
  if (action.type === "INPUT_VALUE") {
    return {
      ...state,
      inputValues: { ...state.inputValues, ...action.payload },
    };
  }

  if (action.type === "INPUT_SEAT_VALUE") {
    return {
      ...state,
      inputValues: { ...state.inputValues, ...action.payload },
    };
  }

  if (action.type === "BLUR") {
    return {
      ...state,
      blur: { ...state.blur, ...action.payload },
    };
  }

  if (action.type === "BLUR_ALL") {
    return {
      ...state,
      blur: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        seat: true,
      },
    };
  }

  if (action.type === "RESET_VALUES") {
    state.inputValues = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      seat: "",
    };
    state.blur = {
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      seat: false,
    };
  }

  return state;
};
const BookingForm = () => {
  const [state, formDispatch] = useReducer(formReducer, initialState);

  const dispatch = useDispatch();
  const bookingState = useSelector((state) => state.booking);
  const bookingData = useSelector((state) => state.booking.bookingData);
  const ticketsAmount = useSelector(
    (state) => state.booking.bookingData.ticketsAmount
  );

  const availableTickets = useSelector(
    (state) => state.booking.bookingData.amountAvailableSeats
  );

  const price = bookingData.price * bookingData.ticketsAmount;
  const availableSeats = bookingData.seats;

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    formDispatch({
      type: "INPUT_VALUE",
      payload: { [name]: value },
    });
  };

  const inputBlurHandler = (event) => {
    const name = event.target.name;

    formDispatch({ type: "BLUR", payload: { [name]: true } });
  };

  const invalidClasses = `${"booking-form__input"} ${"booking-form__input--invalid"}`;
  const validClasses = `${"booking-form__input"}`;

  const validFirstName = state.inputValues.firstName.trim() !== "";
  const invalidFirstName = !validFirstName && state.blur.firstName;
  const firstNameClasses = invalidFirstName ? invalidClasses : validClasses;

  const validLastName = state.inputValues.lastName.trim() !== "";
  const invalidLastName = !validLastName && state.blur.lastName;
  const lastNameClasses = invalidLastName ? invalidClasses : validClasses;

  const validEmail =
    state.inputValues.email.includes("@") &&
    state.inputValues.email.trim().length > 5;
  const invalidEmail = !validEmail && state.blur.email;
  const emailClasses = invalidEmail ? invalidClasses : validClasses;

  const validPhone = state.inputValues.phone.trim() !== "";
  const invalidPhone = !validPhone && state.blur.phone;
  const phoneClasses = invalidPhone ? invalidClasses : validClasses;

  const validSeat = state.inputValues.seat !== "";
  const invalidSeat = !validSeat && state.blur.seat;
  const seatClasses = invalidSeat ? invalidClasses : validClasses;

  const toggleForm = () => {
    dispatch(bookingSliceActions.toggleNextPassengerForm());
  };

  const confirmMainPassenger = (event) => {
    event.preventDefault();

    formDispatch({ type: "BLUR_ALL" });

    if (
      !validFirstName ||
      !validLastName ||
      !validEmail ||
      !validPhone ||
      !validSeat
    ) {
      return;
    }

    const { firstName, lastName, email, phone, seat } = state.inputValues;

    const updatedSeats = bookingData.seats.map((seat) =>
      seat.number === state.inputValues.seat
        ? { ...seat, available: false }
        : { ...seat }
    );

    const data = {
      seats: [...updatedSeats],
      mainPassenger: {
        firstName,
        lastName,
        email,
        phone,
        seat,
      },
    };

    dispatch(bookingSliceActions.mainPassengerData(data));
    formDispatch({ type: "RESET_VALUES" });
  };

  const buyTickets = (bookingData) => {
    dispatch(flightsSliceActions.orderTickets(bookingData));
    dispatch(bookingSliceActions.closeBookingForm());
    formDispatch({ type: "RESET_VALUES" });
  };

  const numberOfTickets = ticketsAmount === 1 ? "ticket" : "tickets";
  const addPassengerClasses =
    bookingState.bookingData.amountAvailableSeats === 0
      ? "booking-form__add-passenger-btn--disable"
      : "booking-form__add-passenger-btn";

  const buyBtnClasses = bookingState.mainPassenger
    ? "booking-form__buy-btn"
    : "booking-form__buy-btn--disable";

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
            <h3 className="booking-form__info-title">Tickets amount</h3>
            <p className="booking-form__info">{bookingData.ticketsAmount}</p>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Available seats</h3>
            <p className="booking-form__info">{availableTickets}</p>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Price</h3>
            <p className="booking-form__info">{price} &euro;</p>
          </div>
          <div className="booking-form__info-wrap">
            <h3 className="booking-form__info-title">Main passanger</h3>
            {bookingState.mainPassenger ? (
              <MainPassenger />
            ) : (
              <form
                className="booking-form__passanger-form"
                onSubmit={confirmMainPassenger}
              >
                <div className="booking-form__label-wrap">
                  <label className="booking-form__label" htmlFor="first-name">
                    First Name
                  </label>
                  <input
                    className={firstNameClasses}
                    type="text"
                    id="first-name"
                    name="firstName"
                    value={state.inputValues.firstName}
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
                    value={state.inputValues.lastName}
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
                    value={state.inputValues.email}
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
                    value={state.inputValues.phone}
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                  />
                </div>
                <div className="booking-form__label-wrap">
                  <label className="booking-form__label" htmlFor="seat">
                    Seat
                  </label>
                  <select
                    className={seatClasses}
                    name="seat"
                    id="seat"
                    onBlur={inputBlurHandler}
                    onChange={inputChangeHandler}
                  >
                    <option value={state.inputValues.seat}>Select seat</option>
                    {availableSeats
                      .filter((seat) => seat.available)
                      .map((seat) => (
                        <option value={seat.number}>{seat.number}</option>
                      ))}
                  </select>
                </div>
                <Button type="submit">Confirm</Button>
              </form>
            )}
          </div>

          <Button className={addPassengerClasses} onClick={toggleForm}>
            {bookingState.nextPassengers
              ? `${"I don't want to add next passenger"}`
              : `${"Add another passenger"}`}
          </Button>

          {bookingState.nextPassengers && <AnotherPassengerForm />}
          <AnotherPassengers />
          <Button
            className={buyBtnClasses}
            onClick={() => {
              buyTickets(bookingData);
            }}
          >
            Buy {ticketsAmount} {numberOfTickets}
          </Button>
          <Button
            className="booking-form__close-btn"
            onClick={() => {
              dispatch(bookingSliceActions.closeBookingForm());
            }}
          >
            X
          </Button>
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
