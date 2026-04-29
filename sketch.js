let x = 50;
let y = 50;
let dirX = 0;
let dirY = 0;
let angle = 3;
let speed = 2;


function setup() {
  createCanvas(600,600);
}

function draw() {
  background(220);

  
  x += dirX * speed;
  y += dirY * speed;

  fill(255, 255, 0);
  noStroke();

  let biteSize = PI / 16;
  let mouth = abs(sin(frameCount * 0.1)) * PI / 5;

  
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


