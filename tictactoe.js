function startTicTacToe() {
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    // Create board
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }

    resetButton.addEventListener('click', resetGame);

    function handleCellClick(e) {
        const index = e.target.dataset.index;
        if (board[index] !== '' || !gameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin()) {
            statusElement.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            statusElement.textContent = "It's a tie!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winConditions.some(condition =>
            condition.every(index => board[index] === currentPlayer)
        );
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
    }
}