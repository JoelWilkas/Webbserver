// express
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// jwt
const jwt = require('jsonwebtoken');

// routers
const users = require('./routes/users');
app.use('/', users);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.listen(8080)