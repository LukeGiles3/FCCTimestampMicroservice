import app from "./src/firebase";
const functions = require("firebase-functions");

const express = require("express");
const app = express();
const port = 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

app.listen(3000, function () {
  console.log(`Listening on port ${port}`)
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/1451001600000", function (req, res) {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/app/api/:date?", function (req, res) {
  if (req.params.date === undefined) {
    let newDate = new Date()
    let utcTime = newDate.toUTCString()
    let unixTime = Math.floor(newDate.getTime());
    res.json({unix: unixTime, utc: utcTime})
  } else if ((new Date(req.params.date)).toString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    let newDate = new Date(req.params.date).toUTCString();
    let newUnix = Math.floor(new Date(req.params.date).getTime());
    res.json({ unix: newUnix, utc: newDate });
  }
});

exports.app = functions.https.onRequest(app);
