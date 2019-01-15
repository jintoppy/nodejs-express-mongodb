const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
mongoose.connect('mongodb://admin:test123@ds033484.mlab.com:33484/angular-db');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    User
        .find()
        .exec((err, users) => {
            if(err){
                return res.status(500).send(err);    
            }
            res.json(users);
        });
});

app.post('/createuser', (req, res) => {
    const newUserRequest = req.body;
    const newUser = new User(newUserRequest);
    newUser.save(err => {
        if(err){
            return res.status(500).send(err);
        }
        res.send({message: 'success'});
    });    
});


app.listen(4500);