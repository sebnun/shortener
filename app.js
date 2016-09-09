function isUrl(s) {
  return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    .test(s);
}

const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const shortid = require('shortid');

const dburl = 'mongodb://localhost:27017/mydb';

http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === '/' || req.url === '//') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<p>See <a href="https://github.com/sebnun/shortener">Shortener</a> for more info.</p>');
  } else if (/^\/\/new\/\S+/.test(req.url)) { // matches //new/jgjhg56
    const userUrl = req.url.substring(6);
    console.log(userUrl);
    if (isUrl(userUrl)) {
      MongoClient.connect(dburl, (err, db) => {
        if (err) throw err;

        const sid = shortid.generate();

        db.collection('links').insertOne({ url: userUrl, id: sid }, (inserterr) => {
          if (inserterr) throw err;
          db.close();
          const linkjson = {
            original_url: userUrl,
            short_url: `https://injavascript.com/shortener/${sid}`,
          };

          res.writeHead(200, { 'Content-Type': 'text/json' });
          res.end(JSON.stringify(linkjson));
        });
      });
    } else {
      const e = { error: 'Wrong url format, make sure you have a valid protocol and real site.' };
      res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end(JSON.stringify(e));
    }
  } else if (req.url !== '//favicon.ico') {
    const linkid = req.url.substring(2);
    console.log(linkid);
    MongoClient.connect(dburl, (err, db) => {
      if (err) throw err;

      db.collection('links').find({ id: linkid }).toArray((finderr, result) => {
        if (finderr) throw finderr;

        if (result.length === 0) {
          res.writeHead(200, { 'Content-Type': 'text/json' });
          res.end(JSON.stringify({ error: 'This url is not on the database.' }));
        } else {
          res.writeHead(302, { Location: result[0].url });
          res.end();
        }

        db.close();
      });
    });
  }
}).listen(8082);
