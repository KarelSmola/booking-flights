import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

const MainPassenger = () => {
  const dispatch = useDispatch();
  const mainPassenger = useSelector(
    (state) => state.booking.bookingData.mainPassenger
  );

  const removeMainPassenger = () => {
    dispatch(bookingSliceActions.removeMainPassengerData());
  };

  return (
    <div>
      <p>{mainPassenger.firstName}</p>
      <p>{mainPassenger.lastName}</p>
      <p>{mainPassenger.email}</p>
      <p>{mainPassenger.phone}</p>
      <p>{mainPassenger.seat}</p>
      <button onClick={removeMainPassenger}>Edit</button>
    </div>
  );
};

export default MainPassenger;
