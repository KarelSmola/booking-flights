import React from "react";

const AnotherPassangerForm = (props) => {
  return (
    <div>
      <h3>Anohter passenger</h3>
      <form>
        <div>
          <label>First Name</label>
          <input type="text" value={""} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={""} />
        </div>
        <div>
          <label>Email</label>
          <input type="mail" value={""} />
        </div>
        <div>
          <label>Phone</label>
          <input type="phone" value={""} />
        </div>
      </form>
    </div>
  );
};

export default AnotherPassangerForm;
