let v;
function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  background(155);
  v = new Vector(0, 0);
  //   drawFace(300);
}

const getChin = (d) => {
  x = d * 0.37;
  x /= 3;
  //   yOffset = random(r / 2, r / 2 + 50);
  yOffset = random(d / 2 - 10, d / 2 + 10);
  return new Vector(random(-x, x), yOffset);
};

const drawFace = (faceRad) => {
  //   faceRad = 250;
  //   ellipse(v.x, v.y, faceRad);
  //   find a point which is between the -r and +r
  c = getChin(faceRad);
  strokeWeight(10);
  //   c.add(position);
  beginShape();
  //   curveVertex(v.x - faceRad / 2, v.y);
  stroke("purple");
  //   stokeWeight(10);
  curveVertex(v.x - faceRad / 2, v.y);
  curveVertex(c.x, c.y);
  curveVertex(v.x + faceRad / 2, v.y);
  curveVertex(v.x + faceRad / 2, v.y - random(faceRad - 20, faceRad + 10));
  curveVertex(random(-20, 10), v.y - random(faceRad * 0.8, faceRad));
  curveVertex(v.x - faceRad / 2, v.y - random(faceRad - 20, faceRad + 10));
  curveVertex(v.x - faceRad / 2, v.y);
  curveVertex(c.x, c.y);
  curveVertex(v.x + faceRad / 2, v.y);
  endShape();

  //   hair
  //   beginShape();
  //   curveVertex(v.x + faceRad / 2, v.y);
  //   curveVertex(v.x + faceRad / 2, v.y);
  //   curveVertex(v.x + faceRad / 1.75, v.y - random(10));
  //   curveVertex(v.x + faceRad - 10, v.y - random(40));
  //   curveVertex(v.x + faceRad - 20, v.y - faceRad - random(100));
  //   curveVertex(v.x - faceRad - 20, v.y - faceRad - random(100));
  //   curveVertex(v.x - faceRad - 40, v.y - faceRad + random(100));
  //   curveVertex(v.x - faceRad / 2, v.y);
  //   curveVertex(v.x + faceRad / 1.75, v.y - 50);

  //   endShape();
  // curveVertex(v.x + faceRad / 2, v.y);
  //   curveVertex(v.x + faceRad / 2, v.y);

  //   curveVertex(v.x + faceRad / 2.75, v.y - 10);

  //   beginShape();
  //   curveVertex(c.x - 50, c.y - 50);
  //   //   curveVertex(c.x, c.y - 40);
  //   curveVertex(c.x, c.y);
  //   //   curveVertex(0, 0);
  //   curveVertex(c.x, c.y - faceRad);
  //   curveVertex(c.x, c.y - faceRad);
  //   endShape();
};

function draw() {
  translate(width / 2, height / 2);
  frameRate(2);
  background(0);
  stroke(100);
  noFill();
  //   drawFace(150, new Vector(0, 0));
  drawFace(150);

  //   drawFace(150);
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
