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


application.get("/fetchstudent", (request, response) => {
    mysqlConnection.query("SELECT * FROM Student where roll > 20", (err, rows, fields) => {
        if (!err) response.send(rows);
        else console.log(err);
    });
});


application.delete("/delete", (request, response) => {
    var id = request.body.id;
    var message = {
        Data: "",
    };
    mysqlConnection.query(
        "DELETE FROM Customer WHERE id = ?",
        [id],
        (err, rows, fields) => {
            if (!err)
                message["Data"] = "Deleted successfully!!!, 1 row(s) affected.";
            else message["Data"] = "Error Occured :(";
            response.json(message);
        }
    );
});
