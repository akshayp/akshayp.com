'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const env = process.env.NODE_ENV;
const compress = require('compression')();
const app = express();
const poet = require('poet')(app);
const moment = require('moment');

poet.init();

app.use(compress);
app.use(express.static('public'));
require('./conf/routes')(app, poet);

const hbs = exphbs.create({
    defaultLayout: 'main',

    helpers: {
        uppercase: function (text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        },
        month: function (date) {
            return moment(new Date(date)).format('MMM');
        },
        day: function (date) {
            return moment(new Date(date)).format('D');
        },
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
