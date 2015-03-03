'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var env = process.env.NODE_ENV;
var compress = require('compression')();
var app = express();
var poet = require('poet')(app);
var moment = require('moment');

poet.init();

app.use(compress);
app.use(express.static('public'));
require('./conf/routes')(app, poet);

var hbs = exphbs.create({
    defaultLayout: 'main',

    helpers: {
        uppercase: function (text) { return text.charAt(0).toUpperCase() + text.slice(1); },
        month: function (date) { return moment(new Date(date)).format('MMM'); },
        day: function (date) { return moment(new Date(date)).format('D'); },
        eq: function (context, options) {
            if (context === options.hash.compare) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});

app.set('port', process.env.PORT || 3000);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

if (env === 'production') {
    app.enable('view cache');
}

module.exports = app;
