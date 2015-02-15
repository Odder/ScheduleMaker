var popup = function () {

	/**
	* Delete a row
	* @return void
	*/
	function deleteRow(element) {
		$(element).closest('.row').remove();
	}

	/**
	* Saving Schedule
	* @return void
	*/
	function save() {
		var inputFields = $('input'),
		data = [];

		$('input').each(function () {
			data.push($(this).val());
		})
		localStorage.setItem("ScheduleData", data);
		console.log(data);
	}

	/**
		* Prompt if the user REALLY wants to delete a row 
		* @param element
		* @return void
		*/
	function deleteRowPrompt(element) {
		$('#popupContainer').empty().show();
		$('#popupContainer').append(
			$('<div class="topBar red">').text('Warning')).append(
			$('<div class="popupTextContainer">').html(
				'You are about to delete a row.<br />' +
				'are you sure you want to proceed?').append(
				$('<div class="buttons">').append(
					$('<button type="button" class="btn btn-danger cancel">').text('No')).append(
					$('<button type="button" class="btn btn-success confirm">').text('Yes'))));

		setTimeout(function() {
			$('.confirm').first().focus();
		}, 100);

		$('.cancel').click( function() {
			$('#popupContainer').empty().hide();
		});

		$('.confirm').click( function() {
			deleteRow(element);
			$('#popupContainer').empty().hide();
		});
	}

	function saveSchedulePrompt() {
		$('#popupContainer').empty().show();
		save();
		$('#popupContainer').append(
			$('<div class="topBar lightBlue">').text('Saved')).append(
			$('<div class="popupTextContainer">').html(
				'Your schedule was saved.').append(
				$('<div class="buttons">').append(
					$('<button type="button" class="btn btn-info OK">').text('OK'))));

		setTimeout(function() {
			$('.OK').first().focus();
		}, 100);

		$('.OK').click( function() {
			$('#popupContainer').empty().hide();
		});

	}

	function generateSchedulePrompt() {
		$('#popupContainer').empty().show();
		$('#popupContainer').append(
			$('<div class="topBar green">').text('Generate')).append(
			$('<div class="popupTextContainer">').append(
				$('<div class="row">').append(
					$('<div class="col-md-6 textRight">').append(
						$('<label>').text('HTML:'))).append(
					$('<div class="col-md-6 textRight">').append(				
						$('<button type="button" class="btn btn-success noMargins floatLeft HTML">').text('Download')))).append(
				$('<div class="row">').append(
					$('<div class="col-md-6 textRight">').append(
						$('<label>').text('Dynamic HTML:'))).append(
					$('<div class="col-md-6 textRight">').append(
						$('<button type="button" class="btn btn-success noMargins floatLeft DHTML">').text('Download')))).append(
				$('<div class="row">').append(
					$('<div class="col-md-6 textRight">').append(
						$('<label>').text('CSV:'))).append(
					$('<div class="col-md-6 textRight">').append(
						$('<button type="button" class="btn btn-success noMargins floatLeft CSV">').text('Download')))).append(
				$('<div class="row">').append(
					$('<div class="col-md-6 textRight">').append(
						$('<label>').text('CubeComps:'))).append(
					$('<div class="col-md-6 textRight">').append(
						$('<button type="button" class="btn btn-success noMargins floatLeft CSV">').text('Download')))));

	}

	return {
		'deleteRow' : deleteRowPrompt,
		'save'		: saveSchedulePrompt,
		'generate'	: generateSchedulePrompt
	}
}();



/**
 * pads numbers with 0!
 */
function pad(value, max) {
	value += "";
	return value.length < max ? pad("0" + value, max) : value;
}