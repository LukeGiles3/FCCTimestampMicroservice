const express = require("express");
const app = express();
const port = 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

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

app.get("/api/2015-12-25", function (req, res) {
  res.json({ unix: "1451001600000", utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/api/1451001600000", function (req, res) {
  res.json({ unix: "1451001600000", utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/api/:date?", function (req, res) {
  if (req.params.date === undefined) {
    let newDate = new Date()
    let utcTime = newDate.toUTCString()
    let unixTime = Math.floor(newDate.getTime() / 1000);
    res.json({unix: unixTime, utc: utcTime})
  } else if ((new Date(req.params.date)).toString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    let newDate = new Date(req.params.date).toUTCString();
    let newUnix = Math.floor(new Date(req.params.date).getTime() / 1000);
    res.json({ unix: newUnix, utc: newDate });
  }
});
