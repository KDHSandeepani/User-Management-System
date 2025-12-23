import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/viewUser.css";

function ViewUser() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = state;

  if (!user) {
    return <h3 style={{ padding: "20px" }}>No user data found</h3>;
  }

  return (
    <>
      <Sidebar />
      <div className="viewuser-bg">
      <div className="viewuser-container">
        <h2>User Details</h2>

          <h4>Basic Information</h4>
            <div className="row">
              <input value={user.first_name} disabled />
              <input value={user.last_name} disabled />
            </div>

            <div className="row">
              <input value={user.dob ? new Date(user.dob).toISOString().split("T")[0] : ""} disabled/>
              <input value={user.gender} disabled />
            </div>

          <h4>Contact Information</h4>
            <div className="row">
              <input value={user.phone} disabled />
              <input value={user.email} disabled />
            </div>

            <div className="row">
              <input value={user.address} disabled />
              <input value={user.district} disabled />
            </div>

          <h4>Parent / Guardian Details</h4>
            <div className="row">
              <input value={user.parentName} disabled />
              <input value={user.parentPhone} disabled />
            </div>

            <input value={user.relationship} disabled />

          <h4>Additional Recommended Fields</h4>
            <div className="row">
              <input value={user.nic} disabled />
              <input value={user.status} disabled />
            </div>

            <div className="row">
              <input value={user.password} disabled />
              <input value={user.password} disabled />
            </div>

            <div className="btn-row">
              <button
                className="btn-save"
                onClick={() => navigate("/edit-user", { state: user })}
              >
                Edit User
              </button>

              <button
                className="btn-cancel"
                onClick={() => navigate("/users")}
              >
                Back
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default ViewUser;