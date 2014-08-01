/*
@contributors :
  - @simonbernard90
*/



require([
 	'jquery',

 	'plugins/calendar'

], function($){

	var $doc = $(document);

	$doc.ready(function() {
		console.info('Page is ready !');

		$doc.find('.calendar').calendar();
	});

});
