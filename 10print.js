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

function setup() {
  createCanvas(windowWidth, windowHeight);
  size = 25;
  ysize = 25;
  x = 0;
  y = 0;
}

function draw() {
  // frameRate(5);
  // background(0);
  stroke(255, 0, 250, 100);
  strokeWeight(3);
  random() > 0.5
    ? line(x, y, x + size, y + ysize)
    : line(x + size, y, x, y + ysize);
  ellipse(x, y, 4);
  x += size;
  if (x >= windowWidth * 0.75) {
    x = 0;
    y += ysize;
    if (y >= windowHeight * 0.75) {
      y = 0;
      noLoop();
    }
  }

  // x1 = windowWidth / 2 + x + size;
  // y1 = y + size;

  // random() > 0.5
  //   ? line(x1, y1, x1 + size, y1 + ysize)
  //   : line(x1 + size, y1, x1, y1 + ysize);

  // if (x1 >= windowWidth) {
  //   x1 = 0;
  //   y1 += ysize;
  //   if (y1 >= windowHeight) {
  //     noLoop();
  //   }
  // }
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
