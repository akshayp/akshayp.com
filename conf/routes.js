var nav = require(__dirname + '/nav')(),
    combo  = require('combohandler');

module.exports = function (app) {
    'use strict';

    app.get('/', function (req, res) {

        res.render('index', {
            posts: req.poet.getPosts(0, 8),
            nav: nav,
            page: 'home'
        });
    });

    app.get('/about', function (req, res) {
        res.render('about', {
            nav: nav,
            page: 'about'
        });
    });

    app.get('/geektool-scripts', function (req, res) {
        res.render('geektool-scripts', {
            nav: nav,
            page: 'geektool-scripts'
        });
    });

    app.get('/perl', function (req, res) {
        res.render('perl', {
            nav: nav,
            page: 'perl'
        });
    });

    app.get('/portfolio', function (req, res) {
        res.render('portfolio', {
            sites: require(__dirname + '/portfolio')(),
            portfolio: true,
            nav: nav,
            page: 'portfolio'
        });
    });

    app.get('/archives', function (req, res) {

        var postCount = req.poet.getPostCount(),
            posts = req.poet.getPosts(0, postCount);

        res.render('archives', {
            posts: posts,
            nav: nav,
            page: 'archives'
        });
    });

    app.get('/combo', combo.combine({rootPath: 'public'}), combo.respond);

    app.get('/:post', function (req, res) {
        var post = req.poet.getPost(req.params.post);

        if (post) {
            res.render('post', { post: post });
        } else {
            res.status(404);
            res.render('404', {
                nav: nav,
                page: 'home'
            });
        }
    });

    app.get('*', function (req, res) {
        res.status(404);
        res.render('404', {
            nav: nav,
            page: 'home'
        });
    });
};