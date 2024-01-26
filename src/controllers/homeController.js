const connection = require('../config/database')
const { getAllUsers, getUserById, updateUserById, deleteUserById, createUser, } = require('../services/CRUDService')
const User = require('../models/user')


const getHomepage = async (req, res) => {
    let results = await User.find({});
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
    // await createUser(email, name, city);
    await User.create({
        email: email,
        name: name,
        city: city,
    })

    res.redirect('/')
    // res.send('create user succeed !');
    // console.log('>>>results:', results)
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id;

    // let user = await getUserById(userId);
    let user = await User.findById(userId).exec();;
    res.render('edit.ejs', { userEdit: user });
}

const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;
    // let {email, name, city} = req.body;
    // console.log(">>>> email = ", email, 'name = ', name, 'city = ', city, 'userId: ', userId);

    // await updateUserById(email, name, city, userId);

    await User.updateOne({ _id: userId }, { name: name, email: email, city: city });
    // res.send('Updated user succeed !');
    res.redirect('/');
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let user = await User.findById(userId).exec();

    res.render('delete.ejs', { userEdit: user });
}

const postHandleRemoveUser = async (req, res) => {
    let userId = req.body.userId;
    // await deleteUserById(userId);
    await User.deleteOne({ _id: userId });
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
    postDeleteUser,
    postHandleRemoveUser,
}