import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

const initialState = {
  inputValues: { firstName: "", lastName: "", email: "", phone: "" },
  blur: { firstName: false, lastName: false, email: false, phone: false },
};

const newPassengerReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE_VALUE") {
    return {
      ...state,
      inputValues: { ...state.inputValues, ...action.payload },
    };
  }

  if (action.type === "INPUT_BLUR_HANDLER") {
    return {
      ...state,
      blur: { ...state.blur, ...action.payload },
    };
  }

  if (action.type === "BLUR_ALL") {
    return {
      ...state,
      blur: { firstName: true, lastName: true, email: true, phone: true },
    };
  }

  if (action.type === "RESET_VALUES") {
    return initialState;
  }

  return state;
};

const AnotherPassengerForm = (props) => {
  const [state, newPassengerDispatch] = useReducer(
    newPassengerReducer,
    initialState
  );
  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    newPassengerDispatch({
      type: "INPUT_CHANGE_VALUE",
      payload: { [name]: value },
    });
  };

  const inputBlurHandler = (event) => {
    const name = event.target.name;
    newPassengerDispatch({
      type: "INPUT_BLUR_HANDLER",
      payload: { [name]: true },
    });
  };

  const addAnotherPassenger = (event) => {
    event.preventDefault();

    newPassengerDispatch({
      type: "BLUR_ALL",
    });

    if (!validFirstName || !validLastName || !validEmail || !validPhone) {
      return;
    }

    dispatch(
      bookingSliceActions.anotherPassenger({
        id: Math.random(),
        ...state.inputValues,
      })
    );

    newPassengerDispatch({ type: "RESET_VALUES" });
  };

  const invalidClasses = `${"another-passenger__input"} ${"another-passenger__input--invalid"}`;
  const validClasses = `${"another-passenger__input"}`;

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

  return (
    <div className="another-passenger">
      <div className="another-passenger__info-wrap">
        <h3 className="another-passenger__info-title">Another passenger</h3>
        <form
          className="another-passenger__form"
          onSubmit={addAnotherPassenger}
        >
          <div className="another-passenger__label-wrap">
            <label htmlFor="first-name" className="another-passenger__label">
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
          <div className="another-passenger__label-wrap">
            <label htmlFor="last-name" className="another-passenger__label">
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
          <div className="another-passenger__label-wrap">
            <label htmlFor="email" className="another-passenger__label">
              Email
            </label>
            <input
              className={emailClasses}
              type="email"
              id="email"
              name="email"
              value={state.inputValues.email}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
            />
          </div>
          <div className="another-passenger__label-wrap">
            <label htmlFor="phone" className="another-passenger__label">
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
          <button className="another-passenger__confirm-btn" type="submit">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnotherPassengerForm;
