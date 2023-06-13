import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { bookingFlightsActions } from "../../store";

const initialState = {
  inputValues: { from: "", to: "", departure: "", arrival: "" },
  touched: { from: false, to: false, departure: false, arrival: false },
};

const formReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE_HANDLER") {
    return {
      ...state,
      inputValues: { ...state.inputValues, ...action.payload },
    };
  }

  if (action.type === "TOUCHED") {
    return { ...state, touched: { ...state.touched, ...action.payload } };
  }

  if (action.type === "ALL_TOUCHED") {
    return {
      ...state,
      touched: {
        ...state.touched,
        from: true,
        to: true,
        departure: true,
        arrival: true,
      },
    };
  }

  if (action.type === "RESET_VALUES") {
    return initialState;
  }

  return state;
};

const FlightsForm = () => {
  const dispatch = useDispatch();
  const [state, formDispatch] = useReducer(formReducer, initialState);

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    formDispatch({ type: "INPUT_CHANGE_HANDLER", payload: { [name]: value } });
    dispatch(bookingFlightsActions.onChange({ [name]: value }));
  };

  const inputBlurHandler = (event) => {
    const name = event.target.name;
    formDispatch({ type: "TOUCHED", payload: { [name]: true } });
  };

  const invalidClasses = "flights-form__input flights-form__input--invalid";
  const validClass = "flights-form__input";
  const valuesState = state.inputValues;

  const validFrom = valuesState.from.trim() !== "";
  const invalidFrom = !validFrom && state.touched.from;
  const fromClasses = invalidFrom ? invalidClasses : validClass;

  const validTo = valuesState.to.trim() !== "";
  const invalidTo = !validTo && state.touched.to;
  const toClasses = invalidTo ? invalidClasses : validClass;

  const validDeparture = valuesState.departure.trim() !== "";
  const invalidDeparture = !validDeparture && state.touched.departure;
  const departureClasses = invalidDeparture ? invalidClasses : validClass;

  const validArrival = valuesState.arrival.trim() !== "";
  const invalidArrival = !validArrival && state.touched.arrival;
  const arrivalClasses = invalidArrival ? invalidClasses : validClass;

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(state);
    formDispatch({ type: "ALL_TOUCHED" });

    if (!validFrom || !validTo) {
      return;
    }

    let orderData = {
      from: state.inputValues.from,
      to: state.inputValues.to,
      departure: state.inputValues.departure,
      arrival: state.inputValues.arrival,
    };

    dispatch(bookingFlightsActions.order(orderData));

    formDispatch({ type: "RESET_VALUES" });
  };

  return (
    <div className="flights-form">
      <form className="flights-form__form" onSubmit={submitHandler}>
        <div className="flights-form__label-wrap">
          <label className="flights-form__label" htmlFor="from-input">
            From
          </label>
          <input
            className={fromClasses}
            type="text"
            id="from-input"
            name="from"
            value={state.inputValues.from}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="flights-form__label-wrap">
          <label className="flights-form__label" htmlFor="to-input">
            To
          </label>
          <input
            className={toClasses}
            type="text"
            id="to-input"
            name="to"
            value={state.inputValues.to}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="flights-form__label-wrap">
          <label className="flights-form__label" htmlFor="departure">
            Departure
          </label>
          <input
            className={departureClasses}
            type="date"
            id="departure"
            name="departure"
            value={state.inputValues.departure}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="flights-form__label-wrap">
          <label className="flights-form__label" htmlFor="arrival">
            Arrival
          </label>
          <input
            className={arrivalClasses}
            type="date"
            id="arrival"
            name="arrival"
            value={state.inputValues.arrival}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <button type="submit" className="flights-form__order-btn">
          Order
        </button>
      </form>
    </div>
  );
};

export default FlightsForm;
