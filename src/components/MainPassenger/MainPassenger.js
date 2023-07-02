import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

import Button from "../../UI/Button";

const MainPassenger = () => {
  const dispatch = useDispatch();
  const mainPassenger = useSelector(
    (state) => state.booking.bookingData.mainPassenger
  );
  const bookingData = useSelector((state) => state.booking.bookingData);

  const removeMainPassenger = () => {
    const updatedSeats = bookingData.seats.map((seat) =>
      seat.number === mainPassenger.seat
        ? { ...seat, available: true }
        : { ...seat }
    );

    const mainPassengerDataUpdated = {
      seats: [...updatedSeats],
    };

    dispatch(
      bookingSliceActions.removeMainPassengerData(mainPassengerDataUpdated)
    );
  };

  return (
    <div>
      <p>{mainPassenger.firstName}</p>
      <p>{mainPassenger.lastName}</p>
      <p>{mainPassenger.email}</p>
      <p>{mainPassenger.phone}</p>
      <p>{mainPassenger.seat}</p>
      <Button onClick={removeMainPassenger}>Remove</Button>
    </div>
  );
};

export default MainPassenger;
