const connection = require("../config/database");

const getAllUsers = async (req, res) => {
    let [results, fields] = await connection.query('select * from Users');
    return results;
}

module.exports = {
    getAllUsers,

}