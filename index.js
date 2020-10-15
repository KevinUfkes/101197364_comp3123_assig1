const express = require('express');
const fs = require('fs');
const router = express.Router();
const app = express();
var merge = require('./mergeSort');

router.get(('/home'), (req, res) => {
    res.sendFile(__dirname + "/" + "home.html");
})

app.get('/user/', (req, res) => {
    uid = req.query['uid']
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        for(let x=0;x<data.length;x++) {
            if(data[x]['id']==uid) {
                var returnObj = {  
                    "id": data[x].id, 
                    "name": data[x].name,
                    "email": data[x].email,
                    "address": data[x].address.street + ", " + data[x].address.city + ", " + data[x].address.zipcode,
                    "phone": data[x].phone
                }
                res.end(JSON.stringify(returnObj, 0, 4));
            }
        }
    })
})

router.get(('/users/all'), (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        data.sort(function (a, b) {
            return a.username.localeCompare(b.username);
        });
        res.end(JSON.stringify(data, 0, 4));
    });
})

app.use('/', router);
app.listen(process.env.port || 8081);