module("pictip");
 
test("Elements creation", function() {
	var $pictip = $('#pictip');

	$pictip.pictip({
		spots: [
			{top: '75px', left: '25px', content: 'content-1', tooltipPosition:'br'},
			{top: '175px', left: '125px', content: 'content-2', tooltipPosition:'tr'},
			{top: '65px', left: '165px', content: 'content-3', tooltipPosition:'bl'}
		]
	});

	ok(($pictip.find('.spot').length == 3), "Spots creation succeeds" );
	ok(($pictip.find('.spot-tooltip').length == 3), "Tooltips creation succeeds" );
});

test("User interaction", function() {
	var $pictip = $('#pictip');

	$pictip.pictip({
		spots: [
			{top: '75px', left: '25px', content: 'content-1', tooltipPosition:'br'},
			{top: '175px', left: '125px', content: 'content-2', tooltipPosition:'tr'},
			{top: '65px', left: '165px', content: 'content-3', tooltipPosition:'bl'}
		]
	});

	$pictip.find('.spot-0').click();
	ok($pictip.find('.spot-tooltip-0').is(':visible'), "Opening Tooltip");
});