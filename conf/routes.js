'use strict';

var nav = require(__dirname + '/nav')(),
    combo  = require('combohandler'),
    error = function (req, res) {
        res.status(404);
        res.render('404', {
            nav: nav,
            page: 'home'
        });
    };

module.exports = function (app) {

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

    app.get('/sitemap.xml', function (req, res) {

        var postCount = req.poet.getPostCount(),
            posts = req.poet.getPosts(0, postCount),
            cats = req.poet.categoryList;

        res.setHeader('Content-Type', 'application/xml');
        res.render('', {
            posts: posts,
            pages: nav,
            categories: cats,
            layout: 'sitemap'
        });
    });

    app.get('/combo', combo.combine({rootPath: 'public'}), combo.respond);

    app.get('/category/:category', function (req, res) {
        var categorizedPosts = req.poet.postsWithCategory(req.params.category);

        if (categorizedPosts.length) {
            res.render('index', {
                posts: categorizedPosts,
                category: req.params.category,
                nav: nav,
                page: 'home'
            });
        } else {
            error(req, res);
        }
    });

    app.get('/:post', function (req, res) {
        var post = req.poet.getPost(req.params.post);

        if (post) {
            res.render('post', { post: post, nav: nav, page: 'home' });
        } else {
            error(req, res);
        }
    });

    app.get('*', error);
};