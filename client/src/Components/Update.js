import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { updateData } from "./Context/ContextProvider";

const Update = () => {
  const { upData, setUpData } = useContext(updateData);

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

  const { id } = useParams("");

  const getInfo = async () => {
    const res = await fetch(`/getUser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("get user error");
    } else {
      setInputVal(data);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const updateUserInfo = async (e) => {
    e.preventDefault();

    const { name, email, phone, address } = inputVal;

    const res2 = await fetch(`/updateUser/${id}`, {
      method: "PATCH",
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

    const data2 = await res2.json();

    if (res2.status === 422 || !data2) {
      alert("update error");
    } else {
      navigate("/home");
      setUpData(data2);
    }
  };

  return (
    <div className="container mt-3">
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
            />
          </div>
          <button
            type="submit"
            onClick={updateUserInfo}
            className="btn btn-primary mt-4"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
