document.getElementById('snakeBtn').addEventListener('click', () => {
    hideAllGames();
    document.getElementById('snakeGame').classList.remove('hidden');
    document.body.style.background = "url('images/snake-bg.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    startSnakeGame();
});

document.getElementById('tictactoeBtn').addEventListener('click', () => {
    hideAllGames();
    document.getElementById('tictactoeGame').classList.remove('hidden');
    document.body.style.background = "url('images/tictactoe-bg.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    startTicTacToe();
});

document.getElementById('pongBtn').addEventListener('click', () => {
    hideAllGames();
    document.getElementById('pongGame').classList.remove('hidden');
    document.body.style.background = "url('images/pong-bg.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    startPongGame();
});

document.getElementById('breakoutBtn').addEventListener('click', () => {
    hideAllGames();
    document.getElementById('breakoutGame').classList.remove('hidden');
    document.body.style.background = "url('images/breakout-bg.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    startBreakoutGame();
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    localStorage.setItem('darkMode', isDarkMode);
    // Reset background to default if no game is selected, otherwise keep game-specific background
    if (!document.querySelector('.game-container:not(.hidden)')) {
        document.body.style.background = 'var(--default-bg)';
    }
});

// Load dark mode preference on page load
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Toggle Light Mode';
} else {
    darkModeToggle.textContent = 'Toggle Dark Mode';
}

// Set default background on page load
document.body.style.background = 'var(--default-bg)';

function hideAllGames() {
    document.getElementById('snakeGame').classList.add('hidden');
    document.getElementById('tictactoeGame').classList.add('hidden');
    document.getElementById('pongGame').classList.add('hidden');
    document.getElementById('breakoutGame').classList.add('hidden');
}