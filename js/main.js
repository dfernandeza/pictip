prettyPrint();

$('#pictip-demo').pictip({

	spots: [
		{top: '75px', left: '25px', content: '<p>Nice Mountain!</p>', tooltipPosition:'br'/*, tooltipClose: true*/},
		{top: '175px', left: '125px', content: '<p>Get into the water!</p>', tooltipPosition:'tr'},
		{top: '65px', left: '165px', content: '<p>Perfect sunset!</p>', tooltipPosition:'bl'}
	],

	// Functions onShowToolTip and onCloseToolTip are not executed if show and close functions are defined
	onShowToolTip: (!Modernizr.csstransitions) ? function(spot, tooltip){
		console.log('Opening...', spot, tooltip);
	} : null,

	onCloseToolTip: (!Modernizr.csstransitions) ? function(spot, tooltip){
		console.log('Closing...', spot, tooltip);
	} : null,

	// Use CSS transitions if they are available
	show: (Modernizr.csstransitions) ? function(tooltip){
		tooltip.addClass('is-open');
		console.log('Opening...', tooltip);
	} : null,

	close: (Modernizr.csstransitions) ? function(tooltip){
		tooltip.removeClass('is-open');
		console.log('Closing...', tooltip);
	} : null

});

// You can access the instance with
// var pictip = $('#pictip-demo').data('pictip');