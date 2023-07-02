import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookingSliceActions } from "../../store/bookingSlice";

import Button from "../../UI/Button";

const AnotherPassengers = () => {
  const dispatch = useDispatch();
  const anotherPassengers = useSelector(
    (state) => state.booking.bookingData.anotherPassengers
  );
  const bookingData = useSelector((state) => state.booking.bookingData);

  const removePassenger = (id, passengerSeat) => {
    const updatedSeats = bookingData.seats.map((seat) =>
      seat.number === passengerSeat ? { ...seat, available: true } : { ...seat }
    );

    const updatedData = {
      id: id,
      seats: [...updatedSeats],
    };

    dispatch(bookingSliceActions.deletePassenger(updatedData));
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
            <p>{passenger.seat}</p>
            <Button
              onClick={() => {
                removePassenger(passenger.id, passenger.seat);
              }}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnotherPassengers;
