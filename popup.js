var popup = function () {

	/**
	* Delete a row
	* @return void
	*/
	function deleteRow(element) {
		$(element).closest('.row').remove();
		main.updateRows();
	}

	/**
		* Prompt if the user REALLY wants to delete a row 
		* @param element
		* @return void
		*/
	function deleteRowPrompt(element) {
		$('#popupContainer').empty().show();
		$('#popupContainer').append(
			$('<div class="topBar red">').text('Warning')
		).append(
			$('<div class="popupTextContainer">').html(
				'You are about to delete a row.<br />' +
				'are you sure you want to proceed?').append(
				$('<div class="buttons">').append(
					$('<button type="button" class="btn btn-danger cancel">').text('No')
				).append(
					$('<button type="button" class="btn btn-success confirm">').text('Yes')
				)
			)
		);

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
		engine.save();
		$('#popupContainer').append(
			$('<div class="topBar lightBlue">').text('Saved')
		).append(
			$('<div class="popupTextContainer">').html(
				'Your schedule was saved.').append(
				$('<div class="buttons">').append(
					$('<button type="button" class="btn btn-info OK">').text('OK')
				)
			)
		);

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
			$('<div class="topBar green">').text('Generate')
		).append(
			$('<div class="popupTextContainer">').append(
				$('<div class="row">').append(
					$('<div class="col-md-6 textRight">').append(
						$('<label>').text('HTML:')
					)
				).append(
					$('<div class="col-md-6 textRight">').append(				
						$('<button type="button" class="btn btn-success noMargins floatLeft HTML">').text('Generate')
					)
				)
			).append(
				$('<div class="row">').append(
					$('<div class="col-md-6 textRight">').append(
						$('<label>').text('Dynamic HTML:')
					)
				).append(
					$('<div class="col-md-6 textRight">').append(
						$('<button type="button" class="btn btn-danger noMargins floatLeft DHTML">').text('To be implemented')
					)
				)
			).append(
				$('<div class="row">').append(
					$('<div class="col-md-6 textRight">').append(
						$('<label>').text('CSV:')
					)
				).append(
					$('<div class="col-md-6 textRight">').append(
						$('<button type="button" class="btn btn-danger noMargins floatLeft CSV">').text('To be implemented')
					)
				)
			).append(
				$('<div class="row">').append(
					$('<div class="col-md-6 textRight">').append(
						$('<label>').text('CubeComps:')
					)
				).append(
					$('<div class="col-md-6 textRight">').append(
						$('<button type="button" class="btn btn-danger noMargins floatLeft CubeComps">').text('To be implemented')
					)
				)
			).append(
				$('<div class="row">').append(
					$('<div class="col-md-6 textRight">').append(
						$('<label>').text('JSON:')
					)
				).append(
					$('<div class="col-md-6 textRight">').append(
						$('<button type="button" class="btn btn-success noMargins floatLeft JSON">').text('Generate')
					)
				)
			)
		);

		$('.JSON').unbind().click( function () {
			generatedCodePrompt( JSON.stringify( exports.JSON() ) );
		});

		$('.HTML').unbind().click( function () {
			generatedCodePrompt( exports.HTML() );
		});

	}

	function generateSettingsPrompt( ) {
		$('#popupContainer').empty().show();
		$('#popupContainer').append(
			$('<div class="topBar green">').text('Generated Schedule!')
		).append(
			$('<div class="popupTextContainer">').append(
				$('<div class="row">').append(
					$('<div class="col-md-5 textRight">').append(
						$('<label>').text('Time-Zone abbr:')
					)
				).append(
					$('<div class="col-md-7 textLeft">').append(
						$('<input id="setTZ" placeholder="eg. GMT, BRST">').val($('setting.time-zone-abbr').val())
					)
				)
			).append(
				$('<div class="row">').append(
					$('<div class="col-md-5 textRight">').append(
						$('<label>').text('GMT-offset:')
					)
				).append(
					$('<div class="col-md-7 textLeft">').append(
						$('<input type="text" id="setGMT" placeholder="eg. -1, +3">').val($('setting.gmt-offset').val())
					)
				)
			).append(
				$('<div class="row">').append(
					$('<div class="col-md-5 textRight">').append(
						$('<label>').text('Woops?')
					)
				).append(
					$('<div class="col-md-7 textLeft">').append(
						$('<input id="name" placeholder="Time zone abbr">')
					)
				)
			).append(
				$('<div class="buttons">').append(
					$('<button type="button" class="btn btn-success done">').text('I\'m done!')
				)
			)
		);


		$('.done').unbind().click( function () {

			$('setting.time-zone-abbr').val($('#setTZ').val());
			$('setting.gmt-offset').val($('#setGMT').val());

			$('#popupContainer').empty().hide();
			
		});



	}

	function generatedCodePrompt( text ) {
		$('#popupContainer').empty().show();
		$('#popupContainer').append(
			$('<div class="topBar green">').text('Generated Schedule!')
		).append(
			$('<div class="popupTextContainer">').append(
				$('<textarea>').html(text)
			).append(
				'<a href="http://jsbeautifier.org" target="_blank"> Click here for a beautifier tool</a>').append(
				$('<div class="buttons">').append(
					$('<button type="button" class="btn btn-success done">').text('I\'m done!')
				)
			)
		);

		$('textarea').unbind().click( function () {
			this.select();
		});

		$('.done').unbind().click( function () {
			$('#popupContainer').empty().hide();
		});

		$('textarea').select();
	}

	function loadSchedulePrompt( ) {
		$('#popupContainer').empty().show();
		$('#popupContainer').append(
			$('<div class="topBar green">').text('Load Schedule from JSON!')
		).append(
			$('<div class="popupTextContainer">').append(
				$('<textarea id="loadJSON">')
			).append(
				$('<div class="buttons">').append(
					$('<button type="button" class="btn btn-success done">').text('I\'m done!')
				)
			)
		);

		$('textarea').unbind().click( function () {
			this.select();
		});

		$("html").on("drop", function( ) {
			setTimeout(function() {
				$('.done').click();
			}, 100);
		});

		$('.done').unbind().click( function () {
			engine.load( $('#loadJSON').val() );
			$('#popupContainer').empty().hide();
		});
	}



	$('html').on('click', '.topBar', function () {
		console.log('hai');
		$('#popupContainer').empty().hide();
	});

	return {
		'deleteRow' : deleteRowPrompt,
		'save'		: saveSchedulePrompt,
		'load'		: loadSchedulePrompt,
		'generate'	: generateSchedulePrompt,
		'settings'	: generateSettingsPrompt,
		'generated'	: generatedCodePrompt
	}
}();



/**
 * pads numbers with 0!
 */
function pad(value, max) {
	value += "";
	return value.length < max ? pad("0" + value, max) : value;
}