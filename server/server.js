const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes.js');
const slowDown = require('express-slow-down');
const rateLimit = require('express-rate-limit');
const app = express();

const port = process.env.PORT || 8080;

app.use(cors());

app.enable('trust proxy');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 100,
    delayMs: 500
})

app.use('/:query', limiter, speedLimiter, routes.checkCache, routes.getWeather);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/dist/'));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));
}

app.listen(port)