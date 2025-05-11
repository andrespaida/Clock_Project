const canvas = document.getElementById('analogClock');
const ctx = canvas.getContext('2d');
const radius = canvas.height / 2;
ctx.translate(radius, radius);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
  updateDigitalClock();
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 4;
  ctx.stroke();
}

function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num <= 12; num++) {
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  // Hour
  hour = hour % 12;
  hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60));
  drawHand(ctx, hour, radius * 0.5, 6);

  // Minute
  minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
  drawHand(ctx, minute, radius * 0.75, 4);

  // Second
  second = (second * Math.PI / 30);
  drawHand(ctx, second, radius * 0.9, 2, 'red');
}

function drawHand(ctx, pos, length, width, color = '#000') {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

function updateDigitalClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  document.getElementById('digitalClock').textContent = timeStr;
}

setInterval(drawClock, 1000);
