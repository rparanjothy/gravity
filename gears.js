function setup() {
  createCanvas(windowWidth, windowHeight);
  g1 = new gear("pink", 100, new Vector(0, 0), 0, 0.1, 100);
  g2 = new gear("red", 200, new Vector(150, 0), 0, -0.05, 200);
  // g3 = new gear(
  //   "green",
  //   50,
  //   new Vector(50 + 25 + 200, 0),
  //   (Math.PI / 180) * 30,
  //   50 / 200
  // );
  head = new Vector(-500, 0);
}

function draw() {
  frameRate();
  translate(width / 2, height / 2);
  background(0);
  // g1.move();
  g2.move();
  // g3.move();
}

class gear {
  constructor(color, dia, location, angle, speed, shaft) {
    this.color = color;
    this.dia = dia;
    this.radius = this.dia / 2;
    this.location = location;
    this.angle = angle;
    this.angleinc = speed;
    this.dotLoc = new Vector(0, 0);
    this.shaft = shaft;
    this.head = new Vector(this.location.x - this.shaft, this.location.y);
  }

  show() {
    stroke(this.color);
    noFill();
    ellipse(this.location.x, this.location.y, this.dia);
    point(this.location.x, this.location.y);
  }

  move() {
    this.show();
    this.angle += this.angleinc;
    this.dotLoc.x = this.location.x + Math.cos(this.angle) * (this.radius - 10);
    this.dotLoc.y = this.location.y + Math.sin(this.angle) * (this.radius - 10);
    strokeWeight(10);
    point(this.dotLoc.x, this.dotLoc.y);
    strokeWeight(1);
    let xoff = this.location.x - this.dotLoc.x;
    line(this.dotLoc.x, this.dotLoc.y, this.head.x - xoff, 0);
    strokeWeight(20);
    point(this.head.x - xoff, this.head.y);
    strokeWeight(2);
  }
}

function mouseClicked() {
  noLoop();
}
function mouseReleased() {
  loop();
}
