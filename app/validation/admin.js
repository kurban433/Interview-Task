let Joi = require('joi')
module.exports = function (model) {
    var module = {};

    /* Login */
    module.adminLogin = function (req, res, next) {

        try {
            // console.log('yes');
            let addPlayerObj = Joi.object({
                email: Joi.string().empty().email().required().messages({
                    'string.empty': "Email can't be an empty",
                    'string.email': "Email is not valid",
                    'string.required': "Email must be required",
                }),
                password: Joi.string().empty().min(3).max(20).required().messages({
                    'string.empty': "Email can't be an empty",
                    'string.min': "Your password must be least 3 characters long",
                    'string.max': "Your password cannot exceed 20 characters",
                    'string.required': "Password must be required",
                })
            });

            const { error, value } = addPlayerObj.validate(req.body, {
                abortEarly: false,
            });

            if (error) {
                console.log("error", error);
                return res.send({
                    status: "fail",
                    result: {},
                    message: error.message
                });
            }

            next()

        } catch (error) {
            console.log("adminLogin validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }

    }

    module.userList = function (req, res, next) {

        try {
            console.log(">>>>", req.body);
            let userList = Joi.object({
                start: Joi.number().empty().required().messages({
                    'string.empty': "Email can't be an empty",
                    'string.required': "Email must be required",
                }),
                length: Joi.number().empty().required().messages({
                    'string.empty': "Email can't be an empty",
                    'string.required': "Password must be required",
                }),
            });

            const { error, value } = userList.validate(req.body, {
                abortEarly: false,
            });

            if (error) {
                console.log("error", error);
                return res.send({
                    status: "fail",
                    result: {},
                    message: error.message
                });
            }

            next()

        } catch (error) {
            console.log("userList validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }

    }

    return module
}