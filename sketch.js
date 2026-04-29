function setup() {
  createCanvas(600,600);
  
}

function draw() {
  background(220);

  
  fill(255, 255, 0);
  noStroke();

  let biteSize = PI / 16;
  let startAngle = biteSize + sin(frameCount * 0.1) + biteSize;
  let endAngle = TWO_PI  - biteSize;
  arc(50, 50, 80, 80, startAngle, endAngle, PIE);
  
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    dirX = -1;
    dirY = 0;
    angle = PI;
  } else if (keyCode === RIGHT_ARROW) {
    dirX = 1;
    dirY = 0;
    angle = 0;
  } else if (keyCode === UP_ARROW) {
    dirX = 0;
    dirY = -1;
    angle = -PI / 2;
  } else if (keyCode === DOWN_ARROW) {
    dirX = 0;
    dirY = 1;
    angle = PI / 2;
  } 
}


