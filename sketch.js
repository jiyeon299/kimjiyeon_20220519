let x = 360; //시작 위치 
let y = 760;
let angle = 0;
let speed = 10;

let pacmanSize = 50;
let mapImg;

let enemyX = 1400;
let enemyY = 760;
let enemyDirX = 1;
let enemyDirY = 0;

let enemySpeed = 1;

let energy = 3;
let gameState = "play"; //실행, 승리, 패배 상태 구분
let enemyHit = false;


let walls = [

  //외곽선
  { x: 340, y: 40, w: 2140, h: 40 },  
  { x: 375, y: 1450, w: 2070, h: 40 }, 
  { x: 340, y: 80, w: 40, h: 460 },   
  { x: 2440, y: 80, w: 40, h: 460 }, 
  { x: 380, y: 1000, w: 40, h: 500 },   
  { x: 2395, y: 1000, w: 40, h: 500 }, 
  { x: 375, y: 970, w: 200, h: 40 }, 
  { x: 2240, y: 850, w: 200, h: 160 }, 
  { x: 375, y: 500, w: 200, h: 40 }, 
  { x: 2240, y: 510, w: 200, h: 200 }, 
  { x: 2250, y: 690, w: 580, h: 40 }, 
  { x: 2250, y: 810, w: 580, h: 40 }, 
  { x: 0, y: 690, w: 575, h: 40 }, 
  { x: 0, y: 810, w: 575, h: 40 }, 
  { x: 2240, y: 525, w: 40, h: 200 },
  { x: 280, y: 525, w: 300, h: 200 },
  { x: 280, y: 820, w: 300, h: 200 },
  { x: 2240, y: 810, w: 40, h: 200 },

  //내부 벽 
  { x: 1375, y: 55, w:70, h: 220 },

  { x: 1075, y: 355, w:60, h: 370 },
  { x: 1075, y: 810, w:60, h: 200 },
  { x: 1685, y: 355, w:60, h: 370 },
  { x: 1685, y: 810, w:60, h: 200 },
  { x: 680, y: 360, w:85, h: 220 },
  { x: 2050, y: 360, w:85, h: 220 },
  { x: 2045, y: 1090, w:110, h: 270 },
  { x: 665, y: 1090, w:110, h: 270 },
  { x: 1060, y: 1205, w:75, h: 165 },
  { x: 1680, y: 1205, w:75, h: 165 },
  { x: 1385, y: 1210, w:50, h: 160 },
  { x: 1385, y: 980, w:50, h: 160 },
  { x: 1375, y: 380, w:70, h: 200 },

  { x: 515, y: 1100, w:60, h: 150 },
  { x: 2240, y: 1100, w:60, h: 150 },

  { x: 455, y: 160, w:170, h: 120 },
  { x: 720, y: 160, w:570, h: 120 },
  { x: 455, y: 360, w:150, h: 60 },

  { x: 2190, y: 160, w:170, h: 120 },
  { x: 1525, y: 160, w:570, h: 120 },
  { x: 2210, y: 360, w:150, h: 60 },

  { x: 1840, y: 360, w:295, h: 60 },
  { x: 690, y: 360, w:295, h: 60 },
  { x: 1220, y: 360, w:380, h: 60 },
  { x: 855, y: 515, w:440, h: 60 },
  { x: 1525, y: 515, w:440, h: 60 },

  { x: 1525, y: 1090, w:365, h: 50 },
  { x:925, y: 1090, w:365, h: 50 },
  { x:680, y: 1090, w:160, h: 50 },
  { x:1980, y: 1090, w:160, h: 50 },
  { x: 1525, y: 1320, w:780, h: 50 },
  { x: 515, y: 1320, w:780, h: 50 },
  { x: 670, y: 950, w:300, h: 60 },
  { x: 1845, y: 950, w:300, h: 60 },
  { x: 1230, y: 950, w:350, h: 60 },

  { x: 1235, y: 1205, w:350, h: 50 },

  { x: 850, y: 1205, w:130, h: 50 },
  { x: 1840, y: 1205, w:130, h: 50 },
  { x: 753, y: 655, w:220, h: 215 },
  { x: 1844, y: 655, w:220, h: 215 },

  { x: 1235, y: 655, w:130, h: 215 },
  { x: 1455, y: 655, w:130, h: 215 },

  { x: 1240, y: 670, w:340, h: 210},
];


let beans = [];
let score = 0;

function preload() {
  mapImg = loadImage("Map.png");
}

function setup() {
  createCanvas(2816, 1536);


  beansSet();

}

