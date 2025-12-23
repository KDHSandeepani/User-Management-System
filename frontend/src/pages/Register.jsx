import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();

  const initialFormData = {
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    parentName: "",
    parentPhone: "",
    relationship: "",
    nic: "",
    status: "",
    password: "",
    confirmPassword: ""
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  /*VALIDATIONS*/
    if (!formData.first_name || !formData.last_name) {
      alert("First name and Last name are required");
      return;
    }
    
    if (!formData.dob) {
  	alert("Please select Date of Birth");
  	return;
    }

    if (!formData.gender) {
      alert("Please select Gender");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(formData.email)) {
      alert("Email must be a valid @gmail.com address");
      return;
    }

    const addressRegex = /^[a-zA-Z0-9\s,./-]{5,100}$/;
    if (!addressRegex.test(formData.address)) {
      alert("Invalid address format");
    return;
    }

    if (!formData.district) {
      alert("Please select District");
      return;
    }

    if (!formData.parentName) {
  	alert("Enter Parent Name required");
  	return;
    }

    const parentPhonePattern = /^[0-9]{10}$/;
    if (!parentPhonePattern.test(formData.parentPhone)) {
      alert("Parent phone number must be 10 digits");
      return;
    }

    if (!formData.relationship) {
      alert("Please select Relationship");
      return;
    }

    const nicPattern = /^([0-9]{9}[vV]|[0-9]{12})$/;
    if (!nicPattern.test(formData.nic)) {
      alert("NIC must be 9 digits + V or 12 digits");
      return;
    }

    if (!formData.status) {
      alert("Please select User Status");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8081/user_management",
        formData
      );

      alert(" Registration Successful");
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert(" Registration Failed");
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <h1>User Management System</h1>
          <h3>User Registration</h3>

            <form onSubmit={handleSubmit} className="grid-form">

              <p>Basic Information</p><br />

                <input
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                />  
                <input
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

              <p>Contact Information</p><br />

                <input
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <select
                  name="district"
                  value={formData.district}
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

              <p>Parent / Guardian Details</p><br />

                <input
                  name="parentName"
                  placeholder="Parent / Guardian Name"
                  value={formData.parentName}
                  onChange={handleChange}
                />
                <input
                  name="parentPhone"
                  placeholder="Parent / Guardian Phone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                />
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                >
                  <option value="">Relationship</option>
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Guardian</option>
                </select>
                  <br></br>
          
              <p>Additional Recommended Fields</p><br />

                <input
                  name="nic"
                  placeholder="NIC"
                  value={formData.nic}
                  onChange={handleChange}
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">User Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

            <div className="btn-group full">
            <button type="submit" className="btn-primary">
              Save
            </button>
              &nbsp;
            <button
              type="button"
              className="btn-outline"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;