const express = require('express');

const app = express();

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const error = process.env.ERRIR_STATUS || 400;

app.use(cookieParser());
app.use(bodyParser.text());
require('dotenv').config({ path: '.env' });

function myCookie(req, res) {
  const str = req.cookies;
  const position = Object.keys(str).indexOf('message');
  if ((Object.keys(str)[position] === 'message') && Object.values(str)[position].length !== 0) {
    res.send(Object.values(str)[1]);
  } else {
    req.status = error;
    res.send('Bad Request\n');
  }
}

function myParam(req, res) {
  res.send(req.params.message);
}

function allMyQuery(req, res) {
  const arr1 = Object.keys(req.query);
  const arr2 = Object.values(req.query);
  const array = [];
  let query;
  for (let i = 0; i < arr1.length; i++) {
    query = {
      key: arr1[i],
      value: arr2[i],
    };
    array.push(query);
  }
  res.send(array);
}

function myHello(req, res) {
  res.send('world');
}

function myPalindrome(req, res) {
  res.send('oui');
}

module.exports = {
  allMyQuery, myCookie, myParam, myHello, myPalindrome,
};
