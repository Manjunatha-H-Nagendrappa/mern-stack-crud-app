import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { addData } from "./Context/ContextProvider";

const Create = () => {
  const { userdata, setUserdata } = useContext(addData);

  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate("");

  const addInfo = (e) => {
    const { name, value } = e.target;
    setInputVal((inputVal) => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };

  const addInputInfo = async (e) => {
    e.preventDefault();

    const { name, email, phone, address } = inputVal;

    const res = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        address,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      alert("Create error");
    } else {
      navigate("/home");
      setUserdata(data);
    }
  };

  return (
    <div className="container">
      <NavLink to="/home">Home</NavLink>
      <form className="mt-5">
        <div className="row">
          <div className="mb-4 col-lg-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={inputVal.name}
              onChange={addInfo}
              name="name"
              id="name"
              className="form-control"
              placeholder="please enter your name"
            />
          </div>
          <div className="mb-4 col-lg-6">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              value={inputVal.email}
              onChange={addInfo}
              name="email"
              id="email"
              className="form-control"
              placeholder="please enter your email"
            />
          </div>
          <div className="mb-3 col-lg-6">
            <label className="form-label">Phone Number</label>
            <input
              type="phone"
              value={inputVal.phone}
              onChange={addInfo}
              name="phone"
              id="phone"
              className="form-control"
              placeholder="please enter your phone number"
            />
          </div>
          <div className="mb-3 col-lg-6">
            <label className="form-label">Address</label>
            <input
              type="text"
              value={inputVal.address}
              onChange={addInfo}
              name="address"
              id="address"
              className="form-control"
              placeholder="please enter your address"
            />
          </div>
          <button
            type="submit"
            onClick={addInputInfo}
            className="btn btn-primary mt-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
