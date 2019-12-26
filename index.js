const express = require('express');
const path = require('path');
const TestBoard = require('./test-board');
const app = express();


app.use('/', express.static(__dirname + '/web-server/'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/web-server/index.html'));
});

app.post('/move', function (req, res) {
    const board = new TestBoard();
    board.init().then(function () {
        board.moveTo();
    });
    res.send('ok');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
