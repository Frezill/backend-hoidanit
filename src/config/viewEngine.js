const express = require('express');
const path = require('path');

const configViewEngine = (app) => {
    app.set('views', path.join('./src', 'views')); //?
    app.set('view engine', 'ejs');

    // config static file
    app.use(express.static(path.join('./src', 'public')));
}
let x = path.join('./src', 'views');
// console.log(">>>> path", x);
module.exports = configViewEngine;