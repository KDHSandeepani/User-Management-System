import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/editUser.css";

function EditUser() {
  const navigate = useNavigate();
  const { state } = useLocation();

  //const [form, setForm] = useState(state);
  const formatDate = (date) => {
  if (!date) return "";
  return date.split("T")[0];
  };

  const [form, setForm] = useState({
  ...state,
  dob: formatDate(state?.dob),
  confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateUser = () => {
    
  /*VALIDATIONS*/
    if (!form.first_name || !form.last_name) {
      alert("First name and Last name are required");
      return;
    }

    if (!form.dob) {
  	  alert("Please select Date of Birth");
  	return;
    }

    if (!form.gender) {
      alert("Please select Gender");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(form.phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(form.email)) {
      alert("Email must be a valid @gmail.com address");
      return;
    }

    const addressRegex = /^[a-zA-Z0-9\s,./-]{5,100}$/;
    if (!addressRegex.test(form.address)) {
      alert("Invalid address format");
    return;
    }

    if (!form.district) {
      alert("Please select District");
      return;
    }

    if (!form.parentName) {
  	alert("Enter Parent Name required");
  	return;
    }

    const parentPhonePattern = /^[0-9]{10}$/;
    if (!parentPhonePattern.test(form.parentPhone)) {
      alert("Parent phone number must be 10 digits");
      return;
    }

    if (!form.relationship) {
      alert("Please select Relationship");
      return;
    }

    const nicPattern = /^([0-9]{9}[vV]|[0-9]{12})$/;
    if (!nicPattern.test(form.nic)) {
      alert("NIC must be 9 digits + V or 12 digits");
      return;
    }

    if (!form.status) {
      alert("Please select User Status");
      return;
    }

    if (form.password && form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    /*if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }*/
    
    axios
      .put(`http://localhost:8081/api/users/${form.id}`, form)
      .then(() => {
        alert("User updated successfully ");
        navigate("/users");
      })
      .catch(() => alert("Update failed "));
  };

  return (
    <>
      <Sidebar />
      <div className="editUser-bg">
      <div className="editUser-container">
        <h2>Update Registration</h2>

        <h4>Basic Information</h4>
          <div className="row">
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <div className="row">
            <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

        <h4>Contact Information</h4>
          <div className="row">
            <input
             name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className="row">
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <select
              name="district"
              value={form.district}
              onChange={handleChange}
            >
              <option value="">District</option>
              <option>Ampara</option>
              <option>Anuradhapura</option>
              <option>Badulla</option>
              <option>Batticaloa</option>
              <option>Colombo</option>
              <option>Galle</option>
              <option>Gampaha</option>
              <option>Hambantota</option>
              <option>Jaffna</option>
              <option>Kalutara</option>
              <option>Kandy</option>
              <option>Kegalle</option>
              <option>Kilinochchi</option>
              <option>Kurunegala</option>
              <option>Mannar</option>
              <option>Matale</option>
              <option>Matara</option>
              <option>Monaragala</option>
              <option>Mullaitivu</option>
              <option>Nuwara Eliya</option>
              <option>Polonnaruwa</option>
              <option>Puttalam</option>
              <option>Ratnapura</option>
              <option>Trincomalee</option>
              <option>Vavuniya</option>
            </select>
          </div>

        <h4>Parent / Guardian Details</h4>
          <div className="row">
            <input
              name="parentName"
              value={form.parentName}
              onChange={handleChange}
              placeholder="Parent / Guardian Name"
            />
            <input
              name="parentPhone"
              value={form.parentPhone}
              onChange={handleChange}
              placeholder="Parent / Guardian Phone"
            />
          </div>
            <select
              name="relationship"
              value={form.relationship}
              onChange={handleChange}
            >
              <option value="">Relationship</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Guardian</option>
            </select>

        <h4>Additional Recommended Fields</h4>
          <div className="row">
            <input
              name="nic"
              value={form.nic}
              onChange={handleChange}
              placeholder="NIC"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="">User Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="row">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>

        <div className="btn-row">
          <button className="btn-save" onClick={updateUser}>
            Save
          </button>
          <button
            className="btn-cancel"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default EditUser;