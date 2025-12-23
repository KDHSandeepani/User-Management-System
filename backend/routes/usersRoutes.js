const express = require("express");
const router = express.Router();
const db = require("../db");

/*GET USERS (Search + Filter)*/
router.get("/", (req, res) => {
  const { search, gender, district, status } = req.query;

  let sql = "SELECT * FROM users WHERE 1=1";
  let params = [];

  if (search) {
    sql += `
      AND (
        first_name LIKE ? OR
        last_name LIKE ? OR
        nic LIKE ? OR
        phone LIKE ? OR
        email LIKE ?
      )
    `;
    const s = `%${search}%`;
    params.push(s, s, s, s, s);
  }

  if (gender) {
    sql += " AND gender=?";
    params.push(gender);
  }

  if (district) {
    sql += " AND district=?";
    params.push(district);
  }

  if (status) {
    sql += " AND status=?";
    params.push(status);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/*DELETE USER*/
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Delete failed" });
    }

    res.json({ message: "User deleted successfully" });
  });
});

/*UPDATE USER*/
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const sql = `
    UPDATE users SET
      first_name=?,
      last_name=?,
      dob=?,
      gender=?,
      phone=?,
      email=?,
      address=?,
      district=?,
      parentName=?,
      parentPhone=?,
      relationship=?,
      nic=?,
      status=?,
      password=?
    WHERE id=?
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
    data.password,
    id
  ], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User Updated" });
  });
});

module.exports = router;