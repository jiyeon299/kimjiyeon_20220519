let x = 360; //시작 위치 
let y = 760;
let angle = 0;
let speed = 3;

let pacmanSize = 50;
let mapImg;

let roads = [

  //왼쪽 입구 
  { x: 0, y: 720, w: 580, h: 90 },
  //오른쪽 입구
  { x: 2250, y: 720, w: 560, h: 90 },

  //길게 쭉 일단 
  { x: 330, y: 120, w: 2150, h: 90 },
 
  //{ x: 330, y: 300, w: 2150, h: 90 },

  //{ x: 330, y: 520, w: 2150, h: 90 },

  { x: 580, y: 600, w: 170, h: 400 },
  // { x: 330, y: 720, w: 2000, h: 90 },
  // { x: 330, y: 720, w: 2000, h: 90 },
  // { x: 330, y: 720, w: 2000, h: 90 },

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

  // 도로 충돌 체크
  if (onRoad(nextX, nextY)) {
    x = nextX;
    y = nextY;
  }


  // 도로 확인!! 
  fill(255, 0, 255,150);
  noStroke();

  for (let i = 0; i < roads.length; i++) {
    rect(roads[i].x, roads[i].y, roads[i].w, roads[i].h);
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

//길 위에 있는지 체크하는 함수
function onRoad(hx, hy) {
  let r = pacmanSize / 2;


  let points = [
    { x: hx + r, y: hy }, // 오른쪽
    { x: hx - r, y: hy }, // 왼쪽
    { x: hx, y: hy + r }, // 아래
    { x: hx, y: hy - r }  // 위 
  ];


  for (let i = 0; i < points.length; i++) {
    if(!pointOnRoad(points[i].x, points[i].y)) {
      return false;
    }
  }
  return true;
}

// 길 위에 꼭짓점이 있는지 체크하는 함수
function pointOnRoad(hx, hy) {
  for (let i = 0; i < roads.length; i++) {
    let road = roads[i];

    if (
      hx > road.x &&
      hx < road.x + road.w &&
      hy > road.y &&
      hy < road.y + road.h
    ) {
      return true;
    }
  }
  return false;
}


