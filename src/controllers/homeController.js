const connection = require('../config/database')
const { getAllUsers, getUserById, updateUserById } = require('../services/CRUDService')

const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home.ejs', { listUsers: results })
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

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;

    let user = await getUserById(userId);

    res.render('edit.ejs', { userEdit: user });
}

const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;
    // let {email, name, city} = req.body;
    // console.log(">>>> email = ", email, 'name = ', name, 'city = ', city, 'userId: ', userId);

    await updateUserById(email, name, city, userId);

    // res.send('Updated user succeed !');
    res.redirect('/');
}

module.exports = {
    getHomepage,
    getABC,
    getHoiDanIt,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
}