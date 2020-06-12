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

application.put("/insert", (request, response) => {
  var id = request.body.id;
  var name = request.body.name;
  var price = request.body.price;
  var message = {
    Data: "",
  };
  mysqlConnection.query(
    "INSERT INTO Customer VALUES(?,?,?)",
    [id, name, price],
    (err, rows, fields) => {
      if (!err) message["Data"] = "Insertions successfully, 1 row(s) affected.";
      else message["Data"] = "Problem Occured, 0 row(s) affected.";
      response.json(message);
    }
  );
});
