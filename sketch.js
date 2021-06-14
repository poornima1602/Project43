var backImage,backgr;
var player, player_running,player_collided;
var ground,ground_img;
var obstacle_img,banana_img;
var gameOver_img,restart_img,youWon_img;

var obstaclesGroup,pointsGroup;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var score=0;

function preload(){
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacle_img = loadImage("stone.png")
  banana_img = loadImage("banana.png");
  gameOver_img= loadImage("gamOver.png")
  restart_img= loadImage("restart.png");
  player_collided= loadImage("Monkey_01.png");
  youWon_img=loadImage("you won.png");
}

function setup() {
  createCanvas(1000,500);
  
  backgr=createSprite(200,100,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,400,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver=createSprite(500,200);
  gameOver.addImage(gameOver_img);
  gameOver.scale=0.5;
  gameOver.visible=false;

  restart=createSprite(500,400);
  restart.addImage(restart_img);
  restart.scale=0.5;
  restart.visible=false;
  
  obstaclesGroup = new Group();
  pointsGroup = new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    gameOver.visible = false;
  restart.visible = false;
  
    backgr.velocityX=-(4 + 3*score/50);
  if(backgr.x<250){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y > 150) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    
    spawnObstacles();
    spawnPoints();

    if(pointsGroup.isTouching(player)){
      score+=10;
      player.scale+=0.005;
      pointsGroup.destroyEach();
    }

    if(obstaclesGroup.isTouching(player)){
      obstaclesGroup.destroyEach();
      pointsGroup.destroyEach();
      gameState=END;
    }

  }

  else if(gameState===END){
    player.addImage("collided",player_collided)
    gameOver.visible=true;
    restart.visible=true;
    backgr.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    pointsGroup.setVelocityXEach(0);
  }

  if(mousePressedOver(restart)){
    reset();
  }

  drawSprites();
  
  textSize(30);
  textFont("waltography");
  fill("yellow")
  text("SCORE : "+score,60,50);
}

function spawnObstacles(){
if(frameCount%120===0){
  var obstacle=createSprite(1000,380);
  obstacle.addImage(obstacle_img);
  obstacle.scale=0.2;
  obstacle.velocityX=-(5 + 3*score/50);
  obstaclesGroup.add(obstacle)
}
}

function spawnPoints(){
  if(frameCount%180===0){
    var points=createSprite(1000,Math.round(random(50,350)));
    points.addImage(banana_img);
    points.scale=0.1;
    points.velocityX=-(5 + 3*score/50);
    pointsGroup.add(points)
  }
}

function reset(){
  player.y=340;
  gameState = PLAY;
  score = 0;
  obstaclesGroup.destroyEach();
  pointsGroup.destroyEach();
}