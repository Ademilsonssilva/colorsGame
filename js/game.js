$(document).ready(function () {

	$('#start').on('click', function () {
		if ($('#name').val() == '') {
			swal('Ops', 'Fill in your name!', 'warning');
		}
		else {
			game = newGame();
			game.size = $('#difficulty').val();
			game.difficulty = $('#difficulty option:selected').prop('title');
			game.playerName = $('#name').val();

			game.start();
		}
	});

	$('#difficulty_leaderboards').on('change', function () {
		asd = firebase.database().ref('scores').orderByChild('moves').equalTo('Easy');

		// $('#difficulty_leaderboards option:selected').prop('title'));
		console.log(asd);
	})


});