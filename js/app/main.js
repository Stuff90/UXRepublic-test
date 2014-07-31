/*
@contributors :
  - @simonbernard90
*/

var $doc = $(document);

$doc.ready(function() {
	console.info('Page is ready !');

	$doc.find('.calendar').calendar();
});