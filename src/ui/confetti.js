const PARTICLE_COUNT = 60;
const GRAVITY = 0.15;
const DURATION = 3000;

const SHAPES = ['rect', 'circle', 'strip'];

function getColors() {
  const style = getComputedStyle(document.documentElement);
  return [
    style.getPropertyValue('--brand').trim() || '#dccfff',
    style.getPropertyValue('--green').trim() || '#00e676',
    style.getPropertyValue('--yellow').trim() || '#ffd600',
    style.getPropertyValue('--blue').trim() || '#448aff',
    '#ff6b9d',
  ];
}

function createParticle(w, h, colors) {
  return {
    x: w * 0.5 + (Math.random() - 0.5) * w * 0.6,
    y: h * 0.3,
    vx: (Math.random() - 0.5) * 8,
    vy: -(Math.random() * 6 + 4),
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 12,
    size: Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    opacity: 1,
    gravity: GRAVITY + Math.random() * 0.05,
  };
}

function drawParticle(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;

  if (p.shape === 'rect') {
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
  } else if (p.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillRect(-p.size / 2, -1, p.size, 2.5);
  }

  ctx.restore();
}

export function launchConfetti(container) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const colors = getColors();
  const particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(canvas.width, canvas.height, colors));

  const start = performance.now();
  let raf;

  function frame(now) {
    const elapsed = now - start;
    if (elapsed > DURATION) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fadeStart = DURATION * 0.6;

    for (const p of particles) {
      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.vx *= 0.99;

      if (elapsed > fadeStart) {
        p.opacity = Math.max(0, 1 - (elapsed - fadeStart) / (DURATION - fadeStart));
      }

      drawParticle(ctx, p);
    }

    raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    canvas.remove();
  };
}
