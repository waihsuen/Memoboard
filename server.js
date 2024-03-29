/* eslint-disable no-console */

const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 80;
var path = require('path');
var cors = require('cors');
const uuidv4 = require('uuid/v4');
const LocalStorage = require('node-localstorage').LocalStorage;

var localStorage = new LocalStorage('./scratch');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



let data = [];
if (localStorage.getItem('data')) {
    data = JSON.parse(localStorage.getItem('data'));
}

// Serve the files on port
const server = app.listen(port, function () {
    console.log(`We started a server at port ${server.address().port} \n`);
});

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', cors(corsOptions), function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});


app.get('/viewlist', cors(corsOptions), function (req, res) {
    res.status(200).send(JSON.stringify(data));
});

app.get('/refreshlist', cors(corsOptions), function (req, res) {
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
app.get('/memos', cors(corsOptions), function (req, res) {
    res.status(200).send(JSON.stringify(data));
});

app.patch('/memos/:id', function (req, res) {
    let item = data.find(memo => memo.id === req.params.id)

    if (item) {
        // THERE IS AN ITEM FOUND
        Object.assign(item, req.body.memo)
        localStorage.setItem('data', JSON.stringify(data));
        res.status(200).send(JSON.stringify(item));
    } else {
        res.status(500);
        throw new Error('No Item Found for Update for ID:', req.params.id) 
    }
    
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
