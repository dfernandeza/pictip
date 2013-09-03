module("pictip");
 
test("Elements creation", function() {
	expect(4);
	var $pictip1 = $('#pictip1');
	var $pictip2 = $('#pictip2');

	$pictip1.pictip({
		spots: [
			{top: '75px', left: '25px', content: 'content-1', tooltipPosition:'br'},
			{top: '175px', left: '125px', content: 'content-2', tooltipPosition:'tr'},
			{top: '65px', left: '165px', content: 'content-3', tooltipPosition:'bl'}
		]
	});

	$pictip2.pictip({
		spots: [
			{top: '65px', left: '165px', content: 'content-3', tooltipPosition:'bl'}
		]
	});

	equal(($pictip1.find('.spot').length), 3, "Spots creation succeeds (instance #1)" );
	equal(($pictip1.find('.spot-tooltip').length), 3, "Tooltips creation succeeds (instance #1)" );

	equal(($pictip2.find('.spot').length), 1, "Spots creation succeeds (instance #2)" );
	equal(($pictip2.find('.spot-tooltip').length), 1, "Tooltips creation succeeds (instance #2)" );

});

test("User interaction", function() {
	expect(4);
	var $pictip1 = $('#pictip1');
	var $pictip2 = $('#pictip2');
	var oneOpenSpots = 0;
	var twoOpenSpots = 0;

	$pictip1.pictip({
		spots: [
			{top: '75px', left: '25px', content: 'content-1', tooltipPosition:'br'},
			{top: '175px', left: '125px', content: 'content-2', tooltipPosition:'tr'},
			{top: '65px', left: '165px', content: 'content-3', tooltipPosition:'bl'}
		],
		onShowToolTip: function(spot, tooltip){
			oneOpenSpots++;
			ok(oneOpenSpots === 1, "onShowToolTip is called (instance #1)");
		}
	});

	$pictip2.pictip({
		spots: [
			{top: '65px', left: '165px', content: 'content-3', tooltipPosition:'bl'}
		],
		onShowToolTip: function(spot, tooltip){
			twoOpenSpots++;
			ok(twoOpenSpots === 1, "onShowToolTip is called (instance #2)");
		}
	});
	
	$pictip1.find('.spot-1').click();
	ok($pictip1.find('.spot-tooltip-1').is(':visible'), "Opening Tooltip succeeds (instance #1)");

	$pictip2.find('.spot-0').click();
	ok($pictip2.find('.spot-tooltip-0').is(':visible'), "Opening Tooltip succeeds (instance #2)");

});