function draw() {
  image(mapImg, 0, 0, width, height);

  if (gameState != "play") {
  EndMassage();
  return;
  }

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

  
  //콩먹기
  eat_Beans();
  //다먹었는지 체크 
  checkWin();


  if (x < 0 && y > 700 && y < 800) {
  x = 2816;
  y = 768;
  }


  if (x > 2816 && y > 700 && y < 800) {
    x = 0;
    y = 768;
  }



  //벽 확인!! 
  fill(255, 0, 255,120);
  noStroke();

  for (let i = 0; i < walls.length; i++) {
    rect(walls[i].x, walls[i].y, walls[i].w, walls[i].h);
    }

    // 콩 
  fill(255, 220, 150);
  noStroke();

  for (let i =0; i < beans.length; i++){
    if (beans[i].eaten == false){
      circle(beans[i].x, beans[i].y, 15);
    }
  }

  //적이동
  EnemyMove();

  //적 생성 
  drawEnemy();

  checkHit();

  // 팩맨 생성 
  fill(255, 255, 0);
  noStroke();

  let mouth = abs(sin(frameCount * 0.2)) * PI / 5;

  push();
  translate(x,y);
  rotate(angle);
  arc(0,0, pacmanSize, pacmanSize, mouth, TWO_PI - mouth, PIE);
  pop();


  // 점수 
  fill(255);
  textSize(80);
  textAlign(LEFT, TOP);
  text("Score: " + score, 50, 40);

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
    ) 
    return true;

  }
  return false;
}


//콩 생성 함수 
function beansSet(){
  for (let bx = 420; bx < 2450; bx +=60) {
    for (let by = 130; by < 1450; by += 50) {
      // 벽 아니면 콩 생성!! 
      if (!beanInWall(bx, by)) {
        beans.push({
          x: bx,
          y: by,
          eaten: false
        });
      }
    }
  }
}

//콩이 벽 안인지 체크 
function beanInWall (bx, by){
  let beanSize = 30;
  let r = beanSize / 2;

  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    if (
      bx + r > wall.x &&
      bx - r < wall.x + wall.w &&
      by + r > wall.y &&
      by - r < wall.y + wall.h
    ) {
    return true;
    }
  }
  return false;
}


//콩먹기 함수 
function eat_Beans(){

  for (let i = 0; i < beans.length; i++){
    if (beans[i].eaten == false){
      let d = dist (x,y, beans[i].x, beans[i].y);

      if (d < pacmanSize / 2 + 10){
        beans[i].eaten = true ;
        score += 1;
      }
    }
  }
}


// 콩 다먹었는지 체크하기 
function checkWin(){
  for (let i = 0; i < beans.length; i++){
    if (beans[i].eaten == false){
      return ;
    }
  }
  gameState = "win";
} 


//종료 메세지 
function EndMassage() {
  fill(0, 180);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(80);

  if (gameState == "win") {
    text("Congratulations! You win!", width / 2, height / 2 - 80);
  } else if (gameState == "lose") {
    text("Try again! ", width / 2, height / 2 - 80);
  }

  fill(255);
  rect(width / 2 - 180, height / 2 + 20, 360, 100, 20);

  fill(0);
  textSize(45);
  text("RESTART", width / 2, height / 2 + 70);
}



function mousePressed() {
  if (gameState != "play") {

    let left = width / 2 - 180;
    let right = width / 2 + 180;
    let top = height / 2 + 20;
    let bottom = height / 2 + 120;

    if (mouseX > left && mouseX < right) {
      if (mouseY > top && mouseY < bottom) {

        restartGame();

      }
    }

  }
}



function EnemyMove(){
    let nextEnemyX = enemyX + enemyDirX * enemySpeed;
  let nextEnemyY = enemyY + enemyDirY * enemySpeed;

  if (hitWall(nextEnemyX, nextEnemyY)) {
    let r = floor(random(4));

    if (r == 0) {
      enemyDirX = 1;
      enemyDirY = 0;
    } else if (r == 1) {
      enemyDirX = -1;
      enemyDirY = 0;
    } else if (r == 2) {
      enemyDirX = 0;
      enemyDirY = 1;
    } else if (r == 3) {
      enemyDirX = 0;
      enemyDirY = -1;
    }
  } else {
    enemyX = nextEnemyX;
    enemyY = nextEnemyY;
  }

}


function drawEnemy() {
  fill(255, 0, 0);
  noStroke();
  circle(enemyX, enemyY, 50);

  fill(255);
  circle(enemyX - 10, enemyY - 8, 10);
  circle(enemyX + 10, enemyY - 8, 10);
}

function checkHit(){
  let d = dist(x, y, enemyX, enemyY);

  if (d < pacmanSize / 2 + 25) {
    if (enemyHit == false) {
      energy -= 1;
      enemyHit = true;

      x = 360;
      y = 760;

      if (energy <= 0) {
        gameState = "lose";
      }
    }
  } else {
    enemyHit = false;
  }
}

function restart() {
  x = 360;
  y = 760;
  angle = 0;

  enemyX = 1400;
  enemyY = 760;
  enemyDirX = 1;
  enemyDirY = 0;

  energy = 3;
  score = 0;
  gameState = "play";
  enemyHit = false;

  beans = [];
  beansSet();
}