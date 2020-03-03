const express = require('express');

const app = express();

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const port = process.env.SERVER_PORT || 8080;
const error = process.env.ERRIR_STATUS || 400;

app.use(cookieParser());
app.use(bodyParser.text());
require('dotenv').config({ path: '.env' });

function startServer() {
  app.get('/hello', (req, res) => {
    res.send('world');
  });
  app.get('/repeat-my-fixed', (req, res) => {
    const str = process.env.FIXED_MESSAGE;
    if (str === undefined) {
      req.status = 404;
      res.send('No Message Defined\n');
    } else {
      res.send(str);
      req.status = 200;
    }
  });
  app.get('/repeat-my-query', (req, res) => {
    const { message } = req.query;
    if (message.length === 0) {
      req.status = error;
      res.send('Bad Request\n');
    } else res.send(message);
  });
  app.post('/repeat-my-body', (req, res) => {
    const str = req.body;
    if (Object.values(str).length === 0) {
      req.status = error;
      res.send('Bad Request\n');
    } else res.send(str);
  });
  app.get('/repeat-my-header', (req, res) => {
    const str = req.headers;
    const position = Object.keys(str).indexOf('x-message');
    if ((Object.keys(str)[position] === 'x-message') && Object.values(str)[position].length !== 0) {
      res.send(Object.values(str)[1]);
    } else {
      req.status = error;
      res.send('Bad Request\n');
    }
  });
  app.get('/repeat-my-cookie', (req, res) => {
    const str = req.cookies;
    const position = Object.keys(str).indexOf('message');
    if ((Object.keys(str)[position] === 'message') && Object.values(str)[position].length !== 0) {
      res.send(Object.values(str)[1]);
    } else {
      req.status = error;
      res.send('Bad Request\n');
    }
  });
  app.get('/repeat-my-param/:message', (req, res) => {
    res.send(req.params.message);
  });
  app.get('/repeat-all-my-queries', (req, res) => {
    res.send('oui');
  });
  app.listen(port);
}

console.log('Ready\n');
startServer();
