'use strict';

var express = require('express'),
    exphbs  = require('express3-handlebars'),
    app     = express(),
    poet    = require('poet')(app),
    moment  = require('moment'),
    hbs;

app.use(poet.middleware());
app.use(express.static('public'));
app.use(app.router);
require('./conf/routes')(app);

poet.set({
    postsPerPage: 8
}).createPostRoute('/:post', 'post')
  .createCategoryRoute('/category/:category', 'index')
  .init();


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

app.configure('production', function () {
    app.use(express.errorHandler());
    app.enable('view cache');
});

app.listen(app.get('port'));