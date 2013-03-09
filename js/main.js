
prettyPrint();

$("#pictip-demo").pictip({
	spots: [
		{top: '75px', left: '25px', content: '<p>Nice Mountain!</p>', tooltipPosition:'br'},
		{top: '175px', left: '125px', content: '<p>Get into the water!</p>', tooltipPosition:'tr'},
		{top: '65px', left: '165px', content: '<p>Perfect sunset!</p>', tooltipPosition:'tr'}
	],
	//tooltip: false,
	onShowToolTip: function(spot, tooltip){
		//$(spot).text('-');
	},
	onCloseToolTip: function(spot, tooltip){
		//$(spot).text('+');
	}
});
var pictip = $("#pictip-demo").data('pictip');