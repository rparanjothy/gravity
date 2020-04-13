class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // console.log(this);
    this.angle = Math.atan2(this.y, this.x);
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

class Point {
  constructor(x) {
    this.pos = x;
    this.dia = 3;
    this.inc = 0.01;
    this.x1 = 0;
    this.y1 = 0;
  }

  setPrev(x, y) {
    this.x1 = x;
    this.y1 = y;
  }

  show() {
    point(this.pos.x + this.dia, this.pos.y, this.dia);
    // line(this.pos.x, this.pos.y, this.x1, this.y1);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = new Point(new Vector(0, 0));
  p1 = new Point(new Vector(0, 0));
  p2 = new Point(new Vector(0, 0));
  p3 = new Point(new Vector(0, 0));

  pT = new Point(new Vector(0, 0));
}

function draw() {
  // frameRate(5);
  // background(0);
  strokeWeight(2);
  translate(0, 200);
  // p.pos.setAngle(1);
  // p.inc = map(0, inc.value(), 0, 1);
  p.pos.angle -= p.inc * 0.5;
  p.pos.y = Math.sin(p.pos.angle) * 125;
  p.pos.x += p.inc * 40;
  // p.setPrev(p.pos.x, p.pos.y);

  p1.pos.angle -= p1.inc * 1;
  p1.pos.y = Math.sin(p1.pos.angle) * 100;
  p1.pos.x += p1.inc * 40;

  p2.pos.angle -= p2.inc * 2;
  p2.pos.y = Math.sin(p2.pos.angle) * 75;
  p2.pos.x += p2.inc * 40;

  p3.pos.angle -= p3.inc * 4;
  p3.pos.y = Math.sin(p3.pos.angle) * 50;
  p3.pos.x += p3.inc * 40;
  // console.log(p.pos);
  stroke(255, 0, 250, 100);

  p.show();

  stroke(255, 250, 0, 100);

  p1.show();

  stroke(0, 255, 255, 200);

  p2.show();

  stroke(255, 255, 255, 200);
  p3.show();

  stroke(255, 0, 0);
  strokeWeight(5);
  // pT.pos.x = p1.pos.x + p.pos.x;
  pT.pos.x = p.pos.x;

  pT.pos.y = 400 + p1.pos.y + p.pos.y + p2.pos.y + p3.pos.y;

  pT.show();
}

function mouseClicked() {
  noLoop();
}

function mouseReleased() {
  loop();
}
