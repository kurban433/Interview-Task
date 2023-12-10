module.exports = function (app, model, controller) {

    var middleware = require('../app/middleware/index')(model);
    var validation = require('../app/validator/index')(model);

}