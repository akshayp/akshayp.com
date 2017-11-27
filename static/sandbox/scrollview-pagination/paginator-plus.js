/* global YUI */
YUI.add(
    'scrollview-paginator-plus',
    function(Y) {
        /**
         * Provides a plugin, which adds pagination support to ScrollView instances
         *
         * @module scrollview-paginator
         */

        const UI = Y.ScrollView ? Y.ScrollView.UI_SRC : 'ui';
        const INDEX = 'index';
        const SCROLL_X = 'scrollX';
        const SCROLL_Y = 'scrollY';
        const TOTAL = 'total';
        const BOUNDING_BOX = 'boundingBox';
        const CONTENT_BOX = 'contentBox';

        /**
         * Scrollview plugin that adds support for paging
         *
         * @class ScrollViewPaginator
         * @namespace Plugin
         * @extends Plugin.Base
         * @constructor
         */
        function PaginatorPlugin() {
            PaginatorPlugin.superclass.constructor.apply(this, arguments);
        }

        /**
         * The identity of the plugin
         *
         * @property NAME
         * @type String
         * @default 'paginatorPlugin'
         * @static
         */
        PaginatorPlugin.NAME = 'pluginScrollViewPaginator';

        /**
         * The namespace on which the plugin will reside
         *
         * @property NS
         * @type String
         * @default 'pages'
         * @static
         */
        PaginatorPlugin.NS = 'pages';

        /**
         * The default attribute configuration for the plugin
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        PaginatorPlugin.ATTRS = {
            /**
             * CSS selector for a page inside the scrollview. The scrollview
             * will snap to the closest page.
             *
             * @attribute selector
             * @type {String}
             */
            selector: {
                value: null
            },

            /**
             * The active page number for a paged scrollview
             *
             * @attribute index
             * @type {Number}
             * @default 0
             */
            index: {
                value: 0
            },

            /**
             * The total number of pages
             *
             * @attribute total
             * @type {Number}
             * @default 0
             */
            total: {
                value: 0
            },

            /**
             * The total number of items per page
             *
             * @attribute numItemsPerPage
             * @type {Number}
             * @default 1
             */
            numItemsPerPage: {
                value: 1
            }
        };

        Y.extend(PaginatorPlugin, Y.Plugin.Base, {
            /**
             * Designated initializer
             *
             * @method initializer
             * @returns {void}
             */
            initializer: function() {
                const self = this;
                self.beforeHostMethod('_flickFrame', self._flickFrame);
                self.afterHostMethod('_uiDimensionsChange', self._calcOffsets);
                self.afterHostEvent('scrollEnd', self._scrollEnded);
                self.afterHostEvent('render', self._afterRender);
                self.after('indexChange', self._afterIndexChange);
            },

            /**
             * Calculate the page boundary offsets
             *
             * @method _calcOffsets
             * @protected
             * @returns {void}
             */
            _calcOffsets: function() {
                const host = this._host;
                const cb = host.get(CONTENT_BOX);
                const bb = host.get(BOUNDING_BOX);
                const vert = host._scrollsVertical;
                const size = vert ? host._scrollHeight : host._scrollWidth;
                const pageSelector = this.get('selector');
                let pages;
                let offsets;

                // Pre-calculate min/max values for each page
                pages = pageSelector ? cb.all(pageSelector) : cb.get('children');

                this.set(TOTAL, pages.size());

                this._pgOff = offsets = pages.get(vert ? 'offsetTop' : 'offsetLeft');
                offsets.push(size - bb.get(vert ? 'offsetHeight' : 'offsetWidth'));
            },

            /**
             * Executed to respond to the flick event, by over-riding the default flickFrame animation.
             * This is needed to determine if the next or prev page should be activated.
             *
             * @method _flickFrame
             * @returns {void}
             * @protected
             */
            _flickFrame: function() {
                let host = this._host,
                    velocity = host._currentVelocity,
                    inc = velocity < 0,
                    pageIndex = this.get(INDEX),
                    pageCount = this.get(TOTAL);

                if (velocity) {
                    if (inc && pageIndex < pageCount - 1) {
                        this.set(INDEX, pageIndex + this.get('numItemsPerPage'));
                    } else if (!inc && pageIndex > 0) {
                        this.set(INDEX, pageIndex - this.get('numItemsPerPage'));
                    }
                }

                return this._prevent;
            },

            /**
             * After host render handler
             *
             * @method _afterRender
             * @returns {void}
             * @protected
             */
            _afterRender: function() {
                const host = this._host;
                host.get('boundingBox').addClass(host.getClassName('paged'));
            },

            /**
             * scrollEnd handler detects if a page needs to change
             *
             * @method _scrollEnded
             * @param {Event.Facade} e Event
             * @returns {void}
             * @protected
             */
            _scrollEnded: function(e) {
                let host = this._host,
                    pageIndex = this.get(INDEX),
                    pageCount = this.get(TOTAL),
                    trans = PaginatorPlugin.SNAP_TO_CURRENT;

                if (e.onGestureMoveEnd && !host._flicking) {
                    if (host._scrolledHalfway) {
                        if (host._scrolledForward && pageIndex < pageCount - this.get('numItemsPerPage')) {
                            this.set(INDEX, pageIndex + this.get('numItemsPerPage'));
                        } else if (pageIndex > 0) {
                            this.set(INDEX, pageIndex - this.get('numItemsPerPage'));
                        } else {
                            this.snapToCurrent(trans.duration, trans.easing);
                        }
                    } else {
                        this.snapToCurrent(trans.duration, trans.easing);
                    }
                }

                host._flicking = false;
            },

            /**
             * index attr change handler
             *
             * @method _afterIndexChange
             * @param {Event.Facade} e Event
             * @returns {void}
             * @protected
             */
            _afterIndexChange: function(e) {
                if (e.src !== UI) {
                    this._uiIndex(e.newVal);
                }
            },

            /**
             * Update the UI based on the current page index
             *
             * @method _uiIndex
             * @param {Number} index Current item index
             * @returns {void}
             * @protected
             */
            _uiIndex: function(index) {
                this.scrollTo(index, 350, 'ease-out');
            },

            /**
             * Scroll to the next page in the scrollview, with animation
             *
             * @method next
             * @returns {void}
             */
            next: function() {
                const index = this.get(INDEX);
                if (index < this.get(TOTAL) - this.get('numItemsPerPage')) {
                    this.set(INDEX, index + this.get('numItemsPerPage'));
                }
            },

            /**
             * Scroll to the previous page in the scrollview, with animation
             *
             * @method prev
             * @returns {void}
             */
            prev: function() {
                const index = this.get(INDEX);
                if (index > 0) {
                    this.set(INDEX, index - this.get('numItemsPerPage'));
                }
            },

            /**
             * Scroll to a given page in the scrollview, with animation.
             *
             * @method scrollTo
             * @param {Number} index The index of the page to scroll to
             * @param {Number} duration The number of ms the animation should last
             * @param {String} easing The timing function to use in the animation
             * @returns {void}
             */
            scrollTo: function(index, duration, easing) {
                let host = this._host,
                    vert = host._scrollsVertical,
                    scrollAxis = vert ? SCROLL_Y : SCROLL_X,
                    scrollVal = this._pgOff[index];

                host.set(scrollAxis, scrollVal, {
                    duration: duration,
                    easing: easing
                });
            },

            /**
             * Snaps the scrollview to the currently selected page
             *
             * @method snapToCurrent
             * @param {Number} duration The number of ms the animation should last
             * @param {String} easing The timing function to use in the animation
             * @returns {void}
             */
            snapToCurrent: function(duration, easing) {
                let host = this._host,
                    vert = host._scrollsVertical;

                host._killTimer();

                host.set(vert ? SCROLL_Y : SCROLL_X, this._pgOff[this.get(INDEX)], {
                    duration: duration,
                    easing: easing
                });
            },

            _prevent: new Y.Do.Prevent()
        });

        /**
         * The default snap to current duration and easing values used on scroll end.
         *
         * @property SNAP_TO_CURRENT
         * @static
         */
        PaginatorPlugin.SNAP_TO_CURRENT = {
            duration: 300,
            easing: 'ease-out'
        };

        Y.namespace('Plugin').ScrollViewPaginator = PaginatorPlugin;
    },
    '3.4.1',
    { requires: ['plugin'] }
);
