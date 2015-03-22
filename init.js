var init = function () {
	$('#addRow').click( function () {
		engine.addRow();
	});
	
	$('#save').click( function () {
		popup.save();
	});
	
	$('#generate').click( function () {
		popup.generate();
	});
	
	$('#load').click( function () {
		popup.load();
	});

	$('.tabs').sortable({
		items: '.row:not(.rowHeader)',
		stop: function () {main.updateRows();}
	});

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $(function() {
        $( "#datepicker" ).datepicker({
            dateFormat: 'dd MM, yy',
            minDate: 0
        });
    });

	engine.load();
	main.updateListeners();
	main.updateRows();
}

$(document).ready(main);
$(document).ready(init);

