const express = require('express');

const app = express();

require('dotenv').config({ path: '.env' });
const fenelia = require('./day_onea.js');
const fancie = require('./day_oneb.js');

const port = process.env.SERVER_PORT || 8080;


function startServer() {
  app.get('/repeat-my-header', (req, res) => { fenelia.myHeader(req, res); });
  app.get('/repeat-my-cookie', (req, res) => { fancie.myCookie(req, res); });
  app.get('/repeat-my-fixed', (req, res) => { fenelia.myFixed(req, res); });
  app.get('/repeat-all-my-queries', (req, res) => { fancie.allMyQuery(req, res); });
  app.get('/hello', (req, res) => { fancie.myHello(req, res); });
  app.get('/repeat-my-query', (req, res) => { fenelia.myQuery(req, res); });
  app.post('/repeat-my-body', (req, res) => { fenelia.myBody(req, res); });
  app.post('/are-these-palindromes', (req, res) => { fancie.myPalindrome(req, res); });
  app.get('/repeat-my-param/:message', (req, res) => { fancie.myParam(req, res); });
  app.listen(port);
}

console.log('Ready');
startServer();
