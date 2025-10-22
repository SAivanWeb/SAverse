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

// 🧭 Множители скорости
let speedMultiplier = 1;
let targetMultiplier = props.faster ? 50 : 1;

// 🪄 Следим за изменением пропса
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
    size: Math.random() * 2,
    speed: 0.15 + Math.random() * 0.25,
    opacity: 0.3 + Math.random() * 0.7,
  }));
}

function animate() {
  if (!ctx || !canvas.value) return;

  // 🧮 Плавное приближение текущей скорости к целевой
  speedMultiplier += (targetMultiplier - speedMultiplier) * 0.05;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  for (const s of stars) {
    s.x -= s.speed * speedMultiplier;
    if (s.x < 0) s.x = canvas.value.width;
    s.opacity += (Math.random() - 0.5) * 0.03;
    s.opacity = Math.max(0.2, Math.min(1, s.opacity));

    ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
    ctx.fillRect(s.x, s.y, s.size, s.size);
  }

  animationId = requestAnimationFrame(animate);
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
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
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
