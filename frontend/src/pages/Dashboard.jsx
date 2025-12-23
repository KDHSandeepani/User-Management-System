import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import "../styles/dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });

  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/dashboard/summary")
      .then(res => setStats(res.data))
      .catch(err => console.log(err));

    axios.get("http://localhost:8081/api/dashboard/monthly")
      .then(res => setMonthly(res.data))
      .catch(err => console.log(err));
  }, []);

  const barData = {
    labels: monthly.map(m => `Month ${m.month}`),
    datasets: [{
      label: "User Registrations",
      data: monthly.map(m => m.count),
      backgroundColor: "#4f46e5"
    }]
  };

  const pieData = {
    labels: ["Active", "Inactive"],
    datasets: [{
      data: [stats.active, stats.inactive],
      backgroundColor: ["#22c55e", "#ef4444"]
    }]
  };

  return (
    <>
      <Sidebar />
      <div className="dashboard" style={{ marginLeft: "220px" }}>
        <h3>Dashboard</h3>

        <div className="cards">
          <div className="card blue">
            <h3>Total Users</h3>
            <p>{stats.total}</p>
          </div>

          <div className="card green">
            <h3>Active Users</h3>
            <p>{stats.active}</p>
          </div>

          <div className="card red">
            <h3>Inactive Users</h3>
            <p>{stats.inactive}</p>
          </div>
        </div>

        <div className="charts">
          <div className="chart">
            <h4>User Registrations</h4>
            <Bar data={barData} />
          </div>

          <div className="chart">
            <h4>User Status Overview</h4>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;