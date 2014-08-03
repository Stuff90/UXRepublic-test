/*
@contributors :
  - @simonbernard90
*/



require([
 	'jquery',

 	'plugins/slider',
 	'plugins/calendar',
 	'plugins/gauge'

], function($){

	var $doc = $(document);

	$doc.ready(function() {
		console.info('Page is ready !');

		$doc.find('.slider').slider();
		$doc.find('.calendar').calendar();

		var gauges = $doc.find('.gauge-wrapper').gauge();

		gauges.closest('.tile').on('slider:tile:ready', function(){
		 	$(this).find('.gauge-wrapper').trigger('gauge:draw');
		})
	});

});
