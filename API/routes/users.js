const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const hash = require('crypto')
// jwt
const jwt = require('jsonwebtoken');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api'
});

// user get route
router.get('/users', (req, res) => {
    con.query('SELECT username FROM users', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
   
});

// user get route with id
router.get('/users/:id', (req, res) => {
    if(!req.body.password) return res.sendStatus(422);
    con.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        if (result[0].password == hashPassword(req.body.password)) {

            res.send(result[0].username);
        } else {
            res.send("You do not have the right access!");
        }
    });
});

// users post route with username and password
router.post('/users', (req, res) => {
    if(!req.body.username || !req.body.password) return res.sendStatus(422);
    con.query('INSERT INTO users (username, password) VALUES (?, ?)', [req.body.username, hashPassword(req.body.password)], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// users delete route
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

// users update route
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

// users patch password route
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
    console.log(hashPassword(req.body.password))
    con.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.username, hashPassword(req.body.password)], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const token = jwt.sign({ id: result[0].id }, 'secretkey', { expiresIn: '1h' });
            res.json({
                token
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

// hash function
function hashPassword(password) {
    return hash.createHash('sha256').update(password).digest('hex');
}


module.exports = router;