const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const router = express.Router();
const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// const querystring = require('querystring');
// const Article = require('./users').Article;

router.get(('/home'), (req, res) => {
    res.sendFile(__dirname + "/" + "home.html");
})

app.get('/users/', (req, res) => {
    uid = req.query['uid']
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        for(let x=0;x<data.length;x++) {
            if(data[x]['id']==uid) {
                res.end(JSON.stringify(data[x]['id'] + data[x]['name']), ',', '4')
            }
        }
    })
})


router.get(('/users/all'), (req, res) => {
    fs.readFile(__dirname + '/users.json', 'utf8', (err, data) => {
        res.end(data, null, '\t');
    });
})

console.log("helloWorld")

app.use('/', router);
app.listen(process.env.port || 8081);