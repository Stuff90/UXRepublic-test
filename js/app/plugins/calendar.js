/*
@contributors :
  - @simonbernard90
*/


define(['jquery', 'moment'], function($, moment){

	$.fn.calendar = function(k){
		var calendar = this;

		calendar.M = new moment();

		calendar.updateMonth = function(e, root){
			e.preventDefault();
			var $trigger = $(e.target);

			if($trigger.parent('.next').length !== 0){
				console.log('var1, var2');
			}
		}

		calendar.updateYear = function(e, root){
			e.preventDefault();
			var $trigger = $(e.target);

			if($trigger.parent('.next').length !== 0){
				console.log('var1, var2');
			}
		}

		calendar.buildLayout = function(i, root){
			calendar.$root = $(root);

			var header = $('<div>').addClass('ui-cal-header')
							.append($('<p>')
								.append(
									$('<span>').text(calendar.M.format('MMMM')),
									$('<span>').text(calendar.M.format('YYYY'))));

			var controls = $('<div>').addClass('ui-cal-controls')
							.append($('<ul>').addClass('next')
								.append(
									$('<li>').text('<<').on('click', calendar.updateYear),
									$('<li>').text('<').on('click', calendar.updateMonth)))
							.append($('<ul>').addClass('previous')
								.append(
									$('<li>').text('<').on('click', calendar.updateMonth),
									$('<li>').text('<<').on('click', calendar.updateYear)))

			var month = $('<div>').addClass('ui-cal-month')
							.append($('<ul>').append(function(){
								var week = ['m','t','w','t','f','s','s'],
									elts = [];

								for (var i = 0; i < week.length; i++) {
									elts.push($('<li>').text(week[i]));
								};
								return elts;
							}))
							.append($('<ul>').append(function(){
								var elts = [];

								for (var i = 0; i < 42; i++) {
									elts.push($('<li>'));
								};
								return elts;
							}))


			calendar.$root.addClass('ui-cal').append(header, controls, month);
		}

		console.log(calendar.M.format('dd'));
		console.log(calendar.M.add(5,'days').format('dd'));


		return this.each(calendar.buildLayout);
	};
});
