$(document).ready(function () {

	size = 3;

	game = newGame();
	game.size = 3;

	board = game.buildBoard();

	$('#content').html(board);

	$('.game-cell').bind('click', function () {
		game.onCellClick($(this));
	});
});