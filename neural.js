const canvas = document.getElementById('neural-bg');
const ctx = canvas.getContext('2d');

let width, height, nodes = [], connections = [];
const NODE_COUNT = 48;
const CONNECTION_DISTANCE = 160;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Node {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.radius = Math.random() * 1.8 + 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fillStyle = 'rgba(199, 93, 58, 0.45)';
    ctx.fillStyle = 'rgba(255, 23, 7, 0.45)';
    ctx.fill();
  }
}

for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push(new Node());
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Update & draw nodes
  nodes.forEach(n => {
    n.update();
    n.draw();
  });

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DISTANCE) {
        const opacity = 1 - dist / CONNECTION_DISTANCE;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(199, 93, 58, ${opacity * 0.30})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}
animate();