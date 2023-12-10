module.exports = function (app, model, controllers) {

	require('./admin.js')(app, model, controllers.admin);
	require('./user.js')(app, model, controllers.admin);

}