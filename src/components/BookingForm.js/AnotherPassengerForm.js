import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

const AnotherPassengerForm = (props) => {
  const dispatch = useDispatch();
  const otherPassenger = useSelector(
    (state) => state.booking.bookingData.anotherPassengers
  );

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    dispatch(bookingSliceActions.onChange({ [name]: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
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
            name="first-name"
            value={otherPassenger.firstName}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            value={otherPassenger.firstName}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={""}
            onChange={() => {}}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={""}
            onChange={() => {}}
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
