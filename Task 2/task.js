//2D

//Euclidean distance (Decart coordinate)
function distanceCartesian2D(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

//Theorem cosinus (Polar coordinate)
function distancePolar(p1, p2) {
  return Math.sqrt(
    p1.radius ** 2 +
      p2.radius ** 2 -
      2 * p1.radius * p2.radius * Math.cos(p2.angle - p1.angle),
  );
}

//3D

//Method 1. Straight distance (chord)
function distanceChord(p1, p2) {
  const r1 = p1.radius,
    r2 = p2.radius;
  const theta_1 = p1.polarAngle,
    theta_2 = p2.polarAngle;
  const phi_1 = p1.azimuth,
    phi_2 = p2.azimuth;

  return Math.sqrt(
    r1 ** 2 +
      r2 ** 2 -
      2 *
        r1 *
        r2 *
        (Math.sin(theta_1) * Math.sin(theta_2) * Math.cos(phi_1 - phi_2) +
          Math.cos(theta_1) * Math.cos(theta_2)),
  );
}

//Method 2. Arc distance (on surface of a sphere)
function distanceArc(p1, p2) {
  const R = p1.radius;
  const phi_1 = p1.azimuth,
    phi_2 = p2.azimuth;
  const theta_1 = p1.polarAngle,
    theta_2 = p2.polarAngle;

  return (
    R *
    Math.acos(
      Math.sin(theta_1) * Math.sin(theta_2) * Math.cos(phi_1 - phi_2) +
        Math.cos(theta_1) * Math.cos(theta_2),
    )
  );
}

module.exports = {
  distanceCartesian2D,
  distancePolar,
  distanceArc,
  distanceChord,
};
