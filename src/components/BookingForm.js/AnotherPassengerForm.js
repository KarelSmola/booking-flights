import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

const AnotherPassengerForm = (props) => {
  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    dispatch(
      bookingSliceActions.anotherPassengersData({
        [name]: value,
      })
    );
  };

  return (
    <div className="another-passenger">
      <div className="another-passenger__info-wrap">
        <h3 className="another-passenger__info-title">Another passenger</h3>
        <form className="another-passenger__form">
          <div className="another-passenger__label-wrap">
            <label htmlFor="first-name" className="another-passenger__label">
              First Name
            </label>
            <input
              className="another-passenger__input"
              type="text"
              id="first-name"
              name="firstName"
              value={""}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="another-passenger__label-wrap">
            <label htmlFor="last-name" className="another-passenger__label">
              Last Name
            </label>
            <input
              className="another-passenger__input"
              type="text"
              id="last-name"
              name="lastName"
              value={""}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="another-passenger__label-wrap">
            <label htmlFor="email" className="another-passenger__label">
              Email
            </label>
            <input
              className="another-passenger__input"
              type="text"
              id="email"
              name="email"
              value={""}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="another-passenger__label-wrap">
            <label htmlFor="phone" className="another-passenger__label">
              Phone
            </label>
            <input
              className="another-passenger__input"
              type="text"
              id="phone"
              name="phone"
              value={""}
              onChange={inputChangeHandler}
            />
          </div>
          {/* <button className="another-passenger__ok-btn" type="submit">
            OK
          </button> */}
        </form>
      </div>
      <button
        className="another-passenger__remove-passenger-btn"
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
