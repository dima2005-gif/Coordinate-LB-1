const {
  CartesianPoint2D,
  PolarPoint,
  SphericalPoint,
} = require("../Task 1/task.js");
const {
  distanceCartesian2D,
  distancePolar,
  distanceChord,
  distanceArc,
} = require("./task.js");

const EPSILON = 1e-9;
function isClose(a, b) {
  return Math.abs(a - b) < EPSILON;
}

// ===== 2D Декартові =====
console.log("=== Декартова 2D ===");

// 3-4-5 трикутник -> відповідь рівно 5
const a1 = new CartesianPoint2D(0, 0);
const b1 = new CartesianPoint2D(3, 4);
console.log("3-4-5 трикутник:", distanceCartesian2D(a1, b1)); // 5

// Одна і та ж точка -> 0
const a2 = new CartesianPoint2D(7, 3);
console.log("Та сама точка:  ", distanceCartesian2D(a2, a2)); // 0

// ===== 2D Полярні =====
console.log("\n=== Полярна ===");

// r=3, angle=0  та  r=4, angle=PI/2  -> теорема косинусів -> sqrt(9+16-0) = 5
const pa = new PolarPoint(3, 0);
const pb = new PolarPoint(4, Math.PI / 2);
console.log("Відомий результат 5:", distancePolar(pa, pb)); // 5

// Та сама точка -> 0
console.log("Та сама точка:      ", distancePolar(pa, pa)); // 0

// ===== 3D Хорда =====
console.log("\n=== Хордова відстань ===");

// Дві точки на одиничній сфері (R=1), рознесені на 90
// Очікуємо хорду = sqrt2 = 1.4142
const s1 = new SphericalPoint(1, 0, Math.PI / 2); // екватор, азимут 0
const s2 = new SphericalPoint(1, Math.PI / 2, Math.PI / 2); // екватор, азимут 90
console.log(
  "90 на сфері (очік. sqrt2 = 1.4142):",
  distanceChord(s1, s2).toFixed(6),
);
console.log("Перевірка:", isClose(distanceChord(s1, s2), Math.sqrt(2))); // true

// Протилежні точки (антиподи) -> хорда = 2*R = 2
const north = new SphericalPoint(1, 0, 0); // північний полюс
const south = new SphericalPoint(1, 0, Math.PI); // південний полюс
console.log(
  "Антиподи (очік. 2):              ",
  distanceChord(north, south).toFixed(6),
);
console.log("Перевірка:", isClose(distanceChord(north, south), 2)); // true

// Та сама точка -> 0
console.log(
  "Та сама точка:                   ",
  distanceChord(s1, s1).toFixed(6),
); // 0

// ===== 3D Дуга =====
console.log("\n=== Дугова відстань ===");

// Ті ж самі 90 на одиничній сфері -> дуга = R * PI/2 ≈ 1.5708
console.log(
  "90 на сфері (очік. PI/2 = 1.5708):",
  distanceArc(s1, s2).toFixed(6),
);
console.log("Перевірка:", isClose(distanceArc(s1, s2), Math.PI / 2)); // true

// Антиподи -> дуга = R * PI = 3.1416
console.log(
  "Антиподи (очік. PI = 3.1416):     ",
  distanceArc(north, south).toFixed(6),
);
console.log("Перевірка:", isClose(distanceArc(north, south), Math.PI)); // true

// Земна куля: чверть екватора = 10007 км
const kyiv = new SphericalPoint(6371, 0, Math.PI / 2);
const ny = new SphericalPoint(6371, Math.PI / 2, Math.PI / 2);
console.log(
  "\nЧверть екватора (очік. ~10007 км):",
  distanceArc(kyiv, ny).toFixed(1),
);
