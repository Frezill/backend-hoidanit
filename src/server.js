require('dotenv').config(); //config dotenv
const express = require('express'); //declare express library
const path = require('path');//static file
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const fileUpload = require('express-fileupload');

const connection = require('./config/database');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

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
    //using mongoose
    // await connection();

    //using mongodb driver
    // Connection URL
    const url = process.env.DB_HOST_WITH_DRIVER;
    const client = new MongoClient(url);
    // Database Name
    const dbName = process.env.DB_NAME;

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('customers');
    // let a = await collection.findOne({name: "Hoi Dan IT"});
    // console.log(">> find: ", a);

    collection.insertOne({
      "name": "Le Thanh Phat",
      "phone number": "0395778055",
      address: {
        province: "Hau Giang",
        country: {
          name: "Viet Nam",
          code: 65700
        }
      }
    })


    //////////////////////////////
    app.listen(port, () => {
      console.log(`Backend app listening on port ${port}`)
    })
  } catch (error) {
    console.log(">>>>>error connect to db", error)
  }
})()


