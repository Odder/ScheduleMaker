var exports = function () {

	 /**
	 * Export to HTML
	 * @return <string> exportText
	 */
	function getHTML() {
		var Schedule = getJSON(),
			HTMLcontent = $('<div>');

		if (Schedule) {
			HTMLcontent.append(
				$('<h1 class="compTitle">').html(Schedule.name)
			);

			for (var i = 0; i < Schedule.details.length; i++) {

				var currentDay = Schedule.details[i],
					table = $('<table class="compTable">');

				HTMLcontent.append(
					$('<h2 class="compDay">').html(Schedule.details[i].day)
				);

				for (var j = 0; j < currentDay.info.length; j++) {

					var row = currentDay.info[j];
					tr = $('<tr class="compTr">');

					tr.append(
						$('<td>').html(row.start)
					).append(
						$('<td>').html(row.event)
					).append(
						$('<td>').html(row.round)
					).append(
						$('<td>').html(row.format)
					).append(
						$('<td>').html(row.cutoff)
					).append(
						$('<td>').html(row.hard)
					).append(
						$('<td>').html(row.qualifiers)
					)

					table.append(tr);

				}

				HTMLcontent.append(table);

			}

		}
		else {
			return false;
		}

		return HTMLcontent.prop('outerHTML');

	}



	/**
	 * Grabs information from the input boxes
	 * @return <JSON> Schedule
	 */
	function getJSON() {
		var Schedule = {
			'name': $('#competition').val(),
			'settings': {
				'timeZoneAbbr': $('setting.time-zone-abbr').val(),
				'GMTOffset': $('setting.gmt-offset').val()
			},
			'details': []
		};

		$('.tabs').each( function () {

			var info = [];
			$(this).find('.row.smallMarginBottom').each(function () {
				info.push({
					'event': 		$(this).find('.event').val(),
					'eventId': 		$(this).find('.eventId').val(),
					'round': 		$(this).find('.round').val(),
					'format': 		$(this).find('.format').val(),
					'start': 		$(this).find('.start').val(),
					'duration': 	$(this).find('.duration').val(),
					'cutoff': 		$(this).find('.cutoff').val(),
					'hard': 		$(this).find('.hard').val(),
					'qualifiers': 	$(this).find('.qualifiers').val()
				});
			});


			Schedule.details.push({
				'day': $(this).attr('day'),
				'date': $('setting.date').val(),
				'info': info
			});
		});

		return Schedule;
	}



	return {
		'JSON' : getJSON,
		'HTML' : getHTML,
	}
}();
