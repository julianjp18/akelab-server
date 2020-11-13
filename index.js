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
  /*
  fetch('https://verify-api.arkoselabs.com/api/v3/verify/?simple_mode=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjk1ZmQxNjU5NmE5MTkyNzJhNjMzNyIsImlhdCI6MTU4NDAyNzk1MiwiZXhwIjoxNTg5MjExOTUyfQ.GfgjsKqtTvmN0w-7p-WtuKgDLaS3J8AHfBGix0swoHo'
    },
    body: JSON.stringify(
      {
        'private_key': '566F350B-2D41-4F68-8C87-BFB8A057EBE0',
        'session_token': '1775faaccf0b950a3.8551750501|r=us-east-1|metabgclr=%23ffffff|guitextcolor=%23000000|metaiconclr=%23757575|meta=3|pk=6202C930-A150-4106-A030-84BBBBB42385|at=40|sup=1|rid=89|ag=101|cdn_url=https://cdn.arkoselabs.com/fc|lurl=https://audio-us-east-1.arkoselabs.com|surl=https://client-api.arkoselabs.com',
      }
    ),
    redirect: 'follow'
  })
    .then(res => console.log('its solved', res.json())) // expecting a json response
    .then(json => console.log(json));
    */
});

app.listen(PORT, () => {
  console.log('server on port', PORT)
})
