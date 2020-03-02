const express = require('express');

const app = express();

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.text());
require('dotenv').config({ path: '../.env' });

function startServer() {
  app.get('/hello', (req, res) => {
    res.send('world');
  });
  app.get('/repeat-my-fixed', (req, res) => {
    res.send(process.env.FIXED_MESSAGE);
    req.status = 200;
  });
  app.get('/repeat-my-query', (req, res) => {
    const { message } = req.query;
    if (message.length === 0) {
      req.status = process.env.ERROR_STATUS;
      res.send('Bad Request\n');
    } else res.send(message);
  });
  app.post('/repeat-my-body', (req, res) => {
    const str = req.body;
    if (Object.values(str).length === 0) {
      req.status = process.env.ERROR_STATUS;
      res.send('Bad Request\n');
    } else res.send(str);
  });
  app.get('/repeat-my-header', (req, res) => {
    const str = req.headers;
    const position = Object.keys(str).indexOf('x-message');
    if ((Object.keys(str)[position] === 'x-message') && Object.values(str)[position].length !== 0) {
      res.send(Object.values(str)[1]);
    } else {
      req.status = process.env.ERROR_STATUS;
      res.send('Bad Request\n');
    }
  });
  app.get('/repeat-my-cookie', (req, res) => {
    const str = req.cookies;
    const position = Object.keys(str).indexOf('message');
    if ((Object.keys(str)[position] === 'message') && Object.values(str)[position].length !== 0) {
      res.send(Object.values(str)[1]);
    } else {
      req.status = process.env.ERROR_STATUS;
      res.send('Bad Request\n');
    }
  });
  app.get('/repeat-my-param/:message', (req, res) => {
    res.send(req.params.message);
  });
  app.listen(process.env.SERVER_PORT);
}

startServer();
