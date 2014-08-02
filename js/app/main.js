/*
@contributors :
  - @simonbernard90
*/



require([
 	'jquery',

 	'plugins/slider',
 	'plugins/calendar'

], function($){

	var $doc = $(document);

	$doc.ready(function() {
		console.info('Page is ready !');

		$doc.find('.slider').slider();
		$doc.find('.calendar').calendar();
	});

});
