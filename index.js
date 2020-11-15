'use strict';
const PORT = process.env.PORT || 3001;

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getFile = (akelab, res) => {
  if (akelab === '123456789') {
    fs.readFile("Movies.json", (err, data) => {
      if (err) throw err;

      const movies = JSON.parse(data);

      return res.send(movies);
    });
  } else return res.sendStatus(401);
};

app.get('/movies/', (req, res) => {
  return getFile(req.query.Akelab, res);
});


app.post('/movies/', (req, res) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Max-Age", "1728000");

  return getFile(req.body.Akelab, res);
});

app.listen(PORT, () => {
  console.log('server on port', PORT)
})
