let pongGameActive = false;

function startPongGame() {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('pongScore');
    const resetButton = document.getElementById('pongReset');

    const paddleWidth = 10;
    const paddleHeight = 60;
    const ballSize = 10;

    let player = { x: 50, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
    let ai = { x: canvas.width - 50 - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
    let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 5, dy: 5 };

    function resetGame() {
        player = { x: 50, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
        ai = { x: canvas.width - 50 - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
        ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 5, dy: 5 };
        scoreElement.textContent = `Player: ${player.score} | AI: ${ai.score}`;
        pongGameActive = true;
        draw();
        update();
    }

    function draw() {
        // Clear canvas
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw paddles
        ctx.fillStyle = 'white';
        ctx.fillRect(player.x, player.y, paddleWidth, paddleHeight);
        ctx.fillRect(ai.x, ai.y, paddleWidth, paddleHeight);

        // Draw ball
        ctx.fillRect(ball.x - ballSize / 2, ball.y - ballSize / 2, ballSize, ballSize);

        // Draw center line
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }

    function update() {
        if (!pongGameActive) return;

        // Move ball
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Ball collision with top/bottom
        if (ball.y < 0 || ball.y > canvas.height) ball.dy *= -1;

        // AI paddle movement (simple tracking)
        if (ball.y > ai.y + paddleHeight / 2) ai.y += 5;
        if (ball.y < ai.y + paddleHeight / 2) ai.y -= 5;
        if (ai.y < 0) ai.y = 0;
        if (ai.y + paddleHeight > canvas.height) ai.y = canvas.height - paddleHeight;

        // Ball collision with paddles
        if (
            (ball.x - ballSize / 2 < player.x + paddleWidth && ball.y > player.y && ball.y < player.y + paddleHeight) ||
            (ball.x + ballSize / 2 > ai.x && ball.y > ai.y && ball.y < ai.y + paddleHeight)
        ) {
            ball.dx *= -1;
        }

        // Score and reset ball
        if (ball.x < 0) {
            ai.score++;
            ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 5, dy: 5 };
        } else if (ball.x > canvas.width) {
            player.score++;
            ball = { x: canvas.width / 2, y: canvas.height / 2, dx: -5, dy: 5 };
        }

        scoreElement.textContent = `Player: ${player.score} | AI: ${ai.score}`;

        draw();
        requestAnimationFrame(update);
    }

    // Player paddle control
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        player.y = e.clientY - rect.top - paddleHeight / 2;
        if (player.y < 0) player.y = 0;
        if (player.y + paddleHeight > canvas.height) player.y = canvas.height - paddleHeight;
    });

    resetButton.addEventListener('click', resetGame);

    // Initial start
    if (!pongGameActive) {
        pongGameActive = true;
        draw();
        requestAnimationFrame(update);
    }
}