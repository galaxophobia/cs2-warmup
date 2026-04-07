const btn = document.getElementById("startBtn");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let targets = [];
let score = 0;

btn.onclick = () => {
  canvas.style.display = "block";
  canvas.requestPointerLock();
  spawnTarget();
  gameLoop();
};

function spawnTarget() {
  targets = [{
    x: Math.random() * 700,
    y: Math.random() * 500,
    size: 30
  }];
}

canvas.onclick = (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  targets.forEach(t => {
    if (
      mx > t.x &&
      mx < t.x + t.size &&
      my > t.y &&
      my < t.y + t.size
    ) {
      score++;
      spawnTarget();
    }
  });
};

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  targets.forEach(t => {
    ctx.fillStyle = "red";
    ctx.fillRect(t.x, t.y, t.size, t.size);
  });

  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 20);

// crosshair
ctx.strokeStyle = "white";
ctx.lineWidth = 2;

ctx.beginPath();
ctx.moveTo(canvas.width / 2 - 10, canvas.height / 2);
ctx.lineTo(canvas.width / 2 + 10, canvas.height / 2);
ctx.moveTo(canvas.width / 2, canvas.height / 2 - 10);
ctx.lineTo(canvas.width / 2, canvas.height / 2 + 10);
ctx.stroke();  requestAnimationFrame(gameLoop);
}
