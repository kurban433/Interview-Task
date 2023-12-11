let express = require('express');
let fs = require('fs');
let path = require("path");
let bodyParser = require("body-parser");
let fileUpload = require("express-fileupload");
let mongoose = require('mongoose');
let swaggerUi = require("swagger-ui-express")
let swaggerJSDoc = require("swagger-jsdoc");

const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd() + "/swagger.css"), 'utf8');


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


let swagggerOption = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Typepe APIs Collection",
            version: '1.0.0'
        },
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            }
        },
        servers: [
            {
                url: config.baseUrl,
            }
        ]
    },
    // apis : ['./app/controllers/admin/auth.js']
    apis: ['./app.js']
}

const swaggerSpec = swaggerJSDoc(swagggerOption);
app.use('/api-collection', swaggerUi.serve, swaggerUi.setup(swaggerDocument, customCss))


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