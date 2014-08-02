/*
@contributors :
  - @simonbernard90
*/


define(['jquery', 'moment'], function($, moment){

	$.fn.calendar = function(k){
		var calendar = this;

		calendar.today 		= new moment();
		calendar.activeDate = new moment();
		calendar.shownDate 	= new moment().date(1);

		calendar.draw = function(){

			var headerWrapper 	= calendar.$root.find('.ui-cal-header'),
				datesWrapper 	= calendar.$root.find('.ui-cal-date').children(),
				drawingMonth	= calendar.shownDate.format('MM');


			headerWrapper.find('span')
				.text(calendar.shownDate.format('MMMM'))
				.last().text(calendar.shownDate.format('YYYY'));

			datesWrapper.each(function(i){
				var $date = $(this).removeClass('active today date').empty();


				if(i >= calendar.shownDate.format('e') && drawingMonth == calendar.shownDate.format('MM')){

					$date.text(calendar.shownDate.format('D'))
						.data('date', calendar.shownDate.dayOfYear())
						.addClass(function(){
							var classes = 'date ';

							if(calendar.shownDate.dayOfYear() == calendar.today.dayOfYear()) classes += ' today';
							if(calendar.activeDate.dayOfYear() == calendar.shownDate.dayOfYear()) classes += ' active';

							return classes;
						});

					calendar.shownDate.add(1,'days');
				};
			});
			return calendar;
		}

		calendar.updateDate = function(e, root){
			e.preventDefault();
			calendar.activeDate.dayOfYear($(e.target).data('date'));
			calendar.draw();
		}

		calendar.updateMonth = function(e, root){
			e.preventDefault();
			calendar.shownDate[ $(e.target).parent('.next').length !== 0 ? 'add' : 'subtract' ](1,'month');
			calendar.draw();
		}

		calendar.updateYear = function(e, root){
			e.preventDefault();
			calendar.shownDate[ $(e.target).parent('.next').length !== 0 ? 'add' : 'subtract' ](1,'year');
			calendar.draw();
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
			calendar.draw();
		}

		return this.each(calendar.buildLayout);
	};
});
