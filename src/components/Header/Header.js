import React from "react";

import { Plane } from "../../UI/Icons";

const Header = () => {
  return (
    <div className="header">
      <h1 className="header__title">Booking flights</h1>
      <Plane className="header__plane-icon" />
    </div>
  );
};

export default Header;
