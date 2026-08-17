<template>
  <canvas ref="canvas" class="stars"></canvas>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';

interface Props {
  faster?: boolean;
}

const props = defineProps<Props>();

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let stars: {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}[] = [];
let animationId: number;

const buckets: { x: number; y: number; size: number }[][] = Array.from({ length: 9 }, () => []);

let speedMultiplier = 1;
let targetMultiplier = props.faster ? 50 : 1;

watch(
  () => props.faster,
  (newVal) => {
    targetMultiplier = newVal ? 50 : 1;
  }
);

function initStars(width: number, height: number) {
  stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.ceil(Math.random() * 2),
    speed: 0.15 + Math.random() * 0.25,
    opacity: 0.3 + Math.random() * 0.7,
  }));
}

function animate() {
  if (!ctx || !canvas.value) return;

  speedMultiplier += (targetMultiplier - speedMultiplier) * 0.05;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  for (const b of buckets) b.length = 0;

  for (const s of stars) {
    s.x -= s.speed * speedMultiplier;
    if (s.x < 0) s.x = canvas.value.width;
    s.opacity += (Math.random() - 0.5) * 0.03;
    s.opacity = Math.max(0.2, Math.min(1, s.opacity));
    buckets[Math.round(s.opacity * 10) - 2].push({ x: s.x | 0, y: s.y | 0, size: s.size });
  }

  for (let i = 0; i < buckets.length; i++) {
    if (!buckets[i].length) continue;
    ctx.fillStyle = `rgba(255,255,255,${(i + 2) / 10})`;
    ctx.beginPath();
    for (const p of buckets[i]) ctx.rect(p.x, p.y, p.size, p.size);
    ctx.fill();
  }

  animationId = requestAnimationFrame(animate);
}

function handleVisibility() {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
  } else {
    animate();
  }
}

function resize() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  initStars(canvas.value.width, canvas.value.height);
}

onMounted(() => {
  if (!canvas.value) return;
  ctx = canvas.value.getContext('2d');
  resize();
  animate();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', handleVisibility);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
  document.removeEventListener('visibilitychange', handleVisibility);
});
</script>

<style lang="scss" scoped>
.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  pointer-events: none;
  z-index: -1;
}
</style>
