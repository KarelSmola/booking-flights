import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flightsSliceActions } from "../../store";

const FilterFlights = () => {
  const dispatch = useDispatch();
  const filterValues = useSelector((state) => state.filterData);

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(flightsSliceActions.onChange({ [name]: value }));
  };

  return (
    <div className="filter-flights">
      <div className="filter-flights__label-wrap">
        <label className="filter-flights__label" htmlFor="from-input">
          From
        </label>
        <input
          className="filter-flights__input"
          type="text"
          id="from-input"
          name="from"
          value={filterValues.from}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="filter-flights__label-wrap">
        <label className="filter-flights__label" htmlFor="to-input">
          To
        </label>
        <input
          className="filter-flights__input"
          type="text"
          id="to-input"
          name="to"
          value={filterValues.to}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="filter-flights__label-wrap">
        <label className="filter-flights__label" htmlFor="departure">
          Departure
        </label>
        <input
          className="filter-flights__input"
          type="text"
          id="departure"
          name="departure"
          value={filterValues.departure}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="filter-flights__label-wrap">
        <label className="filter-flights__label" htmlFor="arrival">
          Arrival
        </label>
        <input
          className="filter-flights__input"
          type="text"
          id="arrival"
          name="arrival"
          value={filterValues.arrival}
          onChange={inputChangeHandler}
        />
      </div>
    </div>
  );
};

export default FilterFlights;
