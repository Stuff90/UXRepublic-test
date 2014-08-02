/*
@contributors :
  - @simonbernard90
*/


define(['jquery'], function($){

	$.fn.gauge = function(k){
		var gauge = this;

		return this.each(gauge.init);
	};
});
