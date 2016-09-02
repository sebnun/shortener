const http = require("http");
const MongoClient = require('mongodb').MongoClient





http.createServer(function(req, res) {

    MongoClient.connect('mongodb://localhost:27017/test', (err, database) => {
  if (err) 
    return console.log(err);
  
  console.log(".. connected to mongo?");
  //console.log(db);
});

/*    if (req.url === "/" || req.url === "//") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(`<p>See <a href="https://github.com/sebnun/shortener">Shortener</a> for more info.</p>`)
    
    } else if (req.url.substring(0, 6) === "//new/") { //if startrts with /new/

        //req.url withou new 
        const userURL = decodeURI(req.url.substring(6)); 
        let response = null;

        if (isUrl(userURL)) {
            //create unique id
            //add url to db

            //make respnse json
        } else {
            response.error = "Wrong url format, make sure you have a valid protocol and real site.";
        }

        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(JSON.stringify(response));
        
    } else {

        const userLink = decodeURI(req.url.substring(2)); 
        let response = null;

        let url = getUrlForLink(userLink);

        if (url === null) {

            response.error = "This url is not on the database.";

            res.writeHead(200, {"Content-Type": "text/json"});
            res.end(JSON.stringify(response));
        } else {

            res.statusCode = 302;
            res.setHeader('Location', url);
            res.end();
        }
        
    }
*/
}).listen(8082);

function isUrl(s) {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
}

function getUrlForLink(link) {

}

function insertLinkForUrl(link, url) {

}