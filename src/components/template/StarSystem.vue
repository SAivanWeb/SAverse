<template>
  <div class="system">
    <div
      ref="viewportRef"
      class="system__viewport"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerUp"
      @wheel.prevent="onWheel"
    >
      <!-- stage = то, что реально двигаем/масштабируем -->
      <div class="system__stage" :style="stageStyle">
        <div class="system__center">
          <template v-if="planets.length">
            <!-- орбиты -->
            <div
              v-for="(item, index) in planets"
              :key="item.id + '-orbit'"
              class="system__orbit"
              :style="{ '--radius': `${150 + index * 110}px` }"
            />

            <!-- планеты -->
            <div
              v-for="(item, index) in planets"
              :key="item.id + '-wrapper'"
              class="system__planet-wrapper"
              :style="{
                animationDuration: `60s`,
                animationDelay: randomDelays[index] + 's',
                '--radius': `${150 + index * 110}px`
              }"
            >
              <Planet
                class="system__planet"
                :title="item.title"
                :size="50"
                :color="item.color"
                :type="item.type"
                :id="item.id"
                text="small"
              />
            </div>
          </template>

          <!-- звезда -->
          <Planet
            class="system__star"
            :title="star.title"
            :size="100"
            :color="star.color"
            :type="star.type"
            :id="star.id"
            text="text-hidden"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Planet from "@/components/template/Planet.vue";
import { computed, ref } from "vue";
import type { GalaxyResponseData } from "@/api/modules/types/galaxy";

const props = defineProps<{ item: GalaxyResponseData }>();

const star = computed(() => ({
  id: props.item.id,
  title: props.item.name,
  color: props.item.color,
  type: "star" as const
}));

const planets = computed(
  () =>
    props.item.planets?.map((p) => ({
      id: p.id,
      title: p.name,
      color: p.color,
      type: "planet" as const
    })) ?? []
);

const randomDelays = computed(() => planets.value.map(() => -Math.random() * 30));

/** PAN + ZOOM **/
const viewportRef = ref<HTMLElement | null>(null);

const x = ref(0);
const y = ref(0);
const scale = ref(1);

const MIN_SCALE = 0.6;
const MAX_SCALE = 2.5;

const pointers = new Map<number, { x: number; y: number }>();

let lastPan = { x: 0, y: 0 };
let pinchStartDist = 0;
let pinchStartScale = 1;
let pinchMid = { x: 0, y: 0 };
let pinchStartXY = { x: 0, y: 0 };

const isPanning = ref(false);
const PAN_THRESHOLD = 3;

const stageStyle = computed(() => ({
  transform: `translate3d(${x.value}px, ${y.value}px, 0) scale(${scale.value})`,
  transformOrigin: "0 0"
}));

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function getDist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getMid(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function isInteractiveTarget(e: PointerEvent) {
  return !!(e.target as HTMLElement)?.closest(".system__planet");
}

function onPointerDown(e: PointerEvent) {
  if (e.pointerType === "mouse" && isInteractiveTarget(e)) return;

  if (e.pointerType === "mouse" && e.button !== 0) return;

  if (e.pointerType !== "mouse") {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (pointers.size === 1) {
    lastPan = { x: e.clientX, y: e.clientY };
    isPanning.value = false;
  }

  if (pointers.size === 2) {
    const [p1, p2] = Array.from(pointers.values());
    pinchStartDist = getDist(p1, p2);
    pinchStartScale = scale.value;

    pinchMid = getMid(p1, p2);
    pinchStartXY = { x: x.value, y: y.value };
  }
}

function onPointerMove(e: PointerEvent) {
  if (!pointers.has(e.pointerId)) return;

  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (pointers.size === 1) {
    const dx = e.clientX - lastPan.x;
    const dy = e.clientY - lastPan.y;

    if (e.pointerType === "mouse" && !isPanning.value) {
      if (Math.hypot(dx, dy) < PAN_THRESHOLD) return;
      isPanning.value = true;
    }

    x.value += dx;
    y.value += dy;
    lastPan = { x: e.clientX, y: e.clientY };
    return;
  }

  if (pointers.size === 2) {
    const [p1, p2] = Array.from(pointers.values());
    const dist = getDist(p1, p2);
    const mid = getMid(p1, p2);

    const nextScale = clamp(
      pinchStartScale * (dist / (pinchStartDist || 1)),
      MIN_SCALE,
      MAX_SCALE
    );

    const k = nextScale / pinchStartScale;

    x.value =
      pinchStartXY.x +
      (mid.x - pinchMid.x) +
      (1 - k) * (pinchMid.x - pinchStartXY.x);

    y.value =
      pinchStartXY.y +
      (mid.y - pinchMid.y) +
      (1 - k) * (pinchMid.y - pinchStartXY.y);

    scale.value = nextScale;
  }
}

function onPointerUp(e: PointerEvent) {
  pointers.delete(e.pointerId);

  if (pointers.size === 1) {
    const [p] = Array.from(pointers.values());
    lastPan = { x: p.x, y: p.y };
  }

  if (pointers.size === 0) {
    isPanning.value = false;
  }
}

function onWheel(e: WheelEvent) {
  const rect = viewportRef.value?.getBoundingClientRect();
  if (!rect) return;

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const delta = -e.deltaY;
  const zoomFactor = delta > 0 ? 1.08 : 0.92;

  const nextScale = clamp(scale.value * zoomFactor, MIN_SCALE, MAX_SCALE);
  const k = nextScale / scale.value;

  x.value = mouseX - (mouseX - x.value) * k;
  y.value = mouseY - (mouseY - y.value) * k;

  scale.value = nextScale;
}
</script>

<style lang="scss" scoped>
.system {
  position: relative;
  height: calc(100vh - 14rem);
  display: flex;
  justify-content: center;
  @media (max-width: 900px) {
    height: calc(100vh - 9rem);
  }
}

/* "экран", который двигаем пальцами */
.system__viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  touch-action: none;
}

/* то, что реально трансформируем */
.system__stage {
  width: 100%;
  height: 100%;
  will-change: transform;
}

/* твой текущий центр системы */
.system__center {
  position: relative;
  width: min(60vh, 60vw);
  height: min(60vh, 60vw);
  margin: 60px auto 0;
}

/* дальше — твои стили без изменений */
.system__star {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.system__orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleY(0.6);
  width: calc(var(--radius) * 2);
  height: calc(var(--radius) * 2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  pointer-events: none;
}

.system__planet-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleY(0.6)
  rotate(0deg) translateX(var(--radius)) rotate(0deg);
  animation: orbit linear infinite;
  pointer-events: none;
}

.system__planet {
  transform: scaleY(calc(1 / 0.6));
  cursor: pointer;
  pointer-events: auto;
}

@keyframes orbit {
  from {
    transform: translate(-50%, -50%) scaleY(0.6)
    rotate(0deg) translateX(var(--radius)) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) scaleY(0.6)
    rotate(360deg) translateX(var(--radius)) rotate(-360deg);
  }
}
</style>
