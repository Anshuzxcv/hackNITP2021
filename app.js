const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');

const homeRouter = require('./router/homeRouter');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use('/',homeRouter);

app.all('*', (req, res, next) => {
  res.send('<html><head><title>500 Internal Server Error</title></head><body bgcolor="white"><center><h1>500 Internal Server Error</h1></center><hr><center>covid19pr.com <br>website in development mode plase contact :9521416346 (Anshu Kumar)</center></body></html>');
});

module.exports = app;