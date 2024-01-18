//belong to router folder

const express = require('express');
const {getHomepage,
        getABC,
        getHoiDanIt,
        postCreateUser,} = require('../controllers/homeController')
const router = express.Router(); 

//declare route
router.get('/', getHomepage);
router.get('/abc', getABC);
router.get('/hoidanit', getHoiDanIt);

router.post('/create-user', postCreateUser);


module.exports = router;