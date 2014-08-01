/*
@contributors :
  - @simonbernard90
*/


define(['jquery', 'moment'], function($, moment){

	$.fn.calendar = function(k){
		var calendar = this;

		calendar.today = new moment();

		calendar.draw = function(date){
			calendar.activeDate = moment(date, 'YYYY-MM-DD');

			var headerWrapper 	= calendar.$root.find('.ui-cal-header'),
				datesWrapper 	= calendar.$root.find('.ui-cal-date'),
				drawingDate		= moment(date, 'YYYY-MM');


			headerWrapper.find('span')
				.text(calendar.activeDate.format('MMMM'))
				.last().text(calendar.activeDate.format('YYYY'));

			datesWrapper.children().each(function(i){
				var $date = $(this).removeClass('active today date').empty();
				if(i >= drawingDate.format('e') && calendar.activeDate.format('MM') == drawingDate.format('MM')){

					$date.text(drawingDate.format('D'))
						.addClass(function(){
							var classes = 'date ';

							if(drawingDate.format('YYYY-MM-DD') == calendar.today.format('YYYY-MM-DD')) classes += ' today';
							if(drawingDate.format('YYYY-MM-DD') == calendar.activeDate.format('YYYY-MM-DD')) classes += ' active';

							return classes;
						});

					drawingDate.add(1,'days');

				};
			});
		}

		calendar.update = function($target , type){
			if(type == 'day'){
				if($target.text().length > 0)
					calendar.draw(calendar.activeDate.date( $target.text() ).format('YYYY-MM-DD'));
			} else {
				calendar.draw(calendar.activeDate[ $target.parent('.next').length !== 0 ? 'add' : 'subtract' ](1,type).format('YYYY-MM-DD'));
			}
		}

		calendar.updateDate = function(e, root){
			e.preventDefault();
			calendar.update($(e.target) , 'day');
		}

		calendar.updateMonth = function(e, root){
			e.preventDefault();
			calendar.update($(e.target) , 'month');
		}

		calendar.updateYear = function(e, root){
			e.preventDefault();
			calendar.update($(e.target) , 'year');
		}

		calendar.buildLayout = function(i, root){
			calendar.$root = $(root);

			var header = $('<div>').addClass('ui-cal-header')
							.append($('<p>')
								.append($('<span>'), $('<span>')));

			var controls = $('<div>').addClass('ui-cal-controls')
							.append($('<ul>').addClass('previous')
								.append(
									$('<li>').text('<<').on('click', calendar.updateYear),
									$('<li>').text('<').on('click', calendar.updateMonth)))
							.append($('<ul>').addClass('next')
								.append(
									$('<li>').text('>').on('click', calendar.updateMonth),
									$('<li>').text('>>').on('click', calendar.updateYear)))

			var month = $('<div>').addClass('ui-cal-month')
							.append($('<ul>').addClass('ui-cal-weekdays').append(function(){
								var week = ['s','m','t','w','t','f','s'], elts = [];

								for (var i = 0; i < week.length; i++) {
									elts.push($('<li>').text(week[i]));
								};
								return elts;
							}))
							.append($('<ul>').addClass('ui-cal-date').append(function(){
								var elts = [];

								for (var i = 0; i < 42; i++) {
									elts.push($('<li>').on('click', calendar.updateDate));
								};
								return elts;
							}))


			calendar.$root.addClass('ui-cal').append(header, controls, month);
			calendar.draw(calendar.today.format('YYYY-MM-DD'));
			// setTimeout(function() {
			// 	calendar.draw(moment('2014-7-6','YYYY-MM-DD').format('YYYY-MM-DD'));
			// }, 2000);
		}

		return this.each(calendar.buildLayout);
	};
});
