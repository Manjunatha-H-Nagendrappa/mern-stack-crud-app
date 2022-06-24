import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faTrash,
  faUserCheck,
  faEnvelope,
  faPhone,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";

const Read = () => {
  const [getUserData, setUserData] = useState([]);

  const { id } = useParams("");

  const navigate = useNavigate("");

  const getInfo = async () => {
    const res = await fetch(`/getUser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("Read error");
    } else {
      setUserData(data);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const deleteUser = async (id) => {
    const res2 = await fetch(`/deleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data2 = await res2.json();

    if (res2.status === 422 || !data2) {
      console.log("Delete error");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="container mt-3">
      <NavLink to="/home">Home</NavLink>
      <h2 className="mt-4" style={{ fontWeight: 500 }}>
        Welcome {getUserData.name}
      </h2>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add-btn">
            <NavLink to={`/update/${getUserData._id}`}>
              <button className="btn btn-info mx-2">
                <FontAwesomeIcon icon={faUserPen} />
              </button>
            </NavLink>
            <button
              className="btn btn-danger mx-2"
              onClick={() => deleteUser(getUserData._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div className="row">
            <div className="left-view col-lg-6">
              <img src="/person.webp" style={{ width: 180 }} alt="profile" />
            </div>
            <div className="right-view col-lg-6">
              <p className="mt-3">
                <FontAwesomeIcon icon={faUserCheck} /> Name:{" "}
                <span>{getUserData.name}</span>
              </p>
              <p className="mt-3">
                <FontAwesomeIcon icon={faEnvelope} /> E-mail:{" "}
                <span>{getUserData.email}</span>
              </p>
              <p className="mt-3">
                <FontAwesomeIcon icon={faPhone} /> Phone:{" "}
                <span>{getUserData.phone}</span>
              </p>
              <p className="mt-3">
                <FontAwesomeIcon icon={faAddressBook} /> Address:{" "}
                <span>{getUserData.address}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Read;
