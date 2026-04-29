let x = 360; //시작 위치 
let y = 760;
let angle = 0;
let speed = 3;

let pacmanSize = 50;
let mapImg;

let roads = [

  //왼쪽 입구 
  { x: 0, y: 720, w: 600, h: 90 },
  //오른쪽 입구
  { x: 2200, y: 720, w: 600, h: 90 },

  //가로선들
  {x: 380, y: 80, w: 990, h: 90 },
  {x: 1445, y: 80, w: 990, h: 90 },
  {x: 420, y: 275, w: 1970, h: 90 },
  {x: 420, y: 420, w: 1970, h: 90 },
  {x: 420, y: 1270, w: 250, h: 60 },
  {x: 790, y: 1270, w: 280, h: 60 },
  {x: 1140, y: 1270, w: 245, h: 60 },
  {x: 1440, y: 1270, w: 245, h: 60 },
  {x: 1750, y: 1270, w: 280, h: 60 },
  {x: 2150, y: 1270, w: 250, h: 60 },
  {x: 790, y: 1130, w: 1250, h: 75 },  
  {x: 700, y: 870, w: 1500, h: 80 },
  {x: 700, y: 575, w: 1500, h: 80 },
  {x: 420, y: 1010, w: 1970, h: 85 },
  {x: 420, y: 1365, w: 1970, h: 85 },



  //중앙 세로 
  { x: 580, y: 575, w: 175, h: 375 },
  { x: 975, y: 575, w: 90, h: 375 },
  { x: 1140, y: 575, w: 90, h: 375 },
  { x: 1585, y: 575, w: 90, h: 375 },
  { x: 1750, y: 575, w: 90, h: 375 },
  { x: 2065, y: 575, w: 175, h: 375 },


  //위쪽 세로 
  { x: 370, y: 90, w: 90, h: 420 },
  { x: 2350, y: 90, w: 90, h: 420 },
  { x: 2100, y: 80, w: 90, h: 250 },


  // { x: 560, y: 300, w: 90, h: 260 },
  // { x: 560, y: 960, w: 90, h: 360 },


 

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


