module("pictip");
 
test("Elements creation", function() {
	expect(2);
	var $pictip = $('#pictip');

	$pictip.pictip({
		spots: [
			{top: '75px', left: '25px', content: 'content-1', tooltipPosition:'br'},
			{top: '175px', left: '125px', content: 'content-2', tooltipPosition:'tr'},
			{top: '65px', left: '165px', content: 'content-3', tooltipPosition:'bl'}
		]
	});

	equal(($pictip.find('.spot').length), 3, "Spots creation succeeds" );
	equal(($pictip.find('.spot-tooltip').length), 3, "Tooltips creation succeeds" );
});

test("User interaction", function() {
	expect(2);
	var $pictip = $('#pictip');

	$pictip.pictip({
		spots: [
			{top: '75px', left: '25px', content: 'content-1', tooltipPosition:'br'},
			{top: '175px', left: '125px', content: 'content-2', tooltipPosition:'tr'},
			{top: '65px', left: '165px', content: 'content-3', tooltipPosition:'bl'}
		],
		onShowToolTip: function(spot, tooltip){
			ok(true, "onShowToolTip is called");
		}
	});
	
	$pictip.find('.spot-0').click();
	ok($pictip.find('.spot-tooltip-0').is(':visible'), "Opening Tooltip succeeds");
});