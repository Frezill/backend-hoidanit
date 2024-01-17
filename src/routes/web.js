//belong to router folder

const express = require('express');
const {getHomepage,
        getABC,
        getHoiDanIt,} = require('../controllers/homeController')
const router = express.Router(); 

//declare route
router.get('/', getHomepage);
router.get('/abc', getABC);
router.get('/hoidanit', getHoiDanIt);

module.exports = router;