// initial setup of application
const express = require('express');
const app = express();

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