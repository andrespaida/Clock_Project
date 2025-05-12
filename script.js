const canvas = document.getElementById('analogClock');
const ctx = canvas.getContext('2d');
const radius = canvas.height / 2;
ctx.translate(radius, radius);

function drawClock() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height); // clear canvas

  drawFace(ctx, radius);
  drawNumbers(ctx, radius);   // <-- asegúrate de que esta llamada esté aquí
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
    const angle = num * Math.PI / 6;
    const x = radius * 0.75 * Math.sin(angle);
    const y = -radius * 0.75 * Math.cos(angle);
    ctx.fillStyle = "black";  // Ensure text is visible
    ctx.fillText(num.toString(), x, y);
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
