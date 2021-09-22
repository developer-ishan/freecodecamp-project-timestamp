// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  const {date} = req.params;
  let parsed_if_utc = new Date(date);
  let parsed_if_unix = new Date(date/1000);

  console.log(parsed_if_utc, Object.prototype.toString.call(parsed_if_utc));
  console.log(parsed_if_unix, Object.prototype.toString.call(parsed_if_unix));
  
  let parsed = null;
  if(parsed_if_utc.toString() !== 'Invalid Date'){
    parsed = parsed_if_utc;
  } else if(parsed_if_unix.toString() !== 'Invalid Date'){
    parsed = parsed_if_unix;
  } else{
    return res.json({ error : "Invalid Date" });
  }
  return res.json({
    unix: parsed.getTime() / 1000,
    utc: parsed.toUTCString()
  })
});

app.get("/api", function (req, res) {
  const cur_date = new Date();
  return res.json({
    unix: cur_date.getTime(),
    utc: cur_date.toUTCString()
  })
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
