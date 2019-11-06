let express = require('express');
let morgan = require('morgan');

let app = express();

app.use(morgan('combined'));

app.use('/about', (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><p>About</p></body></html>');
});

app.use('/home', (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><p>Homepage</p></body></html>');
});

app.use('/welcome', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    let msg = {
        message: "Hello"
    }
    res.json(msg);
    res.end();
});

//app.listen(8080, '0.0.0.0');
module.exports = app