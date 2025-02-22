let snakeGameActive = false;

function startSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('snakeScore');
    const resetButton = document.getElementById('snakeReset');

    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let score = 0;

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        food = { x: 15, y: 15 };
        dx = 0;
        dy = 0;
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        snakeGameActive = true;
        draw();
        update();
    }

    function draw() {
        // Clear canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        ctx.fillStyle = 'green';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });

        // Draw food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }

    function update() {
        if (!snakeGameActive) return;

        // Move snake
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
            food = {
                x: Math.floor(Math.random() * (canvas.width / gridSize)),
                y: Math.floor(Math.random() * (canvas.height / gridSize))
            };
        } else {
            snake.pop();
        }

        // Check wall collision
        if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
            snakeGameActive = false;
            alert(`Game Over! Score: ${score}`);
            return;
        }

        // Check self collision
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                snakeGameActive = false;
                alert(`Game Over! Score: ${score}`);
                return;
            }
        }

        draw();
        setTimeout(update, 100);
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp': if (dy !== 1) { dx = 0; dy = -1; } break;
            case 'ArrowDown': if (dy !== -1) { dx = 0; dy = 1; } break;
            case 'ArrowLeft': if (dx !== 1) { dx = -1; dy = 0; } break;
            case 'ArrowRight': if (dx !== -1) { dx = 1; dy = 0; } break;
        }
    });

    resetButton.addEventListener('click', resetGame);

    // Initial start
    if (!snakeGameActive) {
        snakeGameActive = true;
        draw();
        setTimeout(update, 100);
    }
}