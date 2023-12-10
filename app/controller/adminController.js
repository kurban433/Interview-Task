let bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');

module.exports = function (model) {
    var module = {};

    module.adminLogin = async function (request, response) {
        try {

            let { email, password } = request.body

            let adminData = await model.User.findOne({
                email: email,
                role: "admin"
            })

            if (!adminData) {
                let adminCount = await model.User.find({ role: "admin" })
                if (!adminCount.length) {
                    await model.User.create({
                        email: "admin@gmail.com",
                        password: bcrypt.hashSync('123456', bcrypt.genSaltSync(8), null),
                        role: "admin"
                    })
                }
                return response.send({
                    status: "fail",
                    result: {},
                    message: "Email invalid",
                    statusCode: 401,
                });
            }

            if (!bcrypt.compareSync(password, adminData.password)) {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "Invalid credentials!",
                    statusCode: 401,
                });
            }
            var token = jwt.sign({ data: adminData._id }, config.jwt_secret, { expiresIn: config.jwt_expire });

            adminData.jwtLoginToken = token
            await model.User.updateOne({ _id: adminData._id }, {
                jwtLoginToken: token
            })

            return response.send({
                status: "success",
                result: adminData,
                message: "Login Successfully",
                statusCode: 200,
            });

        } catch (error) {
            console.log("error", error);
            return response.send({
                status: "fail",
                result: null,
                message: "Something went wrong",
                statusCode: 401,
            });
        }
    }

    module.getUserList = async function (request, response) {
        try {

            console.log("??", request.body);

            let { start, length, search } = request.body

            let query = {
                isDelete: false,
            }

            if (search) {
                query["$or"] = [
                    { username: { $regex: ".*" + search + ".*", $options: "i" } },
                    { email: { $regex: ".*" + search + ".*", $options: "i" } },
                ]
            }

            let userlist = await model.User.find().skip(start)
                .limit(length)
                .sort({ createdAt: -1 })
                .lean();

            return response.send({
                status: "success",
                result: userlist,
                message: "User List",
                statusCode: 200,
            });

        } catch (error) {
            console.log("error", error);
            return response.send({
                status: "fail",
                result: null,
                message: "Something went wrong",
                statusCode: 401,
            });
        }
    }

    return module

}