require('dotenv').config(); //config dotenv
const express = require('express'); //declare express library
const path = require('path');//static file
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const fileUpload = require('express-fileupload');

const connection = require('./config/database');
const mongoose = require('mongoose');

const app = express(); //express application
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config file upload
app.use(fileUpload());

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

//delare route
app.use('/', webRoutes);
app.use('/v1/api', apiRoutes);
//self running function
(async () => {
  //test connection
  try {
    await connection();
    app.listen(port, () => {
      console.log(`Backend app listening on port ${port}`)
    })
  } catch (error) {
    console.log(">>>>>error connect to db", error)
  }
})()


