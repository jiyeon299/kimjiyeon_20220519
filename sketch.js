let x = 360; //시작 위치 
let y = 760;
let angle = 0;
let speed = 3;

let pacmanSize = 50;
let mapImg;

let walls = [

  //외곽선
  { x: 340, y: 40, w: 2140, h: 40 },  
  { x: 375, y: 1450, w: 2070, h: 40 }, 
  { x: 340, y: 80, w: 40, h: 460 },   
  { x: 2440, y: 80, w: 40, h: 460 }, 
  { x: 380, y: 1000, w: 40, h: 500 },   
  { x: 2395, y: 1000, w: 40, h: 500 }, 
  { x: 375, y: 970, w: 200, h: 40 }, 
  { x: 2240, y: 970, w: 200, h: 40 }, 
  { x: 375, y: 500, w: 200, h: 40 }, 
  { x: 2240, y: 500, w: 200, h: 40 }, 
  { x: 2250, y: 690, w: 580, h: 40 }, 
  { x: 2250, y: 810, w: 580, h: 40 }, 
  { x: 50, y: 690, w: 525, h: 40 }, 
  { x: 50, y: 810, w: 525, h: 40 }, 
  { x: 2240, y: 525, w: 40, h: 200 },
  { x: 535, y: 525, w: 40, h: 200 },
  { x: 535, y: 820, w: 40, h: 180 },
  { x: 2240, y: 810, w: 40, h: 200 },

  //내부 벽 
  { x: 1375, y: 55, w:70, h: 220 },
  { x: 1375-310, y: 450, w:70, h: 350 },


  
];


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

  //벽 부딪혔는지 확인
  if (!hitWall(nextX, nextY)) {
    x = nextX;
    y = nextY;
  } 

  // 벽 확인!! 
  fill(255, 0, 255,120);
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

function hitWall(nextX, nextY) {
  let r = pacmanSize / 2;
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    if (
      nextX + r > wall.x &&
      nextX - r < wall.x + wall.w &&
      nextY + r > wall.y &&
      nextY - r < wall.y + wall.h
    ) {
      return true;
    }
  }
  return false;
}



