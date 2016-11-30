const express = require('express')
const app = express()
const path = require('path');
const reportOne = require('./node/reportOne.js');
const port = 3000

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/Content')));
app.use(express.static(path.join(__dirname + '/ext-modules')));
app.use(express.static(path.join(__dirname + '/app')));
app.use(express.static(path.join(__dirname + '/node_modules')));
app.use(express.static(path.join(__dirname + '/fonts')));
app.use(express.static(path.join(__dirname + '/images')));
app.use(express.static(path.join(__dirname + '/node')));
app.use(express.static(path.join(__dirname + '/')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/reportOne', function(request, response) {
    response.send(reportOne.pieDuration(request.query.queryDate, request.query.venueid))
});

app.get('/reportTwo', function(request, response) {
    response.send('Hello from Two!')
});

app.get('/reportThree', function(request, response) {
    response.send('Hello from Three!')
});

app.get('/reportFour', function(request, response) {
    response.send('Hello from Four!')
});

app.listen(port, function(err) {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log('server is listening on ' + port)
});