var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

var enableCORS = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept, Content-Length");
    next();
};

module.exports = function () {
    var app = express();

    app.use(enableCORS);
    app.use(bodyParser.json());
    app.use(bodyParser.json({ extended: true }));

    load('models', {cwd: 'app'})
        .then('middlewares')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};

