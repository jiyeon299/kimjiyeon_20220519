let x = 50;
let y = 50;
let angle = 3;
let speed = 3;

let pacmanSize = 50;
let mapImg;

let walls = [
  { x: 100, y: 100, w: 200, h: 20 },
  { x: 300, y: 200, w: 20, h: 200 },
  { x: 500, y: 300, w: 150, h: 20 },
];

function preload() {
  mapImg = loadImage("Map.png");
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
  let nextX = x + dirX * speed;
  let nextY = y + dirY * speed;

  // 벽 충돌 체크
  if (!hitWall(nextX, nextY)) {
    x = nextX;
    y = nextY;
  }

  // 팩맨 
  fill(255, 255, 0);
  noStroke();
  
  let mouth = abs(sin(frameCount * 0.1)) * PI / 5;

  push();
  translate(x,y);
  rotate(angle);
  arc(0,0, pacmanSize, pacmanSize, mouth, TWO_PI - mouth, PIE);
  pop();
}


function hitWall(hx, hy) {
  let r = pacmanSize / 2;

  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];

    if (
      hx + r > wall.x &&
      hx - r < wall.x + wall.w &&
      hy + r > wall.y &&
      hy - r < wall.y + wall.h
    ) {
      return true;
    }
  }
  return false;
}


