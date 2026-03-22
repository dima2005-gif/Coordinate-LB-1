const {
  CartesianPoint2D,
  PolarPoint,
  CartesianPoint3D,
  SphericalPoint,
} = require("./task.js");

const EPSILION = 1e-10;
function isClose(a, b) {
  return Math.abs(a - b) < EPSILION;
}

//2D -> Polar
console.log("\n===Декартова===");

const cart2D = new CartesianPoint2D(3, 4);
console.log("Вихідна: ", cart2D.toString());

const polar = PolarPoint.fromCartesian(cart2D);
console.log("-> Полярна: ", polar.toString());

const backTo2D = CartesianPoint2D.fromPolar(polar);
console.log("-> Назад:  ", backTo2D.toString());

console.log("перевірка x: ", isClose(cart2D.x, backTo2D.x));
console.log("перевірка y: ", isClose(cart2D.y, backTo2D.y));

//3D -> Spherical
console.log("\n===Декартова 3D===");

const cart3D = new CartesianPoint3D(1, 2, 3);
console.log("Вихідна: ", cart3D.toString());

const spherical = SphericalPoint.fromCartesian(cart3D);
console.log("-> Сферична: ", spherical.toString());

const back3D = CartesianPoint3D.fromSpherical(spherical);
console.log("-> Назад: ", back3D.toString());

console.log("перевірка x: ", isClose(cart3D.x, back3D.x));
console.log("перевірка y: ", isClose(cart3D.y, back3D.y));
console.log("перевірка z: ", isClose(cart3D.z, back3D.z));
