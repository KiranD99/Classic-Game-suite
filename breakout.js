let breakoutGameActive = false;

function startBreakoutGame() {
    const canvas = document.getElementById('breakoutCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('breakoutScore');
    const resetButton = document.getElementById('breakoutReset');

    const paddleWidth = 75;
    const paddleHeight = 10;
    const ballRadius = 10;
    const brickRowCount = 5;
    const brickColumnCount = 9;
    const brickWidth = 48;
    const brickHeight = 20;
    const brickPadding = 4;

    let paddleX = (canvas.width - paddleWidth) / 2;
    let ball = { x: canvas.width / 2, y: canvas.height - 30, dx: 4, dy: -4 };
    let bricks = [];
    let score = 0;

    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    function resetGame() {
        paddleX = (canvas.width - paddleWidth) / 2;
        ball = { x: canvas.width / 2, y: canvas.height - 30, dx: 4, dy: -4 };
        score = 0;
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 1;
            }
        }
        scoreElement.textContent = `Score: ${score}`;
        breakoutGameActive = true;
        draw();
        update();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw paddle
        ctx.fillStyle = '#0095DD';
        ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
        // Draw bricks
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                    const brickX = c * (brickWidth + brickPadding) + 10;
                    const brickY = r * (brickHeight + brickPadding) + 10;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.fillStyle = '#0095DD';
                    ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                }
            }
        }
    }

    function update() {
        if (!breakoutGameActive) return;

        ball.x += ball.dx;
        ball.y += ball.dy;

        // Ball collision
        if (ball.x + ballRadius > canvas.width || ball.x - ballRadius < 0) ball.dx *= -1;
        if (ball.y - ballRadius < 0) ball.dy *= -1;
        if (ball.y + ballRadius > canvas.height - paddleHeight &&
            ball.x > paddleX && ball.x < paddleX + paddleWidth) {
            ball.dy *= -1;
        } else if (ball.y + ballRadius > canvas.height) {
            breakoutGameActive = false;
            alert(`Game Over! Score: ${score}`);
            return;
        }

        // Brick collision
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                const b = bricks[c][r];
                if (b.status === 1 && ball.x > b.x && ball.x < b.x + brickWidth &&
                    ball.y > b.y && ball.y < b.y + brickHeight) {
                    ball.dy *= -1;
                    b.status = 0;
                    score += 10;
                    scoreElement.textContent = `Score: ${score}`;
                    if (score === brickRowCount * brickColumnCount * 10) {
                        breakoutGameActive = false;
                        alert('You Win!');
                        return;
                    }
                }
            }
        }

        draw();
        requestAnimationFrame(update);
    }

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        paddleX = e.clientX - rect.left - paddleWidth / 2;
        if (paddleX < 0) paddleX = 0;
        if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
    });

    resetButton.addEventListener('click', resetGame);

    if (!breakoutGameActive) {
        breakoutGameActive = true;
        draw();
        requestAnimationFrame(update);
    }
}