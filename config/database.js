let mongoose = require('mongoose');
module.exports = async function () {
    let dbconnect = new Promise((resolve, reject) => {
        var url = "mongodb://localhost:27017/DB_FMCG";

        mongoose.set('debug', false);
        let options = {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        }

        mongoose.connect(url, options).
            then(async () => {
                resolve('Database connected successfully...');
            }).catch(err => {
                reject('Database connection error')
            })
    });
    return dbconnect;
}