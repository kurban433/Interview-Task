module.exports = function (app, model, controller) {

    var middleware = require('../app/middleware/index')(model);
    var validation = require('../app/validation/index')(model);

    app.post('/admin', validation.admin.adminLogin, controller.admin.adminLogin);

    app.post('/userList',validation.admin.userList, middleware.admin.isLogin, controller.admin.getUserList);

}