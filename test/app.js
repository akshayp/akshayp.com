/* jshint expr: true, unused: false */
/*global describe, it, afterEach, beforeEach*/
var should = require('chai').should();

describe('Blog', function () {
    process.env.NODE_ENV = 'production';

    var app = require('../app'),
        server;

    beforeEach(function () {
        server = app.listen(3000);
    });

    it('can be started without blowing up', function () {
        app.should.not.be.undefined;
        app.get('view cache').should.be.true;
    });

    it('can use handlebars helpers and render a dummy category and post', function (done) {
        app.render('index', {

            category: 'test',
            posts: [{
                title: 'Einstein ate Mentos!',
                link: '/enistein-mentos-ad/',
                category: 'Geek Stuff',
                id: '962',
                date: 'Sun Oct 11 2009 10:28:30 GMT-0700 (PDT)',
                content: '<p><img src="http://29.media.tumblr.com/tumblr_krctjjD6sG1qzbi86o1_500.jpg" alt="" title="" /></p><p>Einstein endorses Mentos</p>',
                slug: 'enistein-mentos-ad',
                url: '/enistein-mentos-ad',
                preview: '<p><img src="http://29.media.tumblr.com/tumblr_krctjjD6sG1qzbi86o1_500.jpg" alt="" title="" /></p><p></p>'
            }],
            nav: [
                {
                    'key': 'home',
                    'description': 'Home',
                    'url': '/'
                },
                {
                    'key': 'about',
                    'description': 'About',
                    'url': '/about/'
                }
            ],
            page: 'home'

        }, function (err, html) {
            html.should.contain('<h4>Archive for the &#8216; Test &#8217; Category</h4>');
            html.should.contain('<time datetime="Sun Oct 11 2009 10:28:30 GMT-0700 (PDT)" pubdate><em>Oct</em> 11</time>');
            html.should.contain('<li class="pure-menu-selected"><a href="/">Home</a></li>');
            done();
        });
    });

    afterEach(function () {
        server.close();
    });
});
