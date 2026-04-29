let x = 360; //시작 위치 
let y = 760;
let angle = 0;
let speed = 3;

let pacmanSize = 50;
let mapImg;

let roads = [
  //왼쪽 입구 
  { x: 0, y: 690, w: 560, h: 90 },
  //위쪽 가로 큰길
  { x: 330, y: 120, w: 2150, h: 90 },
  // 상단 
  { x: 330, y: 300, w: 2150, h: 90 },
  { x: 330, y: 520, w: 2150, h: 90 },
  { x: 330, y: 740, w: 2150, h: 90 },
  { x: 330, y: 960, w: 2150, h: 90 },
  { x: 330, y: 1320, w: 2150, h: 90 },

  //왼쪽 세로 
  { x: 330, y: 120, w: 90, h: 360 },
  { x: 560, y: 300, w: 90, h: 260 },
  { x: 560, y: 960, w: 90, h: 360 },

  //중앙 세로
  { x: 1050, y: 300, w: 90, h: 420 },
  { x: 1340, y: 300, w: 90, h: 240 },
  { x: 1340, y: 960, w: 90, h: 360 },
  { x: 1660, y: 300, w: 90, h: 420 },

  //오른쪽 세로 
  { x: 2160, y: 300, w: 90, h: 260 },
  { x: 2390, y: 120, w: 90, h: 360 },
  { x: 2160, y: 960, w: 90, h: 360 }

]
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
    y = nextY;
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


