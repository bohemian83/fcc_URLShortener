require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.use(bodyParser.urlencoded({extended: false}))
let counter = 0
let addresses = {}

app.post('/api/shorturl/', function(req, res) {

  if (/(\w+:\/\/)(\w+\.)?(\w+\.\w+)/.test(req.body.url)) {
    counter++
    addresses[counter] = req.body.url
    res.json({ original_url: req.body.url, short_url: counter });
  } else {
    res.json({error: 'invalid url'})  
  }
});

app.get('/api/shorturl/:id', function(req, res) {
  res.redirect(addresses[req.params.id])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
