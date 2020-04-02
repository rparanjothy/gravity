// var population = prompt("Population", "1");
var population = 1;
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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

  print() {
    console.log(this.x, this.y);
  }
  unpack() {
    return this.x, this.y;
  }

  getUnitVector() {
    const nsx = this.x / abs(this.x);
    const nsy = this.y / abs(this.y);
    this.x = nsx;
    this.y = nsy;
  }

  setMaxMag(topSpeed) {
    const maxX = abs(this.x) > topSpeed ? topSpeed / this.x : this.x;
    // const maxY = this.y < 0 ? 1 : -1;
    const maxY = abs(this.y) > topSpeed ? topSpeed / this.y : this.y;
    this.x = maxX;
    this.y = maxY;
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
          random(width * 0.1, width * 0.9),
          random(height * 0.1, height * 0.9)
        )
      );
    }
  }
}

class Person {
  constructor(x, y) {
    this.l = new Vector(x, y);
    this.v = new Vector(0, 0);
    this.a = new Vector(0, 0);
    this.v.add(this.a);
    this.accelerate();
    this.home = new Vector(width * 0.8, height * 0.8);
  }

  move() {
    // ellipse(this.home.x, this.home.y, 20);
    const sx = this.home.x - this.l.x;
    const sy = this.home.y - this.l.y;
    this.steerForce = new Vector(random(1, sx), random(4, sy));
    this.steerForce.getUnitVector();
    this.steerForce.setMaxMag(0.1);
    // this.a.add(this.steerForce);
    // this.v.add(this.a);
    this.v.add(this.steerForce);
    this.l.add(this.v);
  }

  reverseX() {
    this.v.x = -1 * this.v.x;
  }
  reverseY() {
    this.v.y = -1 * this.v.y;
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

    // noStroke(); // stroke(12);
    if (this.v.x > 0 && this.v.y < 0) {
      fill("rgba(0, 255, 0,.7)");
    } else if (this.v.x < 0 && this.v.y > 0) {
      fill("rgba(0, 255, 255,.37)");
    } else if (this.v.x < 0 && this.v.y < 0) {
      fill("rgba(255, 55, 55,.27)");
    } else {
      fill("rgba(255, 0, 250,.85)");
    }

    ellipse(this.l.x, this.l.y, this.v.x + this.v.y);
  }
}

function setup() {
  cvs = createCanvas(windowWidth - 50, windowHeight - 50);
  w = new World(population);
}

function draw() {
  // frameRate(10);
  // background(0);

  w.people.forEach((person, idx, arr) => {
    person.accelerate();
    person.move();
  });
}

function mousePressed() {
  noLoop();
  // w.people.push(new Person(mouseX, mouseY));
}

function mouseReleased() {
  loop();
}
