/*
 * jQuery picTip Plugin
 * Copyright (c) 2013
 * Version: 0.1.0
 * Author: Daniel Fernandez Arias @dfernandeza
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 */

(function ($) {
    /** 
     * Creates a Spot instance
     * @param conf literal object containing the Spot configuration
     */
    var Spot = function (conf) {
        this.top = conf.top;
        this.left = conf.left;
        this.content = conf.content;
        this.tooltipPosition = conf.tooltipPosition; // tooltip position (tl, tr, tc, bl, br, bc, cl, cr)
        this.tooltipId = conf.tooltipId;
        this.tooltipCss = conf.tooltipCss;
        this.tooltipClose = conf.tooltipClose; // add the close link?
	};

    /**
     * Creates the spot DOM element
     * @param index     spot identifier
     * @param $template HTML template (wrapped in a jQuery object) to create the spot, this value is part of the plugin options 
     * @return the spot DOM element (wrapped in a jQuery object)
     */
    Spot.prototype.createSpot = function (index, $template) {
        var $spot = $template.clone();
        $spot.css({
            position: 'absolute',
            top: this.top,
            left: this.left,
            display: 'none'
        }).addClass('spot-' + index);
        $spot.data({
            'index': index,
            'content': this.content,
            'tooltipPosition': this.tooltipPosition,
            'tooltipId': this.tooltipId,
            'tooltipCss': this.tooltipCss,
            'tooltipClose': this.tooltipClose
        });
        return $spot;
    };

    /**
     * Main plugin object
     * @param el DOM element where the plugin will be instantiated
     */
    var PicTip = function (el) {
        var $el = $(el), pictipOpts = {},
            /**
             * Calculates the tooltip position. Relative to the spot position.
             * @param $spot    spot element (wrapped in a jQuery object) 
             * @param $tooltip tooltip element (wrapped in a jQuery object) 
             * @return object containing the top and left position
             */
            calculateTooltipPosition = function ($spot, $tooltip) {
                var spot = $spot[0], tooltip = $tooltip[0], top = 0, left = 0,
                    position = $spot.data('tooltipPosition'),
                    // Spot positioning
                    spotTop = parseInt(spot.style.top, 10),
                    spotLeft = parseInt(spot.style.left, 10),
                    // Spot dimentions
                    spotHeight = $spot.outerHeight(),
                    spotWidth = $spot.outerWidth(),
                    // Tooltip dimentions
                    tooltipHeight = $tooltip.outerHeight(),
                    tooltipWidth = $tooltip.outerWidth(),
                    // relocate the tooltip to overlap the spot
                    relocation = spotWidth / 2;

                // top positions
                if (position === "tl") {
                    top = spotTop - tooltipHeight + relocation;
                    left = spotLeft - tooltipWidth + relocation;
                }
                if (position === "tr") {
                    top = spotTop - tooltipHeight + relocation;
                    left = spotLeft + spotWidth - relocation;
                }
                if (position === "tc") {
                    top = spotTop - tooltipHeight + relocation;
                    left = spotLeft - (tooltipWidth / 2 - spotWidth / 2);
                }
                // bottom positions
                if (position === "bl") {
                    top = spotTop +  spotHeight - relocation;
                    left = spotLeft - tooltipWidth + relocation;
                }
                if (position === "br") {
                    top = spotTop +  spotHeight - relocation;
                    left = spotLeft + spotWidth - relocation;
                }
                if (position === "bc") {
                    top = spotTop +  spotHeight - relocation;
                    left = spotLeft - (tooltipWidth / 2 - spotWidth / 2);
                }
                // center positions
                if (position === "cl") {
                    top = spotTop -  (tooltipHeight / 2 - spotHeight / 2);
                    left = spotLeft - tooltipWidth + relocation;
                }
                if (position === "cr") {
                    top = spotTop -  (tooltipHeight / 2 - spotHeight / 2);
                    left = spotLeft + spotWidth - relocation;
                }
                return {
                    top: top,
                    left: left
                };
            },
            /**
             * Create tooltip
             * @param $spot spot related to the tooltip
             */
            createToolTip = function ($spot) {
                var $ttContainer = $('<div/>', {
                        'id': $spot.data('tooltipId'),
                        'class': 'spot-tooltip spot-tooltip-' + $spot.data('index')
                    }),
                    $ttClose = $spot.data('tooltipClose') ? $('<a/>', {
                        'class': 'spot-tooltip-close',
                        'href': '#',
                        'text': 'X'
                    }) : $(),
                    $ttContentContainer = $('<div/>', {'class': 'spot-tooltip-content'}),
                    pluginCss = {},
                    customCss = {};
                // create the tooltip
                $ttContentContainer.append($spot.data('content'));
                $ttContainer.append($ttClose, $ttContentContainer);
                $el.append($ttContainer); // append the node tooltip to the document
                // style the tooltip
                if (pictipOpts.tooltip) {
                    pluginCss = calculateTooltipPosition($spot, $ttContainer);
                } else {
                    pluginCss = {top: 0, left: 0, width: '100%'}; // use captions instead of tooltips
                }
                customCss = $.extend(pluginCss, $spot.data('tooltipCss')); // user adds custom css
                $ttContainer.css(customCss).fadeIn(200); // TODO: refactor to support different types of animations

                // add tooltip close event 
                if ($spot.data('tooltipClose')) {
                    $('.spot-tooltip-close').on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $(pictipOpts.spotClass).removeClass('spot-open');
                        $(this).parent('.spot-tooltip').fadeOut(200, function () { // TODO: refactor to support different types of animations
                            $(this).remove();
                        });
                        pictipOpts.onCloseToolTip($spot[0], $ttContainer[0]);
                    });
                }

                pictipOpts.onShowToolTip($spot[0], $ttContainer[0]);
            },
            /**
             * Attaches the event handlers
             */
            attachEventHandlers = function () {
                var self = this;
                // close tooltips when click the parent element
                $el.on('click', function (e) {
                    self.closeToolTips();
                });
                // prevent to close the tooltip when clicked because of the event propagation
                $el.on('click', '.spot-tooltip', function (e) {
                    e.stopPropagation();
                });
                // attach spots event handler
                $el.on(pictipOpts.eventType, pictipOpts.spotClass, function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $this = $(this),
                        $tooltip = $('.spot-tooltip-' + $this.data('index'));
                    // TODO: should be refactored to support more than one open tooltip (if !allowMultipleToolTips)
                    $('.spot-tooltip').not($tooltip).fadeOut(200, function () {
                        $(this).remove();
                    });
                    pictipOpts.onCloseToolTip($('.spot-open')[0], $('.spot-tooltip')[0]);
                    $(pictipOpts.spotClass).not($this).removeClass('spot-open');
                    if (!$this.hasClass('spot-open')) {
                        // open the tooltip
                        createToolTip($this);
                    } else {
                        // close the tooltip
                        $tooltip.fadeOut(200, function () {
                            $(this).remove();
                        });
                        pictipOpts.onCloseToolTip($this[0], $tooltip[0]);
                    }
                    $this.toggleClass('spot-open');
                });
            };


        /**
         * Close all open tooltips
         */
        this.closeToolTips = function () {
            pictipOpts.onCloseToolTip($('.spot-open')[0], $('.spot-tooltip')[0]);
            $(pictipOpts.spotClass).removeClass('spot-open');
            $('.spot-tooltip').fadeOut(200, function () { // refactor to support different animations
                $(this).remove();
            });
        };
        /**
         * Destroy the plugin instance
         */
        this.destroy = function () {
            this.closeToolTips();
            $el.off('click').off(pictipOpts.eventType);
            $(pictipOpts.spotClass).fadeOut(200, function () {
                $(this).remove();
            });
        };
        /**
         * Initialize the plugin instance
         * @param object containing the provided plugin options
         */
        this.init = function (options) {
            pictipOpts = options = $.extend({}, $.fn.pictip.options, options);
            this.destroy(); // init a clean instance
            var self = this, i = 0,
                spotTemplate = $(options.spotTemplate).addClass(options.spotClass.replace('.', ''));
            for (i = options.spots.length - 1; i >= 0; i--) {
                $el.append(new Spot(options.spots[i]).createSpot(i, spotTemplate));
            }
            $(options.spotClass).fadeIn(200); // show spots
            $.proxy(attachEventHandlers, self)();
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
        spotClass: ".spot", // spots class
        spotTemplate: "<a href='#'></a>", // HTML markup to create the spots
        eventType: 'click', // type of event that trigger the tooltip/caption display action (click, hover)
        tooltip: true, // display tooltip/caption? (use caption for a better mobile experience) 
        onShowToolTip: function (spot, tooltip) {}, // function executed after the tooltip is displayed
        onCloseToolTip: function (spot, tooltip) {} // function executed after the tooltip is closed
    };

})(jQuery);