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
		firebase.database().ref('scores').orderByChild('difficulty').equalTo($('#difficulty_leaderboards option:selected').prop('title')).on('value', function (snapshot) {
			$('#leaderboard-content').html('');

			snapshot.forEach(function (score) {
				obj = score.val();
				
				// tamanhos.push(parseInt(obj.moves));
				$('#leaderboard-content').append('<li>' + obj.name + ' - Moves: ' + obj.moves + '</li>');

			});
		});
		// console.log(tamanhos);
		// novoArray = [];
		// newa = recursive_sort(tamanhos, novoArray);
		// console.log(newa);

		// $('#difficulty_leaderboards option:selected').prop('title'));
		//console.log(asd);
	})


});

// function recursive_sort(array, novoArray, item = 9999)
// {
// 	alert(array);
// 	if (array.length == 0) {
// 		alert('etou');
// 		return novoArray;
// 	}
// 	for (i= 0; i < array.length; i++) {
// 		if (array[i] < item) {
// 			posicao = i;
// 			item = array[i];
// 		}
// 	}
// 	novoArray.push(item);
// 	array.splice(posicao);

// 	return recursive_sort(array, novoArray, item);
// }

