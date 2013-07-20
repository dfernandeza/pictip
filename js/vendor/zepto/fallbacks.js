(function($, undefined){

	/**
	 * outerHeight and outerWidth support
	 * Taked from https://gist.github.com/pamelafox/1379704
	 * Special thanks to @pamelafox 
	 */
	['width', 'height'].forEach(function(dimension) {
	    var offset, Dimension = dimension.replace(/./, function(m) { return m[0].toUpperCase() });
	    $.fn['outer' + Dimension] = function(margin) {
	      var elem = this;
	      if (elem) {

	      	// Adding this line because Zepto is not getting dimentions from "display: none" elements.
	      	// Definitely not the best approach!
	      	elem.css({'display': 'block'});

	        var size = elem[dimension]();
	        var sides = {'width': ['left', 'right'], 'height': ['top', 'bottom']};
	        sides[dimension].forEach(function(side) {
	          if (margin) size += parseInt(elem.css('margin-' + side), 10);
	        });
	        return size;
	      } else {
	        return null;
	      }
	    };
  	});

	/**
	 * fadeIn support
	 */
	$.fn.fadeIn = function(speed, callback) {
		$(this).show();
	    return $(this).animate({'opacity': 1}, speed, 'linear', function(){
	    	// For some reason once the animation is complete the element is set to "display: none" so,
	    	// I'm forcing the element to show.
	    	$(this).show(); 
	    	if(typeof callback == 'function')
	    		callback.call(this);
	    });
	};

	/**
	 * fadeOut support
	 */
	$.fn.fadeOut = function(speed, callback) {
	    return $(this).animate({'opacity': 0}, speed, 'linear', function(){
	    	$(this).hide();
	    	if(typeof callback == 'function')
	    		callback.call(this);
	    });
	};

})(Zepto);