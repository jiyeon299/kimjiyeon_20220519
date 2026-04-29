let x = 50;
let y = 50;
let angle = 3;
let speed = 2;

let mapImg;

function preload() {
  mapImg = loadImage('Map.png');
}

function setup() {
  createCanvas(2816, 1536);


}

function draw() {
  Image(mapImg, 0, 0, width, height);

  let dirX = 0;
  let dirY = 0;

  // 방향키 입력 
  if (keyIsDown(LEFT_ARROW)) {
    dirX = -1;
    dirY = 0;
    angle = PI;
  } else if (keyIsDown(RIGHT_ARROW)) {
    dirX = 1;
    dirY = 0;
    angle = 0;
  } else if (keyIsDown(UP_ARROW)) {
    dirX = 0;
    dirY = -1;
    angle = -PI / 2;
  } else if (keyIsDown(DOWN_ARROW)) {
    dirX = 0;
    dirY = 1;
    angle = PI / 2;
  } 

  // 이동 
  x += dirX * speed;
  y += dirY * speed;

  // 팩맨 
  fill(255, 255, 0);
  noStroke();
  let mouth = abs(sin(frameCount * 0.1)) * PI / 5;

  push();
  translate(x,y);
  rotate(angle);
  arc(0,0, 80, 80, mouth, TWO_PI - mouth, PIE);
  pop();
}




