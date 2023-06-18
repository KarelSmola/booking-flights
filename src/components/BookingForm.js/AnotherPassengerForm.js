import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

const AnotherPassengerForm = (props) => {
  const [passengerData, setPassengerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const anotherPassengers = useSelector(
    (state) => state.booking.bookingData.anotherPassengers
  );

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setPassengerData((prevData) => ({ ...prevData, [name]: value }));

    // dispatch(bookingSliceActions.anotherPassengersData({ [name]: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      bookingSliceActions.anotherPassengersData({
        id: props.id,
        ...passengerData,
      })
    );
  };

  return (
    <div>
      <h3>Anohter passenger</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={passengerData.firstName}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={passengerData.lastName}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={passengerData.email}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={passengerData.phone}
            onChange={inputChangeHandler}
          />
        </div>
        <button type="submit">OK</button>
      </form>
      <button
        onClick={() => {
          dispatch(bookingSliceActions.removePassenger(props.id));
        }}
      >
        Remove passenger
      </button>
    </div>
  );
};

export default AnotherPassengerForm;
