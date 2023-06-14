import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";
import AnotherPassangerForm from "./AnotherPassangerForm";

const BookingForm = () => {
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.booking.bookingData);
  const ticketsAmount = useSelector(
    (state) => state.booking.bookingData.ticketsAmount
  );
  const anotherPassangers = useSelector(
    (state) => state.booking.bookingData.anotherPassangers
  );
  console.log(anotherPassangers);

  const addPassanger = () => {
    dispatch(
      bookingSliceActions.newPassenger({
        id: Math.random(),
        firstName: "",
        lastName: "",
      })
    );
  };

  const numberOfTickets = ticketsAmount === 1 ? "ticket" : "tickets";

  return (
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
            <label className="booking-form__label">First Name</label>
            <input className="booking-form__input" type="text" />
          </div>
          <div className="booking-form__label-wrap">
            <label className="booking-form__label">Last Name</label>
            <input className="booking-form__input" type="text" />
          </div>
          <div className="booking-form__label-wrap">
            <label className="booking-form__label">Email</label>
            <input className="booking-form__input" type="mail" />
          </div>
          <div className="booking-form__label-wrap">
            <label className="booking-form__label">Phone</label>
            <input className="booking-form__input" type="phone" />
          </div>
        </form>
      </div>
      <div className="booking-form__info-wrap">
        <h3 className="booking-form__info-title">Available seats</h3>
        <p className="booking-form__info">{bookingData.amountAvailableSeats}</p>
      </div>
      <button onClick={addPassanger}>Add another passager</button>
      {anotherPassangers.length > 0 &&
        anotherPassangers.map((passanger) => (
          <AnotherPassangerForm
            firstName={passanger.firsName}
            lastName={passanger.lastName}
          />
        ))}
      <button>
        Buy {ticketsAmount} {numberOfTickets}
      </button>
    </div>
  );
};

export default BookingForm;