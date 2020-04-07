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

class crazy {
  constructor(cl, cr) {
    this.cl = cl;
    this.cr = cr;
    // this.langle = random(Math.PI);
    // this.rangle = random(Math.PI);
    this.langle = 0;
    this.rangle = 0;
    (this.x = 0), (this.y = 0);
  }

  setXY() {
    this.x = Math.cos(this.langle) * 100;
    this.y = Math.sin(this.rangle) * 100;
    this.langle += 0.5;
    this.rangle += 0.4;
  }

  show() {
    this.setXY();
    noStroke();
    ellipse(this.x, this.y, 5);
  }
}
function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  c = new crazy(new Vector(10, 10), new Vector(40, 40));
  // l3.addLink(-200, 0, Math.PI / 4 / 4);
}

function draw() {
  // frameRate(5);
  background(0);
  translate(width / 2, height / 2);
  c.show();
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
