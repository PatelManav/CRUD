const details = require("./connect.js");

const express = require("express");

const bodyparser = require("body-parser");

const mysql = require("mysql");

var application = express();

application.use(bodyparser.json());

var mysqlConnection = mysql.createConnection(details);

mysqlConnection.connect((err) => {
  if (!err) console.log("Connected Successfully!!!");
  else console.log(err);
});

application.listen(3003, () => {
  console.log("server is running!!!");
});

application.get("/fetchinfo", (request, response) => {
  mysqlConnection.query("SELECT * FROM Customer", (err, rows, fields) => {
    if (!err) response.send(rows);
    else console.log(err);
  });
});

application.post("/post", (request, response) => {
  var id = request.body.id;
  var message = {
    Data: "",
  };
  mysqlConnection.query(
    "SELECT * FROM Customer WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) message["Data"] = "Perfect match!!!";
      else message["Data"] = "error occured :(";
      response.json(message);
    }
  );
});
