/* globals YUI */

YUI.add(
    'recent-tweets',
    function(Y) {
        Y.namespace('RecentTweets');

        const RecentTweets = Y.Base.create(
            'recent-tweets',
            Y.Widget,
            [],
            {
                renderUI: function() {
                    const template = Y.substitute(this.TEMPLATE, this.get('strings'));
                    const contentBox = this.get('contentBox');

                    contentBox.append(template);
                    this._getTweets();
                },

                _buildTweet: function(item) {
                    const text = item.text
                        .replace(/(http\S+)/i, '<a href="$1" target="_blank">$1</a>')
                        .replace(/(@)([a-z0-9_\-]+)/i, '<a href="http://twitter.com/$2" target="_blank">$1$2</a>')
                        .replace(
                            /(#)(\S+)/gi,
                            '<a href="http://search.twitter.com/search?q=%23$2" target="_blank">$1$2</a>'
                        );
                    const template = this.TWEET_TEMPLATE;
                    const markup = Y.substitute(template, { text: text });

                    return markup;
                },

                _getTweets: function() {
                    const self = this;
                    const tweetList = this.get('contentBox').one('ul');

                    Y.YQL(
                        'select * from twitter.user.status where screen_name="' +
                            this.get('username') +
                            '" and count="' +
                            this.get('numTweets') +
                            '"',
                        function(r) {
                            let li = '';
                            let originalHeight;
                            const statuses = r.query.results.status;

                            if (Y.Lang.isArray(statuses)) {
                                Y.each(statuses, function(item) {
                                    li += self._buildTweet(item);
                                });
                            } else {
                                li += self._buildTweet(statuses);
                            }

                            tweetList.setContent(li);

                            originalHeight = tweetList.getComputedStyle('height');

                            tweetList.transition({
                                duration: 0.5,
                                easing: 'ease-out',
                                height: originalHeight,
                                opacity: 1
                            });

                            tweetList.siblings('p').remove();
                        }
                    );
                },

                TEMPLATE:
                    '<div class="hd">' +
                    '<h3>{headingText}</h3>' +
                    '</div>' +
                    '<div class="bd">' +
                    '<p class="preLoader">{loaderText}</p>' +
                    '<ul></ul>' +
                    '</div>',

                TWEET_TEMPLATE: '<li>{text}</li>'
            },
            {
                ATTRS: {
                    username: {
                        value: 'akshayp'
                    },

                    numTweets: {
                        value: 1
                    },

                    strings: {
                        value: {
                            loaderText: 'Loading Tweets...',
                            headingText: 'Latest Tweets'
                        }
                    }
                }
            }
        );

        Y.RecentTweets = RecentTweets;
    },
    '3.4.1',
    { requires: ['node', 'transition', 'event', 'substitute', 'widget', 'base', 'yql'] }
);
