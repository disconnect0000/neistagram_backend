const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "aws.connect.psdb.cloud",
  user: "9wz5zhi97ie9889hyrz3",
  password: "pscale_pw_TKnRJdPXVRJ83ZfcbhJV3cIIlt7TKiDtSIXl9pJBqCM",
  database: "ne-instagram-database",
});

app.post("/users/register", (req, res) => {
  const sql1 = "SELECT * FROM `users` WHERE `username` = (?)";
  db.query(sql1, [req.body.username], (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data.length > 0) {
      return res.json("Taken");
    } else {
      const sql = "INSERT INTO users (`username`, `password`) VALUES (?)";
      const values = [req.body.username, req.body.password];
      db.query(sql, [values], (err, data) => {
        if (err) {
          return res.json(err);
        }
        return res.json(data);
        d;
      });
    }
  });
});

app.post("/users/login", (req, res) => {
  const sql = "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?";
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data.length > 0) {
      return res.json("Succes");
    } else {
      return res.json("Failure");
    }
  });
});

app.post("/upload", (req, res) => {
  const sql =
    "INSERT INTO `posts`( `title`, `description`, `username`) VALUES (?)";
  const values = [req.body.postName, req.body.postDesc, req.body.username];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    if (data.length > 0) {
      return res.json(data);
    }
  });
});

app.get("/upload", (req, res) => {
  const sql = "SELECT * FROM `posts`";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.json(data);
  });
});

app.post("/delete", (req, res) => {
  const sql = "DELETE FROM `posts` WHERE id = ?";
  db.query(sql, [req.body.postId], (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.json(data);
  });
});

app.post("/user", (req, res) => {
  console.log(req.body);
  const sql = "SELECT * FROM posts WHERE username = ? ";
  db.query(sql, [req.body.username], (err, data) => {
    if (err) {
      console.log(console.log(err));
    }
    return res.json(data);
  });
});

app.listen(3001, (req, res) => {
  console.log("listening");
});
