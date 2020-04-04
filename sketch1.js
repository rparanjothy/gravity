// var population = prompt("Population", "1");
var population = 150;
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // this.magnitude = Math.sqrt(this.x ** 2 + this.y ** 2);
    // console.log(this);
  }

  add(x) {
    this.x += x.x;
    this.y += x.y;
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

  static diff(source, target) {
    return new Vector(target.x - source.x, target.y - source.y);
  }

  static distance(x, y) {
    return Math.sqrt((x.x - y.x) ** 2 + (x.y - y.y) ** 2);
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

  setMaxMag(topSpeed) {
    this.normalize();
    this.mul(new Vector(topSpeed, topSpeed));
  }
}

class World {
  constructor(population) {
    this.population = population;
    this.s = this.population;
    this.people = [];
    for (let i = 0; i < this.population; i++) {
      this.people.push(
        new Person(
          random(width * 0.3, width * 0.7),
          random(height * 0.3, height * 0.7)
        )
      );
    }
  }
}

class Person {
  constructor(x, y) {
    this.l = new Vector(x, y);
    this.origin = new Vector(x, y);
    this.v = new Vector(0, 0);
    this.a = new Vector(0, 0);
    this.v.add(this.a);
    this.accelerate();
    this.home = new Vector(width / 2, height / 2);
    this.steerForce = new Vector(0, 0);
    this.angle = 0;
    this.inc = 0.04;
    // this.inc = random(-0.04, 0.04);
  }

  move() {
    this.angle += this.inc;
    let distanceFromHome = Vector.diff(this.origin, this.home).mag();
    // console.log(distanceFromHome, this.home);

    // this.v.x = distanceFromHome * cos(this.angle);
    // this.v.y = distanceFromHome * sin(this.angle);
    // this.v.setMaxMag(2);
    // this.l.add(this.v);

    this.l.x = distanceFromHome * cos(this.angle);
    this.l.y = distanceFromHome * sin(this.angle);
    // this.v = new Vector(0, 0);
    // console.log(distanceFromHome, this.l);
    // noLoop();
  }

  reverseX() {
    // this.v.x = -1 * this.v.x;
  }
  reverseY() {
    // this.v.y = -1 * this.v.y;
  }

  accelerate() {
    this.show();
  }

  show() {
    if (this.l.x >= width * 0.9 - 10) {
      // l=true
      this.reverseX();
    }
    if (this.l.x <= width * 0.1 - 10) {
      // l=true
      this.reverseX();
    }
    if (this.l.y >= height * 0.9 - 10) {
      // l=true
      this.reverseY();
    }
    if (this.l.y <= height * 0.1 - 10) {
      this.reverseY();
    }

    // console.log(Vector.distance(this.l, this.home) / 255);
    // noStroke(); // stroke(12);
    // if (this.v.x > 0 && this.v.y < 0) {
    // } else if (this.v.x < 0 && this.v.y > 0) {
    //   fill("rgba(0, 255, 255,.37)");
    // } else if (this.v.x < 0 && this.v.y < 0) {
    //   fill("rgba(255, 55, 55,.27)");
    // } else {
    //   fill("rgba(255, 0, 250,.85)");
    // }

    ellipse(this.l.x + this.origin.x, this.l.y + this.origin.y, 8);
  }
}

function setup() {
  cvs = createCanvas(windowWidth * 0.9, windowHeight * 0.9);

  w = new World(population);
}

function draw() {
  // frameRate(10);
  background(0);

  w.people.forEach((person, idx, arr) => {
    person.accelerate();
    person.move();
  });
}

function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}
