const express = require('express');
const router = express.Router();
const mysql = require('mysql')

// jwt
const jwt = require('jsonwebtoken');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api'
});

// user get api
router.get('/users', (req, res) => {
    con.query('SELECT * FROM users', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
   
});

// user get api with id
router.get('/users/:id', (req, res) => {
    con.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// users post api with username and password
router.post('/users', (req, res) => {
    if(!req.body.username || !req.body.password) return res.sendStatus(422);
    con.query('INSERT INTO users (username, password) VALUES (?, ?)', [req.body.username, req.body.password], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// users delete api
router.delete('/users/:id', verifyToken ,(req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            con.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
                if (err) throw err;
                res.json({
                    message: 'User deleted successfully',
                    authData
                })
            });
        }
    });
});

// users update api
router.put('/users/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            con.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [req.body.username, req.body.password, req.params.id], (err, result) => {
                if (err) throw err;
                res.json({
                    message: 'User updated successfully',
                    authData
                })
            });
        }
    });


});

// users patch password api
router.patch('/users/:id', verifyToken,(req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            con.query('UPDATE users SET password = ? WHERE id = ?', [req.body.password, req.params.id], (err, result) => {
                if (err) throw err;
                res.json({
                    message: 'User updated successfully',
                    authData
                })
            });
        }
    });

  
});





// user login
router.post('/users/login', verifyToken, (req, res) => {
    con.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const token = jwt.sign({ id: result[0].id }, 'secretkey', { expiresIn: '1h' });
            res.json({
                token,
                user: result[0]
            });
        } else {
            res.send('Username or password is incorrect');
        }
    });
});




//jwt middleware
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}



module.exports = router;