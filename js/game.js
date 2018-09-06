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
		
		tamanhos = [];
		firebase.database().ref('scores').orderByChild('moves').on('value', function (snapshot) {
			$('#leaderboard-content').html('');

			snapshot.forEach(function (score) {
				obj = score.val();
				if ($('#difficulty_leaderboards option:selected').prop('title') == obj.difficulty) {
					$('#leaderboard-content').append('<li>' + obj.name + ' - Moves: ' + obj.moves + '</li>');
				}	
			});
		});
	})


});
