module.exports = function (app) {
    'use strict';

    app.get('/', function (req, res) {
        res.render('index', {
            posts: req.poet.getPosts(0, 8)
        });
    });

    app.get('/about', function (req, res) {
        res.render('about');
    });

    app.get('/geektool-scripts', function (req, res) {
        res.render('geektool-scripts');
    });

    app.get('/perl', function (req, res) {
        res.render('perl');
    });

    app.get('/portfolio', function (req, res) {

        res.render('portfolio', {
            sites: require(__dirname + '/portfolio')(),
            portfolio: true
        });
    });

    app.get('/:post', function (req, res) {
        var post = req.poet.getPost(req.params.post);

        if (post) {
            res.render('post', { post: post });
        } else {
            res.status(404);
            res.render('404');
        }
    });

    app.get('*', function (req, res) {
        res.status(404);
        res.render('404');
    });
};