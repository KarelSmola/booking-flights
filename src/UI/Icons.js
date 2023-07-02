import {
  FaPlane,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaEuroSign,
  // FaBandcamp,
} from "react-icons/fa";

import { BsFillPeopleFill } from "react-icons/bs";

import { MdAirlineSeatReclineNormal } from "react-icons/md";

export const Plane = (props) => {
  return <FaPlane className={props.className} />;
};

export const DeparturePlane = (props) => {
  return <FaPlaneDeparture className={props.className} />;
};

export const ArrivalPlane = (props) => {
  return <FaPlaneArrival className={props.className} />;
};

export const Clock = (props) => {
  return <FaClock className={props.className} />;
};

export const Euro = (props) => {
  return <FaEuroSign className={props.className} />;
};

export const Seat = (props) => {
  return <MdAirlineSeatReclineNormal className={props.className} />;
};

export const People = (props) => {
  return <BsFillPeopleFill className={props.className} />;
};
