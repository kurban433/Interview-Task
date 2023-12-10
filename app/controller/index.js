module.exports = function (model) {
    var module = {};
    
    module.admin = require('./adminController')(model);
    module.user = require('./userController')(model); 

    return module;
}