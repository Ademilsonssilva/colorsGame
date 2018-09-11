/**
 *    _________  __   ____  ___    ________   __  _______
 *	 / ___/ __ \/ /  / __ \/ _ \  / ___/ _ | /  |/  / __/
 *	/ /__/ /_/ / /__/ /_/ / , _/ / (_ / __ |/ /|_/ / _/  
 *	\___/\____/____/\____/_/|_|  \___/_/ |_/_/  /_/___/  
 *
 * Developed by Ademilson
 * ademilsonssilva1@gmail.com	                                                     
 */

function newGame()
{
	return {
		size: 0,
		difficulty: '',
		playerName: '',
		game_style: '',
		startTime: '',
		endTime: '',
		activateSaveScore: true, //Se não tiver firebase configurado setar false
		moves: 0,
		onCellClick: function (cell) {
			this.moves++;

			this.updateGameDetails();

			if(this.game_style == 'classic') {
				neighbors = this.getNeighbors(cell);
			
				for (i = 0; i < neighbors.length; i++) {

					this.toggleColor(this.positionToJQueryObj(neighbors[i]));

				}
			}
			else if (this.game_style == 'plus') {
				neighbors = this.getNeighbors(cell);
			
				for (i = 0; i < neighbors.length; i++) {

					this.toggleColor(this.positionToJQueryObj(neighbors[i]));

				}
				
				if(this.moves%3 == 0) {
					this.toggleColor(cell);
				}
			}
			else if (this.game_style == 'diagonal') {
				neighbors = this.getDiagonalNeighbors(cell);
			
				for (i = 0; i < neighbors.length; i++) {

					this.toggleColor(this.positionToJQueryObj(neighbors[i]));

				}
				
			}



			this.verifyGameState();

		},
		getIdCoordinates: function (cell) {
			position = cell.prop('id').split('-');
			return {x: parseInt(position[0]), y: parseInt(position[1])}
		},
		positionToJQueryObj: function (pos) {
			return $('#' + pos.x + '-' + pos.y);
		},
		getNeighbors: function (cell) {
			pos = this.getIdCoordinates(cell);

			neighbors = [];

			if (pos.x > 1) {
				left = this.positionObject();
				left.x = pos.x-1;
				left.y = pos.y;
				neighbors.push(left);
			}

			if (pos.x < this.size) {
				right = this.positionObject();
				right.x = pos.x+1;
				right.y = pos.y;
				neighbors.push(right);	
			}

			if (pos.y > 1) {
				up = this.positionObject();
				up.x = pos.x;
				up.y = pos.y-1;
				neighbors.push(up);
			}

			if (pos.y < this.size) {
				down = this.positionObject();
				down.x = pos.x;
				down.y = pos.y+1;
				neighbors.push(down);	
			}

			return neighbors;
		},
		getDiagonalNeighbors: function (cell) {
			pos = this.getIdCoordinates(cell);

			neighbors = [];

			if (pos.x > 1 && pos.y > 1) {
				left = this.positionObject();
				left.x = pos.x-1;
				left.y = pos.y-1;
				neighbors.push(left);
			}

			if (pos.x > 1 && pos.y < this.size) {
				right = this.positionObject();
				right.x = pos.x-1;
				right.y = pos.y+1;
				neighbors.push(right);	
			}

			if (pos.x < this.size && pos.y > 1) {
				up = this.positionObject();
				up.x = pos.x+1;
				up.y = pos.y-1;
				neighbors.push(up);
			}

			if (pos.x < this.size && pos.y < this.size) {
				down = this.positionObject();
				down.x = pos.x+1;
				down.y = pos.y+1;
				neighbors.push(down);	
			}

			return neighbors;
		},
		buildBoard: function() {
			table = $('<table class="game-table"></table>');

			for (var x = 1; x <= this.size; x++) {

				tr = $('<tr></tr>');

				for (var y = 1; y <= this.size; y++) {

					td = $('<td id="' + x + '-' + y + '" class="game-cell"></td>');

					tr.append(td);

				}

				table.append(tr);

			}

			return table;
		},
		toggleColor: function(cell) {
			if (cell.hasClass('black')) {
				cell.removeClass('black');
				cell.addClass('green');
			}
			else {
				cell.removeClass('green');
				cell.addClass('black');
			}
		},
		positionObject: function () {
			return {x: 0, y: 0};
		},
		verifyGameState: function () {
			color = '';
			first = true;
			victory = true;
			$('.game-cell').each(function () {
				if (first) {
					if ($(this).hasClass('black')) {
						color = 'black';
					}
					else if ($(this).hasClass('green')) {
						color = 'green';
					}
					else {
						color = 'null';
					}
					first = false;
				}
				else {
					if (!$(this).hasClass(color)) {
						victory = false;
					}
				}
			});

			if (victory) {

				this.endGame();

			}
		},
		endGame: function () {
			var d = new Date();
			this.endTime = d.getTime();
			swal('VITÓRIA!', 'Numero de jogadas: ' + this.moves , 'success');

			this.saveScore();

			setTimeout(function () {
				$('#game-details').show();
				$('#game-content').hide();	
			}, 2000);
			
		},
		start: function () {
			$('#game-details').hide();
			$('#game-content').show();

			board = game.buildBoard();

			$('#content').html(board);

			$('.game-cell').bind('click', function () {
				game.onCellClick($(this));
			});

			$('.game-table').css('height', $('.game-table').css('width'));

			this.updateGameDetails();
		},
		saveScore: function () {
			if (this.activateSaveScore) {

				firebase.database().ref('scores/').push({
					name: this.playerName,
					difficulty: this.difficulty,
					moves: this.moves,
					start: this.startTime,
					end: this.endTime,
					game_style: this.game_style,
				});
				
			}
		},
		updateGameDetails: function () {
			$('#difficulty-ingame').html('<strong>Dificuldade: </strong>' + this.translate(this.difficulty) + '<br>');
			$('#game-style-ingame').html('<strong>Estilo de jogo: </strong>' + this.translate(this.game_style) + '<br>');
			$('#moves-ingame').html('<strong>Jogadas: </strong>' + this.moves + '<br>');

			if(this.game_style == 'plus') {
				plus_move_counter = (3 - (this.moves % 3));
				plus_move_counter = plus_move_counter > 1 ? plus_move_counter : 'Próxima';

				$('#plus-move-ingame').show();
				$('#plus-move-ingame').html('<strong>Proximo movimento plus em: </strong>' + plus_move_counter + '<br>');				
			}
		},
		translate: function (text){
			text = text.toUpperCase();
			if (text == 'EASY'){
				return 'Fácil';
			}
			if (text == 'MEDIUM'){
				return 'Médio';
			}
			if (text == 'HARD'){
				return 'Difícil';
			}
			if (text == 'EXPERT'){
				return 'Muito Difícil';
			}
			if (text == 'CLASSIC') {
				return 'Básico';
			}
			if (text == 'PLUS'){
				return 'Plus';
			}
		},
		setDifficulty: function (difficulty) {
			this.difficulty = difficulty;
			switch(difficulty){
				case 'easy':
					this.size = 3;
					break;
				case 'medium':
					this.size = 4;
					break;
				case 'hard':
					this.size = 5;
					break;
				case 'expert':
					this.size = 6;
					break;

			}
		}


	};
}