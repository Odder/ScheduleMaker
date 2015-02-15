var exports = function () {

	 /**
	 * Export to HTML
	 * @return <string> exportText
	 */
	/*function deleteRow() {
		var data = getInformation(),
			exportText = '<table>',
			dataLen = data.length,
			rowCount = 1 + (((dataLen - 2) / 9) || 0);

		for (var i = 1; i < rowCount; i++) {
			data[i*9 + ];
		}
		$(element).closest('.row').remove();





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
	}*/



	/**
	 * Grabs information from the input boxes
	 * @return <array> data
	 */
	function getInformation() {
		var inputFields = $('input'),
			data = [];

		$('input').each(function () {
			data.push($(this).val());
		})

		return data;
	}



	return {
		'gather' : getInformation
	}
}();
