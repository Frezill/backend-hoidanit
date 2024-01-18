const connection = require('../config/database')

const getHomepage = (req, res) => {

    return res.render('home.ejs')
}

const getABC = (req, res) => {
    res.send('check ABC');
}

const getHoiDanIt = (req, res) => {
    res.render('sample.ejs');
}

const postCreateUser = (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    // let {email, name, city} = req.body;

    connection.query(
        `INSERT INTO Users(email, name, city)
        VALUES(?, ?, ?)`,
        [email, name, city],
        function (err, results) {
            res.send('create user succeed!');
        }
    );
}

module.exports = {
    getHomepage,
    getABC,
    getHoiDanIt,
    postCreateUser,
}