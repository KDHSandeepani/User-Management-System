const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const usersRoutes = require("./routes/usersRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_management"
});

db.connect((err) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("MySQL Connected");
  }
});

/*REGISTER*/
app.post("/user_management", (req, res) => {
  console.log("REGISTER DATA:", req.body);

  const data = req.body;

  const sql = `
    INSERT INTO users
    (first_name, last_name, dob, gender, phone, email, address, district,
     parentName, parentPhone, relationship, nic, status, password)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(sql, [
    data.first_name,
    data.last_name,
    data.dob,
    data.gender,
    data.phone,
    data.email,
    data.address,
    data.district,
    data.parentName,
    data.parentPhone,
    data.relationship,
    data.nic,
    data.status,
    data.password
  ], (err, result) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.status(500).json({ message: "Register Failed" });
    }

    res.json({ message: "Register Success" });
  });
});

/*LOGIN*/
app.post("/login", (req, res) => {
  console.log("LOGIN DATA:", req.body);

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log("LOGIN ERROR:", err);
      return res.status(500).json({ message: "Server Error" });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        message: "Login Success",
        user: result[0]
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }
  });
});

app.use("/api/users", usersRoutes);

/*DASHBOARD*/
app.use("/api/dashboard", dashboardRoutes);

/*SERVER*/
app.listen(8081, () => {
  console.log("Server running on port 8081");
});