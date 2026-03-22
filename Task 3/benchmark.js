const { performance } = require("perf_hooks");
const {
  CartesianPoint2D,
  PolarPoint,
  CartesianPoint3D,
  SphericalPoint,
} = require("../Task 1/task.js");
const {
  distanceCartesian2D,
  distancePolar,
  distanceChord,
  distanceArc,
} = require("../Task 2/task.js");

const N = 100_000;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function benchmark(label, fn, warmup = true) {
  if (warmup) fn();
  const start = performance.now();
  fn();
  const ms = (performance.now() - start).toFixed(3);
  console.log(`  ${label.padEnd(30)} ${ms} ms`);
}

console.log(`\nГенерація 2D даних (${N.toLocaleString()} пар)...`);

const polarPairs = [];
const cartesian2DPairs = [];

for (let i = 0; i < N; i++) {
  const p1 = new PolarPoint(rand(0, 100), rand(0, 2 * Math.PI));
  const p2 = new PolarPoint(rand(0, 100), rand(0, 2 * Math.PI));
  polarPairs.push([p1, p2]);
  cartesian2DPairs.push([
    CartesianPoint2D.fromPolar(p1),
    CartesianPoint2D.fromPolar(p2),
  ]);
}

console.log("\n=== 2D Бенчмарк ===");

benchmark("Полярна (теор. косинусів):", () => {
  for (let i = 0; i < N; i++) {
    distancePolar(polarPairs[i][0], polarPairs[i][1]);
  }
});

benchmark("Декартова (Евклід):", () => {
  for (let i = 0; i < N; i++) {
    distanceCartesian2D(cartesian2DPairs[i][0], cartesian2DPairs[i][1]);
  }
});

console.log(`\nГенерація 3D даних (${N.toLocaleString()} пар)...`);

const sphericalPairs = [];
const cartesian3DPairs = [];

for (let i = 0; i < N; i++) {
  const r = rand(1, 100); // однаковий радіус у парі
  const p1 = new SphericalPoint(r, rand(0, 2 * Math.PI), rand(0, Math.PI));
  const p2 = new SphericalPoint(r, rand(0, 2 * Math.PI), rand(0, Math.PI));
  sphericalPairs.push([p1, p2]);
  cartesian3DPairs.push([
    CartesianPoint3D.fromSpherical(p1),
    CartesianPoint3D.fromSpherical(p2),
  ]);
}

console.log("\n=== 3D Бенчмарк ===");

function distanceCartesian3D(a, b) {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2);
}

benchmark("Сферична (хорда):", () => {
  for (let i = 0; i < N; i++) {
    distanceChord(sphericalPairs[i][0], sphericalPairs[i][1]);
  }
});

benchmark("Сферична (дуга):", () => {
  for (let i = 0; i < N; i++) {
    distanceArc(sphericalPairs[i][0], sphericalPairs[i][1]);
  }
});

benchmark("Декартова 3D (Евклід):", () => {
  for (let i = 0; i < N; i++) {
    distanceCartesian3D(cartesian3DPairs[i][0], cartesian3DPairs[i][1]);
  }
});
