description_text_classic = '<strong>Objetivo:</strong> deixar todos os campos da mesma cor!<br>';
description_text_classic += "<strong>Regras do modo Clássico:</strong> Ao clicar em uma casa, apenas as em volta dela mudam de cor!";

description_text_plus = '<strong>Objetivo:</strong> deixar todos os campos da mesma cor!<br>';
description_text_plus += "<strong>Regras do modo Plus:</strong> Ao clicar em uma casa, apenas as em volta dela mudam de cor, porém a cada 3 jogadas, o campo clicado também muda!";

$(document).ready(function () {

	$('#game-description').html(description_text_classic);

	$('#start').on('click', function () {
		if ($('#name').val() == '') {
			swal('Ops', 'Preencha seu nome para registrar a pontuação!', 'warning');
		}
		else {
			game = newGame();
			game.setDifficulty($('#difficulty').val());
			game.playerName = $('#name').val();
			game.game_style = $('#game-style').val();

			var d = new Date();
			game.startTime = d.getTime();

			game.start();
		}
	});

	$('#difficulty_leaderboards').on('change', function () {
		
		tamanhos = [];
		game_style = $('#game-style-leaderboards').val();

		firebase.database().ref('scores').orderByChild('moves').on('value', function (snapshot) {
			$('#leaderboard-content').html('');

			snapshot.forEach(function (score) {
				obj = score.val();

				if ($('#difficulty_leaderboards').val().toUpperCase() == obj.difficulty.toUpperCase()) {
					if (obj.game_style == game_style || (typeof(obj.game_style) == 'undefined' && game_style == 'classic')) {
						$('#leaderboard-content').append('<li>' + obj.name + ' - ' + obj.moves + ' Jogadas </li>');
					}
				}

			});

			if ($('#leaderboard-content').html() == '') {
				$('#leaderboard-content').html('<i>Nenhuma pontuação registrada</i>')
			}
		});

	});

	$('#game-style-leaderboards').on('change', function () {
		$('#difficulty_leaderboards').val('');
		$('#leaderboard-content').html('');
	});

	$('#game-style').on('change', function () {
		if ($(this).val() == 'classic') {
			$('#game-description').html(description_text_classic);		
		}
		else if ($(this).val() == 'plus') {
			$('#game-description').html(description_text_plus);
		}
		
	});

	$('#surrender').on('click', function () {
		swal('Que feio!', 'Você desistiu!', 'warning');
		$('#name').val('');
		$('#difficulty').val('');
		$('#game-style').val('classic');
		$('#game-details').show();
		$('#game-content').hide();
	});


});
