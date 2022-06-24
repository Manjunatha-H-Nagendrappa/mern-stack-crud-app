import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUserPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { addData, updateData, deleteData } from "./Context/ContextProvider";

const Home = () => {
  const [getuserinfo, setUserinfo] = useState([]);

  const { userdata, setUserdata } = useContext(addData);
  const { upData, setUpData } = useContext(updateData);
  const { delData, setDelData } = useContext(deleteData);

  const getInfo = async () => {
    const res = await fetch("/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("Home get error");
    } else {
      setUserinfo(data);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const userDelete = async (id) => {
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
      setDelData(data2);
      getInfo();
    }
  };

  return (
    <div>
      {userdata ? (
        <div>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{userdata.name}</strong> added successfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
      ) : (
        ""
      )}
      {upData ? (
        <div>
          <div
            className="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            <strong>{upData.name}</strong> updated successfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
      ) : (
        ""
      )}
      {delData ? (
        <div>
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{delData.name}</strong> deleted successfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="mt-5">
        <div className="container">
          <div className="add-btn mb-3 mt-3">
            <NavLink to="/create" className="btn btn-primary">
              Add User
            </NavLink>
          </div>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">E-mail</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {getuserinfo.length === 0 ? (
                <h6 className="my-3">Empty!</h6>
              ) : (
                getuserinfo.map((obj, id) => {
                  return (
                    <>
                      <tr>
                        <td>{id + 1}</td>
                        <td>{obj.name}</td>
                        <td>{obj.email}</td>
                        <td>{obj.phone}</td>
                        <td>{obj.address}</td>
                        <td className="d-flex justify-content-between">
                          <NavLink
                            to={`/read/${obj._id}`}
                            className="btn btn-success mx-2"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </NavLink>
                          <NavLink
                            to={`/update/${obj._id}`}
                            className="btn btn-info mx-2"
                          >
                            <FontAwesomeIcon icon={faUserPen} />
                          </NavLink>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => userDelete(obj._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
