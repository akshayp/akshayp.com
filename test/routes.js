/* jshint expr: true, unused: false */
/*global describe, it, afterEach, beforeEach*/
var should = require('chai').should(),
    app = require('../app'),
    blog = app.app,
    server = app.server,
    request = require('supertest');

describe('Routes', function () {
    var app = require('../app'),
        server;

    beforeEach(function () {
        server = app.listen(3000);
    });

    it('can GET /', function (done) {
        request(app).get('/').expect(200, done);
    });

    it('can GET /einstein-ate-mentos/', function (done) {
        request(app).get('/einstein-ate-mentos/').expect(200, done);
    });

    it('can GET /category/Technology/', function (done) {
        request(app).get('/category/Technology/').expect(200, done);
    });

    it('can GET /about/', function (done) {
        request(app).get('/about/').expect(200, done);
    });

    it('can GET /geektool-scripts/', function (done) {
        request(app).get('/geektool-scripts/').expect(200, done);
    });

    it('can GET /portfolio/', function (done) {
        request(app).get('/portfolio/').expect(200, done);
    });

    it('can GET /archives/', function (done) {
        request(app).get('/archives/').expect(200, done);
    });

    it('can GET /sitemap.xml', function (done) {
        request(app).get('/sitemap.xml').expect('Content-Type', 'application/xml; charset=utf-8').expect(200, done);
    });

    it('can GET /404', function (done) {
        request(app).get('/404').expect(404, done);
    });

    it('can GET /category/404/', function (done) {
        request(app).get('/category/404/').expect(404, done);
    });

    it('can GET /404/404/404', function (done) {
        request(app).get('/404/404/404').expect(404, done);
    });

    afterEach(function () {
        server.close();
    });
});
