var engine = function () {

     /**
     * Delete a row
     * @return void
     */
    function deleteRow(element) {
        $(element).closest('.row').remove();
    }

    /**
     * Store data!
     */
    function saveSchedule() {
    	localStorage.setItem("compName", $('#competition').val());
    	var inputFields = $('input'),
    		data = [];

    	 $('input').each(function () {
    	 	data.push($(this).val());
    	 })
    	localStorage.setItem("ScheduleData", data);
    	console.log(data);
    }

    /**
     * Store data!
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

    	updateRoundNames() 
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
	    $('.form-group').append(newRow); 
	    console.log('new row event ', $('.lastRow').first());
	    setTimeout(function() {
	 	   $('.lastRow').first().focus();
	    }, 100);

    	updateListeners();
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

        if (b + 2 === currentEventLength) {
            roundInput.value += 'Semi Final';
            continue;
        }

        if (b === 1) {
            roundInput.value += 'Second Round';
            continue;
        }
        }
      }

    }

    return {
      'deleteRow' : deleteRow,
      'save'      : save,
      'load'      : load,
      'addRow'    : addRow
    }
}();
