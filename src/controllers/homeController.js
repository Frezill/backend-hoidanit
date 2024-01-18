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

const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    // let {email, name, city} = req.body;

    let [results, fields] = await connection.query(
        `INSERT INTO Users (email, name, city) VALUES(?, ?, ?)`, [email, name, city]
    );
    res.send('create user succeed !');
    console.log('>>>results:', results)
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

module.exports = {
    getHomepage,
    getABC,
    getHoiDanIt,
    postCreateUser,
    getCreatePage,
}