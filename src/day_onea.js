const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const error = process.env.ERRIR_STATUS || 400;

app.use(bodyParser.text());
require('dotenv').config({ path: '.env' });

function myFixed(req, res) {
  const str = process.env.FIXED_MESSAGE;
  if (str === undefined) {
    req.status = 404;
    res.send('No Message Defined\n');
  } else {
    res.send(str);
    req.status = 200;
  }
}

function myQuery(req, res) {
  const { message } = req.query;
  if (message.length === 0) {
    req.status = error;
    res.send('Bad Request\n');
  } else res.send(message);
}

function myBody(req, res) {
  const str = req.body;
  if (Object.values(str).length === 0) {
    req.status = error;
    res.send('Bad Request\n');
  } else res.send(str);
}

function myHeader(req, res) {
  const str = req.headers;
  const position = Object.keys(str).indexOf('x-message');
  if ((Object.keys(str)[position] === 'x-message') && Object.values(str)[position].length !== 0) {
    res.send(Object.values(str)[1]);
  } else {
    req.status = error;
    res.send('Bad Request\n');
  }
}

module.exports = {
  myFixed, myBody, myHeader, myQuery,
};
