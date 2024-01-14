const express = require('express'); //declare express library
const path = require('path');
require('dotenv').config();

const app = express(); //express application
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// config static file
app.use(express.static(path.join(__dirname, 'public')))

//declare route
app.get('/', (req, res) => {
  res.send('Hello World with Phat!')
})

app.get('/abc', (req, res) => {
  res.send('check ABC')
})

app.get('/hoidanit', (req, res) => {
  // res.send('<h1>Hello Hoidanit</h1>')
  res.render('sample.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})