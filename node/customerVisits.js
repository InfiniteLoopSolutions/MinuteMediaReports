/**
 * Created by jude on 28/11/2016.
 */
module.exports.pieDuration =
    function (queryDate, venueid, callback) {

    var labelsArray=[];
    var dataArray=[];

        var lessThan30 = 1;
        var between3060 = 1;
        var between6090 = 1;
        var between90120 = 1;
        var greaterThan120 = 1;
        var previousMac = "";
        var currentMac = "";
        var currentTime = 0;
        var previousTime = 0;

        var startDate = Date.parse(queryDate);
        var endDate = startDate + 1000 * 60 * 60 * 24;

        //lets require/import the mongodb native drivers.
        var mongodb = require('mongodb');
        //We need to work with "MongoClient" interface in order to connect to a mongodb server.
        var MongoClient = mongodb.MongoClient;
        // Connection URL. This is where your mongodb server is running.
        var url = 'mongodb://localhost:27017/piData';

        var calcFrequencies = function (data) {

            currentMac = data.mac;
            currentTime = data.captime;

            if (previousMac !== currentMac)
                previousTime = currentTime;

            if (previousTime === 0)
                previousTime = currentTime;

            if (currentTime - previousTime > 0 && currentTime - previousTime < 30 * 60 * 1000)
                lessThan30++;

            if (currentTime - previousTime > 30 * 60 * 1000 && currentTime - previousTime < 60 * 60 * 1000)
                between3060++;

            if (currentTime - previousTime > 60 * 60 * 1000 && currentTime - previousTime < 90 * 60 * 1000)
                between6090++;

            if (currentTime - previousTime > 90 * 60 * 1000 && currentTime - previousTime < 120 * 60 * 1000)
                between90120++;

            if (currentTime - previousTime > 120 * 60 * 1000)
                greaterThan120++;

            previousMac = data.mac;
            previousTime = data.captime;
        }

        // Use connect method to connect to the Server
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                return;
            }
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('venueinfo');

            collection.find({
                venueid: {$eq: venueid},
                captime: {$gt: startDate, $lt: endDate}
            }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result.length);
                    for (var i = 0; i < result.length; i++) {
                        calcFrequencies(result[i]);
                    }

                    dataArray = [lessThan30, between3060, between6090, between90120, greaterThan120];
                    labelsArray = ["<30", "30 - 60", " 60-90", "90-120", ">120"];

                    callback([labelsArray, dataArray]);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                }

            });
            db.close;
        });
}



