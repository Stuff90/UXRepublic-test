/*
@contributors :
  - @simonbernard90
*/


define(['jquery'], function($){

	$.fn.slider = function(k){
		var slider = this;

		slider.arrange = function($tiles){
			var $sample = $tiles.filter(function(index){
				return index < (slider.current * 3) + 3 && index >= (slider.current * 3)
			});

			$sample.each(function(i){
				setTimeout(function($theTile) {
					var W = $theTile.parent().width(),
						H = $theTile.parent().height();


					if(i == 0) {
						$theTile.css({
							top:'5%',
							left:(100 * (W / 2 - 260) / W) + '%'
						});
					} else if (i == 1) {
						$theTile.css({
							top:'20%',
							left:(100 * (W / 2 + 100) / W) + '%'
						});
					} else {
						$theTile.css({
							top:((100 * $theTile.height() / H) + 5 ) + '%',
							left:(100 * (W / 2 - 200) / W) + '%'
						});
					}

					setTimeout(function() {
						$theTile.trigger('slider:tile:ready');
					}, 600);
				}($(this).addClass('active')), 100 * i + 100);
			});
		}

		slider.update = function(tiles){
			tiles.css({top: '', left: ''});

			if(slider.current >= slider.max) slider.current = 0;
			if(slider.current < 0) slider.current = slider.max - 1;

			slider.arrange(tiles.removeClass('active'));
		}


		slider.next = function(e){
			e.preventDefault();
			slider.current++;
			slider.update($(e.target).siblings('.ui-slider-tile'));
		}
		slider.prev = function(e){
			e.preventDefault();
			slider.current--;
			slider.update($(e.target).siblings('.ui-slider-tile'));
		}

		slider.init = function(){
			var $root 	= $(this).addClass('ui-slider'),
				$tiles 	= $root.children(),
				trigger = $('<a>').addClass('ui-slider-trig'),
				dots 	= $('<ul>').addClass('ui-slider-dots');

			$tiles.each(function(){
				$(this).addClass('ui-slider-tile');
			});

			$root.prepend(
				trigger.clone().text('<').addClass('ui-slider-left').on('click', slider.prev),
				trigger.clone().text('>').addClass('ui-slider-right').on('click', slider.next),
				dots
			);

			slider.current  = 0;
			slider.max 		= Math.ceil($tiles.length / 3);
			slider.arrange($tiles , slider.current);
		};

		return this.each(slider.init);
	};
});
