const http = require("http");

http.createServer(function(req, res) {

    res.end(req.url);

/*
    if (req.url === "/" || req.url === "//") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(`<p>See <a href="https://github.com/sebnun/shortener">Shortener</a> for more info.</p>`)
    
    } else if (req.url === "new" || req.url === "/new") { //check

        //req.url withou new ?
        const userRequest = decodeURI(req.url.substring(5)); 

        //if urerrequest is an url
            //create unique id
            //add url to db
            //display json
        
        //else if is not a url
            //select from db an redirect to url

            //else
                //return nyull

        let response = {"unix": null, "natural": null};


        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(JSON.stringify(response));
    } else {
        //redirect
        const userRequest = decodeURI(req.url.substring(2)); 
    }
*/
}).listen(8082);