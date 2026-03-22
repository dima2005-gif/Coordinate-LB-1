//Decart coordinate 2D

class CartesianPoint2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }

  static fromPolar(p) {
    const x = p.radius * Math.cos(p.angle);
    const y = p.radius * Math.sin(p.angle);
    return new CartesianPoint2D(x, y);
  }

  toString() {
    return `CartesianPoint2D(x=${this.x}, y=${this.y})`;
  }
}

//Polar coordinate

class PolarPoint {
  constructor(radius, angle) {
    this.radius = radius;
    this.angle = angle;
    Object.freeze(this);
  }

  static fromCartesian(p) {
    const radius = Math.sqrt(p.x ** 2 + p.y ** 2);
    const angle = Math.atan2(p.y, p.x);
    return new PolarPoint(radius, angle);
  }

  toString() {
    return `PolarPoint(radius=${this.radius}, angle=${this.angle})`;
  }
}

//Decart coordinate 3D

class CartesianPoint3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    Object.freeze(this);
  }

  static fromSpherical(p) {
    const x = p.radius * Math.sin(p.polarAngle) * Math.cos(p.azimuth);
    const y = p.radius * Math.sin(p.polarAngle) * Math.sin(p.azimuth);
    const z = p.radius * Math.cos(p.polarAngle);
    return new CartesianPoint3D(x, y, z);
  }

  toString() {
    return `CartesianPoint3D(x=${this.x}, y=${this.y}, z=${this.z})`;
  }
}

//Spherical coordinate

class SphericalPoint {
  constructor(radius, azimuth, polarAngle) {
    this.radius = radius;
    this.azimuth = azimuth;
    this.polarAngle = polarAngle;
    Object.freeze(this);
  }

  static fromCartesian(p) {
    const radius = Math.sqrt(p.x ** 2 + p.y ** 2 + p.z ** 2);
    const azimuth = Math.atan2(p.y, p.x);
    const polarAngle = Math.acos(p.z / radius);
    return new SphericalPoint(radius, azimuth, polarAngle);
  }

  toString() {
    return `SphericalPoint(radius=${this.radius}, azimuth(theta)=${this.azimuth}, polarAngle(phi)=${this.polarAngle})`;
  }
}

module.exports = {
  CartesianPoint2D,
  PolarPoint,
  CartesianPoint3D,
  SphericalPoint,
};
