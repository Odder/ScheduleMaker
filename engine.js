var engine = function () {

	 /**
	 * Delete a row
	 * @return void
	 */
	function deleteRow(element) {
		$(element).closest('.row').remove();
		main.updateRows;
	}

	/**
	 * Store data!
	 */
	function saveSchedule() {

		localStorage.setItem("ScheduleDataNew", JSON.stringify(exports.JSON()));

	}

	/**
	 * Load data!
	 */
	function loadSchedule( data ) {
		if ( data == undefined ) {
			data = localStorage.getItem('ScheduleDataNew');
		}

		$('.rowDraggable').remove();

		// console.log('yo!')
		var Schedule = eval('(' + data + ')');
		if (Schedule) {
			$('#competition').val(Schedule.name);

			for (var i = 0; i < Schedule.details.length; i++) {

				var currentDay = Schedule.details[i];
				// day = Schedule.details[i].day

				for (var j = 0; j < currentDay.info.length; j++) {
					var row = currentDay.info[j],
						tab = $('#tabs-' + (i + 1) );

					engine.addRow(i + 1);

					tab.find('.lastRow.event').val(row.event);
					tab.find('.lastRow.eventId').val(row.eventId);
					tab.find('.lastRow.round').val(row.round);
					tab.find('.lastRow.format').val(row.format);
					tab.find('.lastRow.start').val(row.start);
					tab.find('.lastRow.duration').val(row.duration);
					tab.find('.lastRow.cutoff').val(row.cutoff);
					tab.find('.lastRow.hard').val(row.hard);
					tab.find('.lastRow.qualifiers').val(row.qualifiers);
					// console.log(i,j,row.event);
				}
			}


			$('setting.time-zone-abbr').val(Schedule.settings.timeZoneAbbr);
			$('setting.gmt-offset').val(Schedule.settings.GMTOffset);

		}
		else {
			addRow(1);
		}

		main.updateRows();

	}

	/**
	 * Build new row
	 * @param activeTab
	 * @return void
	 */
	function addRow( activeTab ) {
		var activeTab = activeTab == undefined ? getCurrentTab() : '#tabs-' + activeTab,
			first = $(activeTab).children().length > 1;
		$('.lastRow').removeClass('lastRow');
		var inputStructure = [
            $('<div>').addClass('col-xs-2 smallPadding').append(
                $('<input type="text" list="events">').addClass('form-control lastRow event')
            ),

            $('<div>').append($('<input type="hidden">').addClass('form-control lastRow eventId')),
                $('<div>').addClass('col-xs-2 smallPadding').append(
                    $('<input type="text">').addClass('form-control lastRow round ').prop('disabled', true)
                ),
                $('<div>').addClass('col-xs-2 smallPadding').append(
                    $('<input type="text">').addClass('form-control lastRow format')
                ),
                $('<div>').addClass('col-xs-1 smallPadding').append(
                    $('<input type="text">').addClass('form-control lastRow start').prop('maxlength', 5).prop('disabled', first)
                ),
                $('<div>').addClass('col-xs-1 smallPadding').append(
                    $('<input type="text">').addClass('form-control lastRow duration ').prop('maxlength', 5)
                ),
                $('<div>').addClass('col-xs-1 smallPadding').append(
                    $('<input type="text">').addClass('form-control lastRow cutoff ').prop('maxlength', 5)
                ),
                $('<div>').addClass('col-xs-1 smallPadding').append(
                    $('<input type="text">').addClass('form-control lastRow hard ').prop('maxlength', 5)
                ),
                $('<div>').addClass('col-xs-1 smallPadding').append(
                    $('<input type="text">').addClass('form-control lastRow qualifiers ').prop('disabled', true)
                ),
                $('<div>').addClass('col-xs-1 smallPadding').append(
                    $('<button>').addClass('form-control lastRow deleteRow glyphicon glyphicon-remove btn-danger')
                )
            ],
            newRow = $('<div>').addClass('row rowDraggable smallMarginBottom').append(inputStructure);
        // console.log(newRow);
		$(activeTab).append(newRow); 
		// console.log('new row event ', $('.lastRow').first());
		setTimeout(function() {
			$('.lastRow').first().focus();
		}, 100);

		main.updateListeners();
		main.updateRows();
	}

	/**
	 * Get a the active tab
	 * @return string
	 */
	function getCurrentTab() {
		// console.log('#' + $('.ui-tabs-active').attr('aria-controls'));
		return ((r = '#' + $('.ui-tabs-active').attr('aria-controls')) == '#undefined' ? '#tabs-1' : r);
	}

	return {
		'deleteRow' : deleteRow,
		'save'      : saveSchedule,
		'load'      : loadSchedule,
		'addRow'    : addRow
	}
}();



