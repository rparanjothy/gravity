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

  static addTwo(s, e) {
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

class link {
  constructor(x, y) {
    this.start = x;
    this.end = y;
    this.angle = 0;
    this.angleinc = 0.01;
  }

  getMag() {
    // console.log(this.start.mag(), this.end.mag());
    return -this.start.mag() + this.end.mag();
  }

  getAngle() {
    const [sx, sy] = this.start.unpack();
    const [ex, ey] = this.end.unpack();
    const opp = sy - ey;
    const hyp = this.getMag();
    const ang = Math.asin(opp / hyp);
    // console.log(angle, opp, hyp);
    return ang;
  }

  setAngle(ang) {
    const [sx, sy] = this.start.unpack();
    const [ex, ey] = this.end.unpack();
    const diff = Vector.diff(this.start, this.end);
    const dmag = diff.mag();
    const [dx, dy] = diff.unpack();
    console.log(dmag, ang, cos(ang) * dmag, sin(ang) * dmag);
    return new Vector(cos(ang) * dmag + ex, sin(ang) * dmag + ey);
  }

  addLink(l) {
    const child = new link(this.end);
    console.log(child);
    // this.links.push(child);
  }

  move() {
    this.angle += this.angleinc;
  }

  show() {
    stroke(255);
    const [x, y] = this.setAngle(this.angle).unpack();
    line(this.start.x, this.start.y, x, y);
    // console.log(this);
  }
}

class linkage {
  constructor(origin, len, angle) {
    this.start = origin;
    this.end = Vector.fromMagandAngle(len, angle);
    this.angle = angle;
    this.angleinc = 0.05;
    this.len = len;
  }

  getMag() {
    // console.log(this.start.mag(), this.end.mag());
    return -this.start.mag() + this.end.mag();
  }

  getAngle() {
    const [sx, sy] = this.start.unpack();
    const [ex, ey] = this.end.unpack();
    const opp = sy - ey;
    const hyp = this.getMag();
    const ang = Math.asin(opp / hyp);
    // console.log(angle, opp, hyp);
    return ang;
  }

  setAngle(ang) {
    // console.log(ang);
    //  get x and Y from angle and mag
    this.end = Vector.fromMagandAngle(this.len, ang);

    // console.log(this, this.len, this.end);
  }

  between(v, mn, mx) {
    return v >= mn && v <= mx;
  }

  changeAngle(inc) {
    this.setAngle(this.angle * Math.sign(Math.sin(this.angle)));
    this.angle += this.angleinc;
  }

  addLink(l) {
    const child = new link(this.end);
    // this.links.push(child);
  }

  move() {
    // this.angle += this.angleinc;
    // this.setAngle(this.angle);
    this.changeAngle(this.angleinc);
  }

  show() {
    stroke(255);
    // const [x, y] = this.setAngle(this.angle).unpack();
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    // console.log(this);
  }
}

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  l = new linkage(Vector.fromMagandAngle(10, 0), 100, 0);
  // console.log(l);
}

function draw() {
  frameRate(20);
  background(0);
  translate(width / 2, height / 2);
  //   ellipse(0, 0, 10);
  l.show();
  l.move();
}

function mouseClicked() {
  noLoop();
}

function mouseReleased() {
  loop();
}
