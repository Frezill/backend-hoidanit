require('dotenv').config();
const express = require('express'); //declare express library
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');

const app = express(); //express application
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config template engine
configViewEngine(app);

//delare route
app.use('/', webRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})