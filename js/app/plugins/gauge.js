/*
@contributors :
  - @simonbernard90
*/


define(['jquery'], function($){

	$.fn.gauge = function(){

		var gauge = this,
			W = H = 100;


	 	gauge.drawFullCirle = function(aGauge) {
			aGauge.clearRect(0, 0, W, H);

			aGauge.beginPath();
			aGauge.strokeStyle = "#e5e5e5";
			aGauge.lineWidth = 20;
			aGauge.arc(W/2, H/2, 40, 0, Math.PI*2, false);
			aGauge.stroke();
		};


	 	gauge.drawPercentValue = function(aGauge , arcEndValue , text) {
			var text = text || Math.floor( arcEndValue / 6.2 * 100),
				text_width = aGauge.measureText(text).width;

			aGauge.strokeStyle = aGauge.arcColor;
			aGauge.fillStyle = aGauge.arcColor;
			aGauge.font = "20px 'Arial Black'";
			aGauge.fillText(text, W / 2 - text_width , H / 2 + 5);

			aGauge.strokeStyle = aGauge.arcColor;
			aGauge.fillStyle = aGauge.arcColor;
			aGauge.font = "13px 'Arial Black'";
			aGauge.fillText('%', W / 2 + text_width * .5, H / 2 + 5);

		};


	 	gauge.drawArc = function(aGauge , arcEndValue , text) {

			aGauge.clearRect(0, 0, W, H);

			gauge.drawFullCirle(aGauge);
			gauge.drawPercentValue(aGauge , arcEndValue , text);

			aGauge.beginPath();
			aGauge.strokeStyle = aGauge.arcColor;
			aGauge.lineWidth = 20;
			aGauge.arc( W / 2 , H / 2, 40 , 0 - 90 * Math.PI / 180 , arcEndValue - 90 * Math.PI / 180, false);
			aGauge.stroke();


			return arcEndValue;
		}

	 	gauge.init = function() {
			var self     	= $(this).children('.gauge'),
				theIncrement= 0,
				theMaxRad	= (self.data('percent') * 360.0) * (Math.PI / 180),
				theGaugeElt = self.get(0).getContext("2d");

			theGaugeElt.arcColor = self.data('color');

			gauge.drawFullCirle(theGaugeElt);

			$(this).one('gauge:draw',function(e){

				var theDrawingInterval = setInterval(function(){
					theIncrement += Math.PI / 180;
					var currentIncrementationValue = gauge.drawArc( theGaugeElt , theIncrement);
					if(currentIncrementationValue > theMaxRad){
						gauge.drawArc( theGaugeElt , theIncrement , (self.data('percent') * 100.0),false);
						clearInterval(theDrawingInterval)
					}
				},10);
			})
		}

		return this.each(gauge.init);
	}
});
