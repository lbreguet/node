let express = require('express');
let morgan = require('morgan');

let app = express();

app.use(morgan('combined'));

app.use(express.json())

app.get('/welcome/:msgId', (req, res, next) => { 
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'application/json'); 
    let msg = {
        "1": "Hello",
        "2": "Bye",
        "3": "Sky"
    }
    res.json({ message: msg[ req.params.msgId ] || "Unknown"});
    res.end(); 
});

app.post('/welcome', (req, res, next) => { 
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'application/json'); 
    res.json({ id: 3, message: req.body.message + " was successfully added" }); 
    res.end();
});

module.exports = app;
