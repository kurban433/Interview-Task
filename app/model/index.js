module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var module = {};
    module.User = require('./user')(mongoose, Schema);
    module.User = require('./product')(mongoose, Schema);
    return module;
}