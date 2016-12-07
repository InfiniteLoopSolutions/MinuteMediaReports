const express = require('express')
const app = express()
const path = require('path');
const customerVisits = require('./node/customerVisits.js');
const serviceDay = require('./node/serviceDay.js');
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

app.get('/customerVisits', function(request, response) {
    customerVisits.pieDuration(request.query.queryDate, request.query.venueid, function(data){
        response.send(data);
    });
});

app.get('/serviceDay', function(request, response) {

    var labels = [];
    var data = [];

    if(request.query.reportType === "7 Days") {
        serviceDay.weekReport(request.query.queryDateRange, request.query.venueid, function(data){
            response.send(data);
        });
    }

    if(request.query.reportType === "4 Weeks") {
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        data = [65, 59, 80, 81];
        response.send([labels, data]);
    }

    if(request.query.reportType === "6 Months") {
        labels = ['January', 'February', 'March', 'April', 'May', 'June'];
        data = [65, 59, 80, 81, 56, 55];
        response.send([labels, data]);
    }
});

app.get('/headCount', function(request, response) {

    var labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    var series = ['Series A', 'Series B'];
    var data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];

    response.send(labels, series, data);
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