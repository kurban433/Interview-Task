let express = require('express');
let fs = require('fs');
let path = require("path");
let bodyParser = require("body-parser");
let fileUpload = require("express-fileupload");
let mongoose = require('mongoose');
let app = express();
let server = require("http").createServer(app);
app.use(fileUpload());
app.set("port", 8000);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

var model = require("./app/model/index")(mongoose);
var controller = require("./app/controller/index")(model);
require("./routes/index")(app, model, controller);

global.config = require("./config/constants.js");


let dbConnect = require("./config/database.js")(mongoose);
dbConnect.then(async (response) => {
    console.log(response);
}).catch((err) => {
    console.log("Database connection error: ", err);
});

server.listen(8000, function () {
    console.log("(---------------------------------)");
    console.log("|         Server Started...       |");
    console.log("|    " + config.baseUrl + "   |");
    console.log("(---------------------------------)");
});