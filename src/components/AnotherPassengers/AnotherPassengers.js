import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

const AnotherPassengers = () => {
  const dispatch = useDispatch();
  const anotherPassengers = useSelector(
    (state) => state.booking.bookingData.anotherPassengers
  );

  const removePassenger = (id) => {
    dispatch(bookingSliceActions.deletePassenger(id));
  };

  return (
    <div>
      <ul>
        {anotherPassengers.map((passenger) => (
          <li key={passenger.id}>
            <p>{passenger.firstName}</p>
            <p>{passenger.lastName}</p>
            <p>{passenger.email}</p>
            <p>{passenger.phone}</p>
            <button>Edit</button>
            <button
              onClick={() => {
                removePassenger(passenger.id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnotherPassengers;
