class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // console.log(this);
  }

  add(x) {
    this.x += x.x;
    this.y += x.y;
  }

  static addTo(s, e) {
    s.add(e);
    // console.log(s);
    return s;
  }

  sub(x) {
    this.x -= x.x;
    this.y -= x.y;
  }

  mul(x) {
    this.x *= x.x;
    this.y *= x.y;
  }

  limit(x) {
    const m = this.mag();
    if (m > x) {
      this.mul(new Vector(1 / m, 1 / m));
    }
  }

  unpack() {
    return [this.x, this.y];
  }

  static diff(source, target) {
    return new Vector(target.x - source.x, target.y - source.y);
  }

  static distance(source, target) {
    // return Math.sqrt((x.x - y.x) ** 2 + (x.y - y.y) ** 2);
    return Vector.diff(source, target).mag();
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize() {
    const m = this.mag();
    const nsx = this.x / m;
    const nsy = this.y / m;
    this.x = nsx;
    this.y = nsy;
  }

  getAngle() {
    // const m = this.mag();
    this.angle = Math.atan2(this.y, this.x);
    // console.log((this.angle * 180) / Math.PI);
  }

  setAngle(a) {
    const _mag = this.mag();

    this.x = Math.cos(a) * _mag;
    this.y = Math.sin(a + 0.1) * _mag;
  }

  static fromMagandAngle(_mag, a) {
    // const _mag = this.mag();
    const x = Math.cos(a) * _mag;
    const y = Math.sin(a) * _mag;
    // console.log(x, y);
    const temp = new Vector(x, y);
    // temp.mul(new Vector(mag, mag));
    // console.log(temp);
    return temp;
  }

  setMaxMag(topSpeed) {
    this.normalize();
    this.mul(new Vector(topSpeed, topSpeed));
  }
}

class linkage {
  constructor(origin, len, angle, pivotCap, phase) {
    this.sx = origin.x;
    this.sy = origin.y;
    this.angle = angle;
    this.len = len;
    this.phase = phase;
    this.ex = this.sx + Math.cos(this.angle) * this.len;
    this.ey = this.sy + Math.sin(this.angle) * this.len;
    this.angleinc = 0.02;
    this.connectedLinks = [];
    this.pivotCap = pivotCap;
  }

  getTail() {
    return new Vector(this.ex, this.ey);
  }

  addLink(l, a, pivotCap) {
    console.log(this);
    this.ex = this.sx + Math.cos(this.angle) * this.len;
    this.ey = this.sy + Math.sin(this.angle) * this.len;

    this.connectedLinks.push(
      new linkage(new Vector(this.ex, this.ey), l, a, pivotCap)
    );
  }

  setAngle(a) {
    this.angle = a;
    this.ex = this.sx + Math.cos(this.angle) * this.len;
    this.ey = this.sy + Math.sin(this.angle) * this.len;
  }

  between(v, mn, mx) {
    return v >= mn && v <= mx;
  }

  changeAngle() {
    if (this.len > 0) {
      this.angle += this.angleinc;

      if (this.angle > this.pivotCap) {
        this.angleinc = this.angleinc * -1;
      } else if (this.angle <= 0) {
        // this.setAngle(0);
        this.angleinc = this.angleinc * -1;
      }
    }

    if (this.len < 0) {
      this.angle += this.angleinc;

      if (this.angle >= 0) {
        // this.setAngle(0);
        this.angleinc = this.angleinc * -1;
      } else if (this.angle <= this.pivotCap) {
        this.angleinc = this.angleinc * -1;
      }
    }

    this.setAngle(this.angle);
    // console.log(this.angle, this.pivotCap);
  }

  move() {
    stroke(255);
    line(this.sx, this.sy, this.ex, this.ey);
    this.changeAngle();
  }
}

class machine {
  constructor(linksCt, linkType, linkLength) {
    this.origin = new Vector(10, 10);
    this.links = [];
    this.linkLength = linkLength;
    this.linksCt = linksCt;
    this.range = this.linkLength > 0 ? Math.PI / 16 : -Math.PI / 16;
    this.unitRange = this.range / this.linksCt;
    for (let i = 0; i < this.linksCt; i++) {
      this.links.push(
        new linkType(
          this.origin,
          linkLength,
          Math.abs(i - this.linksCt) * this.unitRange,
          this.range
        )
      );
    }
  }

  run() {
    // start each link
    this.links.forEach((l) => l.move());
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  translate(width / 2, height / 2);
  m = new machine(10, linkage, 100);
  m2 = new machine(10, linkage, -100);
}

function draw() {
  // frameRate(5);
  translate(width / 2, height / 2);
  background(0);
  m.run();
  m2.run();
}

function mouseClicked() {
  noLoop();
}

function mouseReleased() {
  loop();
}
