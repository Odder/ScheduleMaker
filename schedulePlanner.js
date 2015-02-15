var main = function () {
	var formats,
		events = ['3x3x3',
				  '4x4x4',
				  '5x5x5',
				  '6x6x6',
				  '7x7x7',
				  '2x2x2',
				  'Pyraminx',
				  'Megaminx',
				  'Square-1',
				  'Clock',
				  '3x3x3 Blindfolded',
				  '3x3x3 Multi BLD',
				  '4x4x4 Blindfolded',
				  '5x5x5 Blindfolded',
				  'Fewest Moves',
				  '3x3x3 One-handed',
				  'Skewb'],
		rounds = ['First round',
				  'Second round',
				  'Semi Final',
				  'Final',
				  'Combined Final',
				  'Combined First Round'],
		formats = ['Best of 1',
				   'Best of 2',
				   'Mean of 3',
				   'Average of 5'],
		shiftDown = false;
	
	/**
	 * Search for an event.
	 *
	 * @param element The element containing the search string
	 * @param element The array to search from
	 * @return void
	 */
	function searchAndFill(element, list) {
		var result,
			counter = 0;

		for (a = 0; a < list.length; a++) {
			if (list[a].toUpperCase().indexOf(element.value.toUpperCase()) != -1) {
				counter++;
				if (counter === 1) {
					result = list[a];
				}
				else if (counter === 2) {
					break;
				}
			}
		}

		if (counter == 1) {
			element.value = result;
		}
	}

	/**
	 * Build new row
	 * @return void
	 */
	function addRow() {
		$('.lastRow').removeClass('lastRow');
		var inputStructure = [$('<div>').addClass('col-xs-2 mediumMarginBottom').append($('<input type="text" list="events">').addClass('form-control lastRow event')),
							  $('<div>').append($('<input type="hidden">').addClass('form-control lastRow eventId')),
							  $('<div>').addClass('col-xs-2 mediumMarginBottom').append($('<input type="text">').addClass('form-control lastRow round ').prop('disabled', true)),
							  $('<div>').addClass('col-xs-2 mediumMarginBottom').append($('<input type="text">').addClass('form-control lastRow format lastRow')),
							  $('<div>').addClass('col-xs-1 mediumMarginBottom').append($('<input type="text">').addClass('form-control lastRow start ').prop('maxlength', 5).prop('disabled', true)),
							  $('<div>').addClass('col-xs-1 mediumMarginBottom').append($('<input type="text">').addClass('form-control lastRow duration ').prop('maxlength', 5)),
							  $('<div>').addClass('col-xs-1 mediumMarginBottom').append($('<input type="text">').addClass('form-control lastRow cutoff ').prop('maxlength', 5)),
							  $('<div>').addClass('col-xs-1 mediumMarginBottom').append($('<input type="text">').addClass('form-control lastRow hard ').prop('maxlength', 5)),
							  $('<div>').addClass('col-xs-1 mediumMarginBottom').append($('<input type="text">').addClass('form-control lastRow qualifiers ').prop('disabled', true)),
							  $('<div>').addClass('col-xs-1 mediumMarginBottom').append($('<button>').addClass('form-control lastRow deleteRow glyphicon glyphicon-remove btn-danger'))],
			newRow = $('<div>').addClass('row smallMarginBottom').append(inputStructure);
			console.log(newRow);
		$('#tabs-1').append(newRow); 
		console.log('new row event ', $('.lastRow').first());
		setTimeout(function() {
			$('.lastRow').first().focus();
		}, 100);

		updateListeners();
	};


	/**
	 * time input magic
	 * @param element element to read from
	 * @return void
	 */
	function easyTimeInput(element) {
		var currentValue = element.value,
			newValue;

		newValue = stringToTime(currentValue.replace(/[\.\:\,]/g, ''));
		element.value = newValue;
	}

	/**
	 * Makes string input into a readable time view
	 * @param string string to manipulate
	 * @return string readable time format
	 */
	function stringToTime(string) {
		string = pad(string, 4);
		if (string.length > 4) {
			string = string.substr(0, 4);
		}
		if (string.length > 2) {
			string = string.substr(0, string.length - 2) + ":" + string.substr(-2);
		}
		return string;
	}

	/**
	 * Updates all the round names so the fit with WCA regulations
	 * @return void
	 */
	function updateRoundNames() {
		var eventRounds = $('.round');
		eventRounds.val('');

		for (a = 0; a < events.length; a++) {

			var currentEventRounds = $('.eventId[value="' + events[a] + '"]');
			var currentEventLength = currentEventRounds.length;

			for (b = 0; b < currentEventRounds.length; b++) {
				var roundInput = $(currentEventRounds[b]).parent().parent().find('.round')[0];
				var cutoff = $(currentEventRounds[b]).parent().parent().find('.cutoff')[0].value;

				$(roundInput).closest('.row').find('.qualifiers').prop('disabled', true);

				currentEventLength = currentEventLength > 4 ? 4 : currentEventLength;


				if (cutoff != '') {
					roundInput.value = 'Combined ';
				}
				else {
					roundInput.value = '';
				}

				if (b > 3) {
					roundInput.value = 'Error, too many rounds!';
					continue;
				}		


				$(roundInput).closest('.row').find('.qualifiers').prop('disabled', false);

				if (b + 1 === currentEventLength) {
					roundInput.value += 'Final';
					if(1 == currentEventLength) $(roundInput).closest('.row').find('.qualifiers').prop('disabled', true);
					continue;
				}

				else if (b === 0) {
					roundInput.value += 'First Round';
					$(roundInput).closest('.row').find('.qualifiers').prop('disabled', true);
					continue;
				}

				else if (b === 1) {
					roundInput.value += 'Second Round';
					continue;
				}

				else if (b + 2 === currentEventLength) {
					roundInput.value += 'Semi Final';
					continue;
				}
			}
		}

	}

	/**
	 * Load data!
	 */
	function loadSchedule() {

		var data = localStorage.getItem('ScheduleData').split(','),
			dataLen = data.length,
			rowCount = ((dataLen - 2) / 9) || 0;

		for (var i = 1; i < rowCount; i++) {
			addRow();
		}


		var inputFields = $('input');

		for (var i = 0; i < inputFields.length; i++) {
			$(inputFields[i]).val(data[i]);
		}

		updateRoundNames();
	}

	/**
	 * Add times
	 */
	 function addTimes(a, b) {
		var c,
			d = 0;
		a = a.split(':');
		b = b.split(':');
		console.log(a[0],a[1],b[0],b[1]);
		c = parseInt(a[1]) + parseInt(b[1]);
		console.log(c);
		if (c > 59) {
			c -= 60;
			d += 1;
		}

		d += parseInt(a[0]) + parseInt(b[0]);

		return pad(d, 2) + ':' + pad(c, 2);
	 }

	/**
	 * Update start times
	 */
	function updateStartTimes() {
		var startTimes = $('.start');
		var durationTimes = $('.duration');

		console.log(startTimes.length, durationTimes.length);

		for (a = 1; a < startTimes.length; a++) {
			if (startTimes[a-1].value.length > 4 && durationTimes[a-1].value.length > 4) {
				var newStartTime = addTimes(startTimes[a-1].value, durationTimes[a-1].value);
				startTimes[a].value = newStartTime;
			}
		}
	}


	/**
	 * adds event listeners to all elements
	 * @return void
	 */
	function updateListeners() {
		/* add listener for searching events */
		$('.event').unbind().keyup(function () {
			$(this).parent().parent().find('.eventId')[0].value = this.value;
			updateRoundNames();
		}).change(function () {
			$(this).parent().parent().find('.eventId')[0].value = this.value;
			updateRoundNames();
		});



		/* add listener for searching formats */
		$('.format').unbind().keyup(function () {
			searchAndFill(this, formats);
		});

		/* add listener for time input */
		$('.start').unbind().change(function () {
			easyTimeInput(this);
		});

		/* add listener for time input */
		$('.duration').unbind().change(function () {
			easyTimeInput(this);
		});

		/* add listener for time input */
		$('.cutoff').unbind().change(function () {
			easyTimeInput(this);
			updateRoundNames();
		});

		/* add listener for time input */
		$('.hard').unbind().change(function () {
			easyTimeInput(this);
		});

		/* add listener for deleting a row */
		$('.deleteRow').unbind().click(function () {
			popup.deleteRow(this);
		});

		/* add listener to document for deleting a cell */
		$('.duration').blur(function () {updateStartTimes()});
	}

	updateListeners();
	addRow();
	$('.start').prop('disabled', false)


	/* add listener for new row */
	$('#addRow').click(function () {
		addRow();
	});

	/* add listener for saving */
	$('#save').click(function () {
		popup.save();
	});

	/* add listener for generating schedule */
	$('#generate').click(function () {
		popup.generate();
	});

	/* add listener to document for deleting a cell */
	$(document).keydown(function (event) {
		if ((event.which == 8 || event.which == 46) && ($(':focus') != $('#competition'))) {
			
			/* Check if event is custom input */
			var isCustom = ! ($.inArray($(':focus').val(), events) + 1);
			if ($(':focus').hasClass('event') && isCustom) return;

			/* Not custom? RESET! */
			$(':focus').val('');
			event.preventDefault();
		}

		if(event.which == 13 && ($(':focus') != $('#competition'))) {

			var classNames = $(':focus')[0].className,
				className = '.' + classNames.substr(-6, classNames.length);
				console.log(className)

			if(shiftDown) {
				$(':focus').closest('.row').prev().find(className).focus();
			}
			else {
				if ( $(':focus').hasClass('lastRow')) {
					addRow();
				}
				else {
					$(':focus').closest('.row').next().find(className).focus();
				}
			}
		}

		if((event.which == 16) || (event.which == 17)) {
			shiftDown = true;
		}
	});

	/* add listener to document for deleting a cell */
	$(document).keyup(function (event) {
		if((event.which == 16) || (event.which == 17)) {
			shiftDown = false;
		}
	});

	loadSchedule();
};


$(document).ready(main);
