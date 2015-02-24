'use strict';

var nav = require('./nav');
var portfolio = require('./portfolio');
var combo = require('combohandler');

function error (req, res) {
    res.status(404);
    res.render('404', {
        nav: nav,
        page: 'home'
    });
}

module.exports = function (app, poet) {
    var helpers = poet.helpers;

    app.get('/', function (req, res) {
        res.render('index', {
            posts: helpers.getPosts(0, 8),
            nav: nav,
            page: 'home'
        });
    });

    app.get('/:page(about|geektool-scripts)', function (req, res) {
        var page = req.params.page;

        res.render(page, {
            nav: nav,
            page: page
        });
    });

    app.get('/portfolio', function (req, res) {
        res.render('portfolio', {
            sites: portfolio,
            portfolio: true,
            nav: nav,
            page: 'portfolio'
        });
    });

    app.get('/archives', function (req, res) {
        var postCount = helpers.getPostCount();
        var posts = helpers.getPosts(0, postCount);

        res.render('archives', {
            posts: posts,
            nav: nav,
            page: 'archives'
        });
    });

    app.get('/sitemap.xml', function (req, res) {
        var postCount = helpers.getPostCount();
        var posts = helpers.getPosts(0, postCount);
        var cats = helpers.getCategories();

        res.setHeader('Content-Type', 'application/xml');
        res.render('', {
            posts: posts,
            pages: nav,
            categories: cats,
            layout: 'sitemap'
        });
    });

    app.get('/combo', combo.combine({ rootPath: 'public' }), combo.respond);

    poet.addRoute('/category/:category', function (req, res) {
        var categorizedPosts = helpers.postsWithCategory(req.params.category);

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

    poet.addRoute('/:post', function (req, res) {
        var post = helpers.getPost(req.params.post);

        if (post) {
            res.render('post', { post: post, nav: nav, page: 'home' });
        } else {
            error(req, res);
        }
    });

    app.use(function (req, res) {
        error(req, res);
    });
};
