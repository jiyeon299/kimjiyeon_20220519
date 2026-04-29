let x = 360; //시작 위치 
let y = 760;
let angle = 0;
let speed = 3;

let pacmanSize = 50;
let mapImg;

let walls = [
  { x: 100, y: 100, w: 200, h: 20 },
];

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




