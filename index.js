// initial setup of application
const express = require('express');
const app = express();

// mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/node-blog");

// body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//routes
app.get('/', (req, res) => {
    res.render('index');
});

// app.listen
app.listen(3005, () => {
    console.log('Server listening on 3005.');
})