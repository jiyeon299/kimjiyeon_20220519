let x = 420; //시작 위치 
let y = 720;
let angle = 0;
let speed = 3;

let pacmanSize = 50;
let mapImg;




function preload() {
  mapImg = loadImage("Map.png");
}

function setup() {
  createCanvas(2816, 1536);


}

function draw() {
  image(mapImg, 0, 0, width, height);

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
  if (onRoad(nextX, nextY)) {
    x = nextX;
    y = nextY;s
  }

  fill(0, 200, 255, 150);
  noStroke();

  for (let i = 0; i < walls.length; i++) {
    rect(walls[i].x, walls[i].y, walls[i].w, walls[i].h);
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


