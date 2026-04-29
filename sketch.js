function setup() {
  createCanvas(600,600);
  
}

function draw() {
  background(220);

  
  fill(255, 255, 0);
  noStroke();
  arc(50, 50, 80, 80, PI/ 5, PI / 6, PIE);
  
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


