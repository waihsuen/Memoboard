/* eslint-disable no-console */

const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
// var path = require('path');
var cors = require('cors');
const uuidv4 = require('uuid/v4');
const LocalStorage = require('node-localstorage').LocalStorage;

var localStorage = new LocalStorage('./scratch');
// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200,
// }

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let data = [];
if (localStorage.getItem('data')) {
    data = JSON.parse(localStorage.getItem('data'));
}

// Serve the files on port 3000.
const server = app.listen(port, function () {
    console.log(`We started a server at port ${server.address().port} \n`);
});

app.get('/', function (req, res) {
    res.status(200).send('API');
});

app.get('/viewlist', function (req, res) {
    res.status(200).send(JSON.stringify(data));
});

app.get('/refreshlist', function (req, res) {
    data = [];
    //let date_ob = new Date();
    let ts = Date.now();

    for (let i = 0; i < 10; i++) {
        const item = {
            id: uuidv4(),
            created_date: ts.toString(),
            title: `Title ${i}`,
            body: `${i}:No - idea`
        }

        data.push(item);
    }
    localStorage.clear();
    localStorage.removeItem('data');
    localStorage.setItem('data', JSON.stringify(data));
    res.status(200).send(JSON.stringify(data));
});


// CRUD

app.get('/memos', function (req, res) {
    res.status(200).send(JSON.stringify(data));
});

app.patch('/memos/:id', function (req, res) {
    let item = data.find(memo => memo.id === req.params.id)
    Object.assign(item, req.body.memo)
    localStorage.setItem('data', JSON.stringify(data));

    res.status(200).send(JSON.stringify(item));
    //res.status(200).send(JSON.stringify(data));
});

app.post('/memos', function (req, res) {
    let ts = Date.now();
    let item = {
        id: uuidv4(),
        created_date: ts.toString()
    }

    Object.assign(item, req.body.memo)
    data.unshift(item);
    localStorage.setItem('data', JSON.stringify(data));

    res.status(200).send(JSON.stringify(item));
});

app.delete('/memos/:id', function (req, res) {
    data = data.filter(memo => memo.id !== req.params.id)
    localStorage.setItem('data', JSON.stringify(data));

    res.status(200).send(JSON.stringify(data));
});
