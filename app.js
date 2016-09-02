const http = require("http");
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/mydb';

http.createServer(function (req, res) {

    if (req.url === "/" || req.url === "//") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<p>See <a href="https://github.com/sebnun/shortener">Shortener</a> for more info.</p>`)

    } else if (req.url.substring(0, 6) === "//new/") { //if startrts with /new/

        //req.url withou new 
        const userURL = decodeURI(req.url.substring(6));
        let response = null;

        if (isUrl(userURL)) {

            //create unique id
            const hash = hashCode(userURL);

            MongoClient.connect(url, function (err, db) {

                db.collection('links').insertOne({ "link": hash, "url": userURL }, function (err, r) {
                    db.close();

                    //make respnse json
                    response = {
                        "original_url": userURL,
                        "short_url": `https://injavascript.com/shortener/${hash}`
                    };
                    res.writeHead(200, { "Content-Type": "text/json" });
                    res.end(JSON.stringify(response));
                });
            });


        } else {
            response.error = "Wrong url format, make sure you have a valid protocol and real site.";
            res.writeHead(200, { "Content-Type": "text/json" });
            res.end(JSON.stringify(response));
        }



    } else {

        const userLink = decodeURI(req.url.substring(2));
        let response = null;

        if (url === null) {

            response.error = "This url is not on the database.";
            res.writeHead(200, { "Content-Type": "text/json" });
            res.end(JSON.stringify(response));
        } else {

            MongoClient.connect(url, function (err, db) {

                var col = db.collection('links');

                col.find({ "link": userLink }).limit(1).toArray(function (err, docs) {
                    db.close();

                    res.statusCode = 302;
                    res.setHeader('Location', url);
                    res.end();
                });
            });

        }

    }

}).listen(8082);

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

function hashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}