let slider;
function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(0, 500, 150, 10);
  slider.position(10, 10);
  slider.style("width", "80px");

  shaft = createSlider(0, 500, 200, 10);
  shaft.position(10, 40);
  shaft.style("width", "80px");

  // g1 = new gear("pink", 100, new Vector(0, 0), 0, 0.1, 100);
  g2 = new gear("red", 200, new Vector(150, 0), 0, 0.05, 400, 110);
  // g3 = new gear(
  //   "green",
  //   50,
  //   new Vector(50 + 25 + 200, 0),
  //   (Math.PI / 180) * 30,
  //   50 / 200
  // );
}

function draw() {
  // frameRate(1);
  translate(width / 2, height / 2);
  background(0);
  // g1.move();
  g2.move();
  // g3.move();
}

class gear {
  constructor(color, dia, location, angle, speed, shaft, pivotOffset) {
    this.color = color;
    this.dia = dia;
    this.radius = this.dia / 2;
    this.location = location;
    this.angle = angle;
    this.angleinc = speed;
    this.dotLoc = new Vector(0, 0);
    this.shaft = shaft;
    this.head = new Vector(this.location.x - this.shaft, this.location.y);
    this.pivotOffset = pivotOffset;
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
    this.pivotOffset = slider.value();
    this.shaft = shaft.value();
    this.dotLoc.x =
      this.location.x + Math.cos(this.angle) * (this.radius - this.pivotOffset);
    this.dotLoc.y =
      this.location.y + Math.sin(this.angle) * (this.radius - this.pivotOffset);
    strokeWeight(10);
    point(this.dotLoc.x, this.dotLoc.y);
    strokeWeight(1);
    let xoff = this.location.x - this.dotLoc.x;
    // line(this.dotLoc.x, this.dotLoc.y, this.head.x - xoff, 0);
    let cx = this.dotLoc.x - this.location.x;
    let cy = this.dotLoc.y - this.location.y;
    // SEE Y COMPONENT
    // line(this.dotLoc.x, this.location.y, this.dotLoc.x, this.dotLoc.y);

    let a1 = Math.acos(cy / this.shaft);
    let x1 = Math.sin(a1) * this.shaft;
    // shaft
    let shaftEnd = new Vector(this.dotLoc.x + x1, 0);
    line(shaftEnd.x, shaftEnd.y, this.dotLoc.x, this.dotLoc.y);
    // crank
    line(this.dotLoc.x, this.dotLoc.y, this.location.x, this.location.y);

    strokeWeight(10);
    point(this.dotLoc.x + x1, 0);
    strokeWeight(1);
    // validate shaft length
    // console.log(
    //   Vector.distance(
    //     new Vector(this.dotLoc.x, this.dotLoc.y),
    //     new Vector(this.dotLoc.x + x1, 0)
    //   )
    // );

    line(this.dotLoc.x + x1, 0, this.dotLoc.x + x1 + 250, 0);

    // mid point of shaft
    let dx = -shaftEnd.x + this.dotLoc.x;
    let dy = -shaftEnd.y + this.dotLoc.y;
    let ax = Math.atan(dy / dx);
    strokeWeight(10);

    point(
      (this.shaft / 2) * Math.cos(ax) + this.dotLoc.x,
      this.dotLoc.y + (this.shaft / 2) * Math.sin(ax)
    );
    strokeWeight(1);
  }
}

function mouseClicked() {
  noLoop();
}
function mouseReleased() {
  loop();
}
