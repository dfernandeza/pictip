/*
 * jQuery PicTip Plugin
 * Copyright (c) 2012-2014
 * Version: 1.0.0
 * Author: Daniel Fernandez Arias @dfernandeza
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 */

(function ($) {
    /**
     * Spot Object
     * @param index spot identifier
     * @param conf literal object containing the Spot configuration
     */
    var Spot = function (index, conf) {
        this.index = index;
        this.top = conf.top;
        this.left = conf.left;
        this.tooltip = null;
        this.open = false;
    };

    /**
     * Creates the spot element
     * @param index     spot identifier
     * @param $template HTML template (wrapped in a jQuery object) to create the spot, this value is part of the plugin options
     * @return the spot DOM element (wrapped in a jQuery object)
     */
    Spot.prototype.create = function (index, $template) {
        return $template.clone().css({
            position: 'absolute',
            top: this.top,
            left: this.left,
            display: 'none'
        }).addClass('spot-' + index).data({
            'index': index
        });
    };

    /**
     * Open the spot related tooltip
     * @param $el    jQuery element where the plugin was instantiated
     * @param show   function that overrides the plugin default show functionality
     * @param onShow callback function. Executed after the tooltip is opened
     */
    Spot.prototype.openToolTip = function ($el, show, onShow) {
        var index = this.index,
            $spot = $el.find('.spot-' + index),
            $tooltip = $el.find('.spot-tooltip-' + index);
        this.open = true;
        $spot.addClass('spot-open');
        if(this.tooltip.isbubble){
            // set tooltip coords
            $tooltip.css(this.tooltip.getCoords($spot, $tooltip));
        }
        if(typeof show === 'function'){
            show($tooltip);
        }else{
            $tooltip.fadeIn(200, function () {
                if(typeof onShow === 'function'){
                    onShow($spot[0], this);
                }
            });
        }
    };

    /**
     * Close the spot related tooltip
     * @param $el     jQuery element where the plugin was instantiated
     * @param close   function that overrides the plugin default close functionality
     * @param onClose callback function. Executed after the tooltip is closed
     */
    Spot.prototype.closeToolTip = function ($el, close, onClose) {
        var index = this.index,
            $spot = $el.find('.spot-' + index),
            $tooltip = $el.find('.spot-tooltip-' + index);
        this.open = false;
        $spot.removeClass('spot-open');
        if(typeof close === 'function'){
            close($tooltip);
        }else{
            $tooltip.fadeOut(200, function () {
                if(typeof onClose === 'function'){
                    onClose($spot[0], this);
                }
            });
        }
    };

    /**
     * ToolTip object
     * @param index tooltip identifier
     * @param conf literal object containing the tooltip configuration
     * @param isbubble tooltipe type (caption/bubble)
     */
    var ToolTip = function (index, conf, isbubble) {
        this.index = index;
        this.position = conf.tooltipPosition; // tooltip position (tl, tr, tc, bl, br, bc, cl, cr)
        this.id = conf.tooltipId;
        this.css = conf.tooltipCss;
        this.close = conf.tooltipClose; // add the close button?
        this.content = conf.content;
        this.isbubble = isbubble;
    };

    /**
     * Creates the tooltip DOM element
     * @return the tooltip DOM element (wrapped in a jQuery object)
     */
    ToolTip.prototype.create = function () {
        var $tt = $('<div/>', {
                'id': this.id,
                'class': 'spot-tooltip spot-tooltip-' + this.index
            }),
            $ttClose = this.close ? $('<a/>', {
                'class': 'spot-tooltip-close',
                'href': '#',
                'text': 'X'
            }) : $(),
            $ttContent = $('<div/>', {'class': 'spot-tooltip-content'}),
            pluginCss = {},
            customCss = {};
        // create the tooltip
        $ttContent.html(this.content);
        $tt.append($ttClose, $ttContent).data('index', this.index);
        // style the tooltip
        if (!this.isbubble) {
            pluginCss = {top: 0, left: 0, width: '100%'}; // use captions instead of bubble tooltips
        }
        customCss = $.extend(pluginCss, this.css); // user could add custom css
        $tt.css(customCss);
        return $tt;
    };

    /**
     * Calculates the tooltip position. Relative to the spot position.
     * @para    spot element (wrapped in a jQuery object)
     * @param $tooltip tooltip element (wrapped in a jQuery object)
     * @return object containing the top and left position
     */
    ToolTip.prototype.getCoords = function ($spot, $tooltip) {
        var top, left,
            position = this.position,
            // Spot positioning
            spotPosition = $spot.position(),
            spotTop = spotPosition.top,
            spotLeft = spotPosition.left,
            // Spot dimentions
            spotHeight = $spot.outerHeight(),
            spotWidth = $spot.outerWidth(),
            // Tooltip dimentions
            tooltipHeight = $tooltip.outerHeight(),
            tooltipWidth = $tooltip.outerWidth(),
            // relocate the tooltip to overlap the spot
            relocation = spotWidth / 2;

        $tooltip.addClass('spot-tooltip-' + position);

        // top positions
        if (position.charAt(0) === 't') {
            top = spotTop - tooltipHeight + relocation;
        }
        // bottom positions
        if (position.charAt(0) === 'b') {
            top = spotTop +  spotHeight - relocation;
        }
        // center positions
        if (position.charAt(0) === 'c') {
            top = spotTop -  (tooltipHeight / 2 - spotHeight / 2);
        }

        // left positions
        if (position === 'tl' || position === 'bl' || position === 'cl') {
            left = spotLeft - tooltipWidth + relocation;
        }
        // right positions
        if (position === 'tr' || position === 'br' || position === 'cr') {
            left = spotLeft + spotWidth - relocation;
        }
        // center positions
        if (position === 'tc' || position === 'bc') {
            left = spotLeft - (tooltipWidth / 2 - spotWidth / 2);
        }

        return {
            top: top,
            left: left
        };
    };

    /**
     * Main plugin object
     * @param el DOM element where the plugin will be instantiated
     */
    var PicTip = function (el) {
        var $el = $(el), opts = {}, spots = [],
            /**
             * Attaches the event handlers
             */
            attachEventHandlers = function () {
                var self = this;
                // close tooltips when click the parent element
                $el.on('click', function (e) {
                    e.preventDefault();
                    self.closeToolTips();
                });
                // prevent to close the tooltip when clicked because of the event propagation
                $el.on('click', '.spot-tooltip', function (e) {
                    e.stopPropagation();
                });
                // tooltip close event
                $el.on('click', '.spot-tooltip-close', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    spots[$(this).parent('.spot-tooltip').data('index')].closeToolTip($el, opts.close, opts.onCloseToolTip);
                });
                // attach spots event handler
                $el.on(opts.eventType, opts.spotClass, function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $this = $(this);
                    if (!$this.hasClass('spot-open')) {
                        // close all opened tooltips
                        // TODO: add a configuration option to allow more than one open tooltip at a time
                        self.closeToolTips();
                        // open the tooltip
                        spots[$this.data('index')].openToolTip($el, opts.show, opts.onShowToolTip);
                    } else {
                        // close the tooltip
                        spots[$this.data('index')].closeToolTip($el, opts.close, opts.onCloseToolTip);
                    }
                });
            };

        /**
         * Close all open tooltips
         */
        this.closeToolTips = function () {
            for (var i = 0; i < spots.length; i++) {
                if(spots[i].open){
                    spots[i].closeToolTip($el, opts.close, opts.onCloseToolTip);
                }
            }
        };
        /**
         * Destroy the plugin instance
         */
        this.destroy = function () {
            this.closeToolTips();
            $el.off('click').off(opts.eventType);
            $el.find(opts.spotClass).remove();
            $el.find('.spot-tooltip').remove();
        };
        /**
         * Initialize the plugin instance
         * @param object containing the provided plugin options
         */
        this.init = function (options) {
            opts = $.extend({}, $.fn.pictip.options, options);
            this.destroy(); // init a clean instance
            var i = 0, $spots = [], $tooltips = [],
                spotTemplate = $(opts.spotTemplate).addClass(opts.spotClass.replace('.', '')),
                spot = null,
                $spot = null,
                tooltip = null,
                $tooltip;
            for (i = 0; i < opts.spots.length; i++) {
                spot = new Spot(i, opts.spots[i]);
                tooltip = new ToolTip(i, opts.spots[i], opts.tooltip);
                spot.tooltip = tooltip;
                $spot = spot.create(i, spotTemplate);
                spots.push(spot);
                $spots.push($spot);
                $tooltip = tooltip.create();
                $tooltips.push($tooltip);
            }
            $el.append($spots, $tooltips);

            $el.find(opts.spotClass).fadeIn(200); // show spots
            attachEventHandlers.call(this);
        };
        // Expose the instance
        $el.data('pictip', this);
    };

    // Extending the jQuery library
    $.fn.pictip = function (options) {
        return this.each(function () {
            new PicTip(this).init(options);
        });
    };

    // Default options
    $.fn.pictip.options = {
        spots: [], // spots array
        spotClass: '.spot', // spots class
        spotTemplate: '<a href="#"></a>', // HTML markup to create the spots
        eventType: 'click', // type of event that trigger the tooltip/caption display action (click, hover)
        tooltip: true, // display tooltip/caption? (use caption for a better mobile experience)
        show: null, // function that overrides the plugin default show functionality: function(tooltip){}
        close: null, // function that overrides the plugin default close functionality: function(tooltip){}
        onShowToolTip: null, // function executed after the tooltip is displayed: function(spot, tooltip){}
        onCloseToolTip: null // function executed after the tooltip is closed: function(spot, tooltip){}
    };

})(jQuery);