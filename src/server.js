require('dotenv').config(); //config dotenv
const express = require('express'); //declare express library
const path = require('path');//static file
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const connection = require('./config/database');

const app = express(); //express application
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

connection.query(
  'select * from Users u',
  function (err, results, fields) {
    console.log(">>>>result: ", results); // results contains rows returned by server
  }
);

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

//delare route
app.use('/', webRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})