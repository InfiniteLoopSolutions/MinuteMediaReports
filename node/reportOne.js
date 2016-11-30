/**
 * Created by jude on 28/11/2016.
 */
module.exports = {

    pieDuration: function (queryDate, venueid) {

        var startDate = Date.parse(queryDate);
        var endDate = startDate + 1000 * 60 * 60 * 24;

        //Customer visit duration stats.  Pie charts, yay!  <30 mins ; 30 – 60 mins ;
        // 60 – 90 mins ; 90 – 120 mins ; > 120 mins  - average between selected dates

        //lets require/import the mongodb native drivers.
        var mongodb = require('mongodb');


        //We need to work with "MongoClient" interface in order to connect to a mongodb server.
        var MongoClient = mongodb.MongoClient;

        // Connection URL. This is where your mongodb server is running.
        var url = 'mongodb://localhost:27017/piData';

        //this is a change

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

                collection.aggregate([
                    {
                        $match: {
                            venueid: { $eq: venueid},
                            captime: { $gt: startDate, $lt: endDate}
                        }
                    },
                    {
                        $group: {
                            _id: "$mac",
                            count: {$sum: 1},
                            30:    {$min :"$captime"},
                            60:    {$max :"$captime"},
                            90:    {$min :"$captime"},
                            120:   {$max :"$captime"},
                            120:   {$max :"$captime"}
                        }
                    }
                ]
                ).toArray(function (err, result) {
                    if (err) {
                        console.log(err);
                    } else if (result.length) {
                        console.log('Found:', result);
                    } else {
                        console.log('No document(s) found with defined "find" criteria!');
                    }
                    //Close connection
                    db.close();
                });
        });

        var labels = ["< 30", "30 - 60", "60 - 90", "90 - 120", "> 120"];
        var data = [250, 145, 99, 33, 5];

        return [labels, data];
    }
}

