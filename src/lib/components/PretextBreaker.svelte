<script>
  import { onMount, onDestroy } from 'svelte';

  let canvasEl;
  let ctx;
  let gameInterval;
  let animationFrameId;

  // Game state
  let score = 0;
  let lives = 3;
  let level = 1;
  let isGameOver = false;
  let isGameWon = false;
  let isLaunched = false;

  // Game settings & dimensions (internal canvas size is 800x500)
  const width = 800;
  const height = 500;

  // Paddle
  let paddleWidth = 120;
  let paddleHeight = 15;
  let paddleX = (width - paddleWidth) / 2;
  const paddleSpeed = 8;

  // Ball
  let ballX = width / 2;
  let ballY = height - 40;
  let ballRadius = 6;
  let ballSpeed = 4;
  let dx = 0;
  let dy = 0;

  // Key states
  let rightPressed = false;
  let leftPressed = false;

  // Word Bricks
  const wordsList = [
    "CODE", "FORGE", "INVENT", "BUILD", "HACK", "CREATE", 
    "DESIGN", "SYSTEMS", "INTELLIGENT", "CYBER", "CLOUDS", "ROBOTS"
  ];
  let bricks = [];
  const brickRows = 3;
  const brickPadding = 12;
  const brickHeight = 35;

  // Initialize Bricks
  function initBricks() {
    bricks = [];
    const cols = 4;
    const totalPaddingWidth = brickPadding * (cols + 1);
    const brickWidth = (width - totalPaddingWidth) / cols;

    for (let r = 0; r < brickRows; r++) {
      for (let c = 0; c < cols; c++) {
        const wordIndex = (r * cols + c) % wordsList.length;
        const word = wordsList[wordIndex];
        
        bricks.push({
          x: c * (brickWidth + brickPadding) + brickPadding,
          y: r * (brickHeight + brickPadding) + 60,
          w: brickWidth,
          h: brickHeight,
          word: word,
          active: true,
          color: r === 0 ? '#E07A3A' : r === 1 ? '#E9C46A' : '#2A9D8F'
        });
      }
    }
  }

  function launchBall() {
    if (isLaunched || isGameOver || isGameWon) return;
    isLaunched = true;
    // Launch upward at a random angle
    const angle = (Math.random() * 0.4 - 0.2) + Math.PI / 2; // Roughly up
    const currentSpeed = ballSpeed + level * 0.5;
    dx = Math.cos(angle) * currentSpeed;
    dy = -Math.sin(angle) * currentSpeed;
  }

  function handleKeyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      leftPressed = true;
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (isGameOver || isGameWon) {
        resetGame();
      } else {
        launchBall();
      }
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      leftPressed = false;
    }
  }

  // Mouse tracking
  function handleMouseMove(e) {
    if (!canvasEl) return;
    const rect = canvasEl.getBoundingClientRect();
    // Translate clientX into internal canvas coordinates (0 to 800)
    const relativeX = ((e.clientX - rect.left) / rect.width) * width;
    paddleX = Math.max(0, Math.min(width - paddleWidth, relativeX - paddleWidth / 2));
    
    if (!isLaunched) {
      ballX = paddleX + paddleWidth / 2;
    }
  }

  // Touch tracking
  function handleTouchMove(e) {
    if (!canvasEl || e.touches.length === 0) return;
    const rect = canvasEl.getBoundingClientRect();
    const relativeX = ((e.touches[0].clientX - rect.left) / rect.width) * width;
    paddleX = Math.max(0, Math.min(width - paddleWidth, relativeX - paddleWidth / 2));
    
    if (!isLaunched) {
      ballX = paddleX + paddleWidth / 2;
    }
  }

  function handleTouchEnd() {
    if (!isLaunched) {
      launchBall();
    }
  }

  function resetGame() {
    score = 0;
    lives = 3;
    level = 1;
    isGameOver = false;
    isGameWon = false;
    isLaunched = false;
    paddleX = (width - paddleWidth) / 2;
    ballX = paddleX + paddleWidth / 2;
    ballY = height - 40;
    dx = 0;
    dy = 0;
    initBricks();
  }

  function nextLevel() {
    level += 1;
    isLaunched = false;
    paddleX = (width - paddleWidth) / 2;
    ballX = paddleX + paddleWidth / 2;
    ballY = height - 40;
    dx = 0;
    dy = 0;
    initBricks();
  }

  function gameLoop() {
    if (!ctx) return;

    // Clear Canvas with retro background grid color
    ctx.fillStyle = '#07111c';
    ctx.fillRect(0, 0, width, height);

    // Draw background matrix text lines for vintage effect
    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < height; i += 15) {
      ctx.fillText("pretext layout wrap render font canvas bounds code forge hackathon compile compile", 10, i);
    }

    // Move Paddle
    if (rightPressed && paddleX < width - paddleWidth) {
      paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= paddleSpeed;
    }

    // Ball movement
    if (isLaunched) {
      ballX += dx;
      ballY += dy;
    } else {
      ballX = paddleX + paddleWidth / 2;
    }

    // Wall collision (Left/Right)
    if (ballX + dx > width - ballRadius || ballX + dx < ballRadius) {
      dx = -dx;
    }

    // Wall collision (Top)
    if (ballY + dy < ballRadius) {
      dy = -dy;
    }

    // Bottom collision (Lose Life / Game Over)
    if (ballY + dy > height - ballRadius) {
      // Check paddle collision
      if (ballX > paddleX && ballX < paddleX + paddleWidth) {
        // Bounce with angle offset based on where the ball hits the paddle
        const hitPoint = (ballX - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
        const currentSpeed = ballSpeed + level * 0.5;
        dx = hitPoint * currentSpeed * 0.8;
        dy = -Math.sqrt(currentSpeed * currentSpeed - dx * dx);
      } else {
        lives -= 1;
        isLaunched = false;
        if (lives === 0) {
          isGameOver = true;
        } else {
          ballX = paddleX + paddleWidth / 2;
          ballY = height - 40;
          dx = 0;
          dy = 0;
        }
      }
    }

    // Brick Collision Detection
    let activeBricks = 0;
    for (let i = 0; i < bricks.length; i++) {
      const b = bricks[i];
      if (b.active) {
        activeBricks++;
        // Simple bounding box checks
        if (ballX > b.x && ballX < b.x + b.w && ballY > b.y && ballY < b.y + b.h) {
          dy = -dy;
          b.active = false;
          score += b.word.length * 10;
        }
      }
    }

    if (activeBricks === 0 && bricks.length > 0) {
      isGameWon = true;
    }

    // DRAW OBJECTS

    // 1. Bricks
    for (let i = 0; i < bricks.length; i++) {
      const b = bricks[i];
      if (b.active) {
        // Brick Box
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(b.x, b.y, b.w, b.h);

        // Word Label inside Brick (centered)
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = b.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.word, b.x + b.w / 2, b.y + b.h / 2);
      }
    }

    // 2. Paddle
    ctx.strokeStyle = '#2A9D8F';
    ctx.lineWidth = 2;
    ctx.strokeRect(paddleX, height - 25, paddleWidth, paddleHeight);
    ctx.fillStyle = 'rgba(42, 157, 143, 0.2)';
    ctx.fillRect(paddleX, height - 25, paddleWidth, paddleHeight);
    
    // Paddle Label text centered
    ctx.font = '9px monospace';
    ctx.fillStyle = '#2A9D8F';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("[==========]", paddleX + paddleWidth / 2, height - 25 + paddleHeight / 2);

    // 3. Ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#E9C46A';
    ctx.fill();
    ctx.closePath();

    // 4. Overlays (Game Over, Press Launch, Game Won)
    if (isGameOver) {
      ctx.fillStyle = 'rgba(7, 17, 28, 0.85)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#E07A3A';
      ctx.textAlign = 'center';
      ctx.fillText("DECRYPTION FAILURE: GAME OVER", width / 2, height / 2 - 20);
      ctx.font = '14px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText("PRESS SPACE OR CLICK TO ATTEMPT REBOOT", width / 2, height / 2 + 20);
    } else if (isGameWon) {
      ctx.fillStyle = 'rgba(7, 17, 28, 0.85)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#2A9D8F';
      ctx.textAlign = 'center';
      ctx.fillText("ACCESS GRANTED: SECTOR CLEARED", width / 2, height / 2 - 20);
      ctx.font = '14px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText("PRESS SPACE OR CLICK TO PROGRESS", width / 2, height / 2 + 20);
    } else if (!isLaunched) {
      ctx.fillStyle = 'rgba(7, 17, 28, 0.6)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#E9C46A';
      ctx.textAlign = 'center';
      ctx.fillText("HOLD THE LINE", width / 2, height / 2 - 15);
      ctx.font = '11px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText("PRESS SPACE, TAP OR MOVE MOUSE TO LAUNCH CODE", width / 2, height / 2 + 15);
    }

    animationFrameId = requestAnimationFrame(gameLoop);
  }

  onMount(() => {
    ctx = canvasEl.getContext('2d');
    initBricks();
    
    // Bind Keyboard
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Start Loop
    gameLoop();
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
</script>

<section class="mb-24 select-none" id="arcade">
  <!-- Title Header -->
  <div class="border-t-2 border-b-2 border-primary py-3 mb-10 text-center bg-primary/5">
    <h3 class="font-headline text-3xl md:text-5xl uppercase font-black tracking-tight distressed-text mb-1">
      OFFICIAL ARCADE DISPATCH: PRETEXT BREAKER
    </h3>
    <p class="font-serif-alt italic text-sm md:text-base text-primary/80 max-w-2xl mx-auto">
      Shatter the obfuscated word walls. Decrypt the code database at 60fps.
    </p>
  </div>

  <!-- Arcade Enclosure -->
  <div class="max-w-4xl mx-auto border-4 border-double border-primary p-6 bg-[#07111c] shadow-[6px_6px_0px_rgba(43,43,42,0.25)] rounded-sm relative overflow-hidden">
    
    <!-- Top Scoreboard Bar -->
    <div class="flex justify-between items-center font-mono text-[10px] md:text-sm uppercase tracking-wider text-background bg-primary/95 px-4 py-2.5 mb-5 rounded-sm">
      <div class="flex gap-4">
        <span>SCORE: <strong class="text-[#E9C46A]">{String(score).padStart(5, '0')}</strong></span>
        <span>LEVEL: <strong class="text-[#E9C46A]">{String(level).padStart(2, '0')}</strong></span>
      </div>
      <div>
        LIVES: 
        <strong class="text-[#E07A3A]">
          {#each Array(lives) as _}♥ {/each}
          {#each Array(Math.max(0, 3 - lives)) as _}♡ {/each}
        </strong>
      </div>
    </div>

    <!-- Canvas viewport -->
    <div class="border-2 border-primary/50 relative overflow-hidden bg-[#07111c]">
      <canvas 
        bind:this={canvasEl}
        width={width}
        height={height}
        class="block w-full h-auto cursor-none"
        on:mousemove={handleMouseMove}
        on:touchmove|preventDefault={handleTouchMove}
        on:touchend={handleTouchEnd}
        on:click={() => {
          if (isGameOver || isGameWon) {
            if (isGameOver) resetGame();
            else nextLevel();
          } else {
            launchBall();
          }
        }}
      ></canvas>
    </div>

    <!-- Controls tip footer -->
    <div class="mt-4 flex flex-wrap justify-between items-center font-mono text-[9px] md:text-[11px] uppercase tracking-wider text-primary/70 border-t border-primary/30 pt-3">
      <span>MOVE: MOUSE / TOUCH / ARROWS / A-D</span>
      <span>LAUNCH: SPACE / CLICK / TOUCH</span>
    </div>
  </div>
</section>
