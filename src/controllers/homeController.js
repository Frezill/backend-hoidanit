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
    res.send('created a new user');
    console.log('>>>req.body:', req.body);
}

module.exports = {
    getHomepage,
    getABC,
    getHoiDanIt,
    postCreateUser,
}