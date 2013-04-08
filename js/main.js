
prettyPrint();

$("#pictip-demo").pictip({
	spots: [
		{top: '75px', left: '25px', content: '<p>Nice Mountain!</p>', tooltipPosition:'br'/*, tooltipClose: true*/},
		{top: '175px', left: '125px', content: '<p>Get into the water!</p>', tooltipPosition:'tr'},
		{top: '65px', left: '165px', content: '<p>Perfect sunset!</p>', tooltipPosition:'bl'}
	],
	//tooltip: false,
	onShowToolTip: function(spot, tooltip){},
	onCloseToolTip: function(spot, tooltip){
		//console.log(spot, tooltip);
	}
});
var pictip = $("#pictip-demo").data('pictip');