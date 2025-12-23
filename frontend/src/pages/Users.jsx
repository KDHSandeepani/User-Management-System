import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/users.css";
import { useNavigate } from "react-router-dom";

function Users() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    district: "",
    status: ""
  });

  const loadUsers = () => {
    axios.get("http://localhost:8081/api/users", {
      params: {
        search,
        gender: filters.gender,
        district: filters.district,
        status: filters.status
      }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.log(err));
  };

  /*CLEAR SEARCH*/
  const clearSearch = () => {
    setSearch("");
    setFilters({
      gender: "",
      district: "",
      status: ""
    });

    /*Reload all users*/
    axios
      .get("http://localhost:8081/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadUsers();
  }, []); 

    /* DELETE USER */
  const deleteUser = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return; 
    }

    axios.delete(`http://localhost:8081/api/users/${id}`)
      .then(() => {
        alert("User deleted successfully");
        loadUsers();
      })
      .catch(err => {
        console.log(err);
        alert("Delete failed");
      });
  };

  return (
    <>
      <Sidebar />

      <div className="users-page">
        <h2>View Users</h2>
          <div className="search-bar">

          <input
            type="text"
            placeholder="Search name, NIC, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="btn-search" onClick={loadUsers}>
             Search
          </button>
          <br></br><br></br><br></br>

          <select
            value={filters.gender}
            onChange={e => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            value={filters.district}
            onChange={e => setFilters({ ...filters, district: e.target.value })}
          >
            <option value="">District</option>
            <option value="Ampara">Ampara</option>
            <option value="Anuradhapura">Anuradhapura</option>
            <option value="Badulla">Badulla</option>
            <option value="Batticaloa">Batticaloa</option>
            <option value="Colombo">Colombo</option>
            <option value="Galle">Galle</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Hambantota">Hambantota</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Kalutara">Kalutara</option>
            <option value="Kandy">Kandy</option>
            <option value="Kegalle">Kegalle</option>
            <option value="Kilinochchi">Kilinochchi</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Mannar">Mannar</option>
            <option value="Matale">Matale</option>
            <option value="Matara">Matara</option>
            <option value="Monaragala">Monaragala</option>
            <option value="Mullaitivu">Mullaitivu</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
            <option value="Polonnaruwa"> Polonnaruwa</option>
            <option value="Puttalam">Puttalam</option>
            <option value="Ratnapura">Ratnapura</option>
            <option value="Vavuniya">Vavuniya</option>
          </select>

          <select
            value={filters.status}
            onChange={e => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button className="btn-filter" onClick={loadUsers}>
             Filter
          </button>

          <button className="btn-clear" onClick={clearSearch}>
             Clear
          </button>
        </div>
        
        {/* VIEW LIST*/}
        <h3>View List</h3>
          <table className="users-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>NIC</th>
                <th>Phone</th>
                <th>District</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.nic}</td>
                  <td>{user.phone}</td>
                  <td>{user.district}</td>
                  <td>{user.gender}</td>
                  <td>{user.status}</td>
                  <td>
                    <button className="btn-view" onClick={() => navigate("/view-user", { state: user })}>View</button>
                    <button className="btn-edit" onClick={() => navigate("/edit-user", { state: user })}>Edit</button>
                    <button className="btn-delete" onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;