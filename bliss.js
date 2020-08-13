// var population = prompt("Population", "1");
var population = 15;

// class World {
//   constructor(population) {
//     this.population = population;
//     this.s = this.population;
//     this.people = [];
//     for (let i = 0; i < this.population; i++) {
//       this.people.push(
//         new Person(
//           random(width * 0.1, width * 0.9),
//           random(height * 0.1, height * 0.9)
//         )
//       );
//     }
//   }
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // frameRate(10);
  background(0);
  stroke(255);
  fill(11);
  strokeWeight(1);
  frameRate(1);
  beginShape();

  for (let i = 0; i < population; i++) {
    // point(random(windowWidth), random(windowHeight));
    curveVertex(random(windowWidth), random(windowHeight));
  }
  endShape();
  // target.accelerate();
  // target.move();
}
