const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const todoList = require('./../middlle/TodoList');
const userList = require('./../middlle/UserList');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// URLでRooting
app.use("/todoList",todoList);
app.use("/userList",userList);

// Port
app.listen(4000, function () {
});
