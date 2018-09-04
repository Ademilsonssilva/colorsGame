function newGame()
{
	return {
		size: 0,
		moves: 0,
		onCellClick: function (cell) {
			this.moves++;
			neighbors = this.getNeighbors(cell);
			
			for (i = 0; i < neighbors.length; i++) {

				this.toggleColor(this.positionToJQueryObj(neighbors[i]));

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

			if (pos.x < size) {
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

			if (pos.y < size) {
				down = this.positionObject();
				down.x = pos.x;
				down.y = pos.y+1;
				neighbors.push(down);	
			}

			return neighbors;
		},
		buildBoard: function() {
			table = $('<table class="game-table"></table>');

			for (var x = 1; x <= size; x++) {

				tr = $('<tr></tr>');

				for (var y = 1; y <= size; y++) {

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
			alert('VICTORY!');
		}


	};
}