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
  constructor(origin, len, angle, pivotCap) {
    this.sx = origin.x;
    this.sy = origin.y;
    this.ex = this.sx + Math.cos(this.angle) * this.len;
    this.ey = this.sy + Math.sin(this.angle) * this.len;
    this.angleinc = 0.05;
    this.len = len;
    this.angle = angle;
    this.connectedLinks = [];
    this.pivotCap = pivotCap;
  }

  getTail() {
    return new Vector(this.ex, this.ey);
  }
  // static fromLenandAngle(l, a) {
  //   return new linkage(null, l, a);
  // }

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
    this.angle += this.angleinc;
    if (this.angle > this.pivotCap) {
      this.angleinc = -0.05;
    }
    if (this.angle < -this.pivotCap) {
      this.angleinc = 0.05;

      // this.angleinc = 0.05;
      // this.reverse = !this.reverse;
    }
    // if (this.angle <= 0) {
    // }

    // console.log(this.angle, this.angleinc, (this.angle * 180) / Math.PI);

    this.setAngle(this.angle);
  }

  move() {
    this.changeAngle();
  }

  show() {
    stroke(255);
    // const [ex, ey] = this.getTail().unpack();
    // const [sx, sy] = this.start.unpack();
    // background(10);
    line(this.sx, this.sy, this.ex, this.ey);
  }
}

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  const origin = new Vector(0, 0);
  l = new linkage(origin, 110, 0, Math.PI / 4 / 4);
  l.addLink(200, 0, Math.PI / 4 / 4);
  l2 = new linkage(origin, -110, 0, Math.PI / 4 / 4);
  l2.addLink(-200, 0, Math.PI / 4 / 4);
}

function draw() {
  // frameRate(5);
  background(0);
  translate(width / 2, height / 2);
  l.show();
  ellipse(l.ex, l.ey, 5);
  l.connectedLinks.forEach((x) => {
    // background(0);
    x.sx = l.ex;
    x.sy = l.ey;
    x.angle += l.angle;
    x.show();
    ellipse(x.ex, x.ey, 5);
    x.move();
  });
  l.move();

  l2.show();
  ellipse(l2.ex, l2.ey, 5);
  l2.connectedLinks.forEach((x) => {
    // background(0);
    x.sx = l2.ex;
    x.sy = l2.ey;
    x.angle += l2.angle;
    x.show();
    ellipse(x.ex, x.ey, 5);
    x.move();
  });
  l2.move();

  // l.connectedLinks.forEach((x) => x.show());
}

function mouseClicked() {
  noLoop();
}

function mouseReleased() {
  loop();
  // const lastLink =
  //   l.connectedLinks.length > 0
  //     ? l.connectedLinks[l.connectedLinks.length - 1]
  //     : l;
  // console.log(lastLink);
  // lastLink.addLink(random(40) + 2, random(Math.PI / 2));
}
