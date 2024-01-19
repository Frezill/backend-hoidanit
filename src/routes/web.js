//belong to router folder

const express = require('express');
const { getHomepage,
    getABC,
    getHoiDanIt,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser, } = require('../controllers/homeController')
const router = express.Router();

//declare route
router.get('/', getHomepage);
router.get('/abc', getABC);
router.get('/hoidanit', getHoiDanIt);
router.get('/create', getCreatePage);
router.get('/update/:id', getUpdatePage);

router.post('/create-user', postCreateUser);
router.post('/update-user', postUpdateUser);

module.exports = router;