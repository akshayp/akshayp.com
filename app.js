var express  = require('express'),
    exphbs   = require('express-handlebars'),
    env      = process.env.NODE_ENV,
    compress = require('compression')(),
    app      = express(),
    poet     = require('poet')(app),
    moment   = require('moment'),
    hbs;

poet.init();

app.use(compress);
app.use(express.static('public'));
require('./conf/routes')(app, poet);

hbs = exphbs.create({
    defaultLayout: 'main',

    helpers: {
        uppercase: function (text) { return text.charAt(0).toUpperCase() + text.slice(1); },
        month: function (date) { return moment(date).format('MMM'); },
        day: function (date) { return moment(date).format('D'); },
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

if ('production' === env) {
    app.enable('view cache');
}

module.exports = app;
