const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_management"
});

/*DASHBOARD SUMMARY*/
router.get("/summary", (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS total,
      SUM(status = 'Active') AS active,
      SUM(status = 'Inactive') AS inactive
    FROM users
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

/*MONTHLY USERS*/
router.get("/monthly", (req, res) => {
  const sql = `
    SELECT MONTH(created_at) AS month, COUNT(*) AS count
    FROM users
    GROUP BY MONTH(created_at)
    ORDER BY month
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;