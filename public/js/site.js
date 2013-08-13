/*globals YUI:true,Typekit:true,_gat:true,prettyPrint:true */

Typekit.load();

YUI({
    modules : {
        'google-tracking': {
            fullpath: 'http://www.google-analytics.com/ga.js'
        },
        'prettify': {
            fullpath: 'http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.js'
        },
        'modernizer': {
            fullpath: 'http://html5shiv.googlecode.com/svn/trunk/html5.js'
        }
    }
}).use('node-base', 'event-base', 'google-tracking', function (Y) {
    'use strict';

    var pageTracker = _gat._getTracker('UA-10284621-2');
    pageTracker._trackPageview();

    if (Y.UA.ie < 9 && Y.UA.ie > 5) { Y.use('modernizer'); }

    Y.on('domready', function () {

        if (Y.one('.prettyprint')) {  Y.use('prettify', function () { prettyPrint(); }); }

        /*Mobile Nav*/
        Y.one('#menuLink').on('click', function (e) {
            e.preventDefault();
            Y.one('#doc').toggleClass('active');
            Y.one('#menu').toggleClass('active');
        });
    });

});