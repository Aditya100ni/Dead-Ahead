var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bullet, bulletImg;

var player, player_jump, player_running;
var ground, groundImage, invisibleGround1, invisibleGround2, invisibleGround3;

var obstaclesGroup, obstacle;
var dead

var score=0;
var enemy,enemyImg;
var es
function preload() {
player_running = loadAnimation("r1.png","r2.png","r3.png","r4.png","r5.png","r6.png",)
player_jump = loadAnimation("jump1.png","jump2.png","jump3.png","jump4.png","jump5.png",)

groundImage = loadImage("ground.png")
backgroundImage1 = loadImage("day.png");

enemyImg = loadAnimation("e1.PNG","e2.PNG","e3.PNG","e4.PNG","e5.png")
enemyImg.scale = 0.1
es = loadImage("e1.png")
bulletImg = loadImage("bullet.png");



}

function setup() {
  createCanvas(1360, 610);;
 score = 0;

  ground = createSprite(0,565,130000,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/4;
  
  //ground.velocityX = -(6 + 3*score/100);

  invisibleGround1 = createSprite(0,600,3000,10);
  invisibleGround1.visible = true;

  invisibleGround2 = createSprite(1359,300,10,900);
  invisibleGround2.visible = false;

  invisibleGround3 = createSprite(0,300,10,600);
  invisibleGround3.visible = false;

  player = createSprite(70,180,20,50);
  player.addAnimation("running", player_running);
  player.addAnimation("running", player_jump);
  player.scale = 0.3;

  bullet = createSprite(70,50,10,10)
  bullet.addImage(bulletImg);
  bullet.scale = 0.1

  obstaclesGroup = new Group()
  enemy = createSprite(50,50,50,50)
 enemy.addImage(es)
  enemy.scale = 0.
}

function draw() {
  background(backgroundImage1);  
fill("red")
textSize(50)
text("Dead Ahead",width/4,height/8)
text(score,80,50)


  if(keyDown("space") && player.y >= 478.85) {
    player.velocityY = -12;
    player.addAnimation("running", player_jump);
  }
  if(keyDown("D")) {
    player.x =  player.x + 5;
    ground.x =  ground.x - 5;
  }
  if(keyDown("a")) {
    player.x =  player.x  -5;
    ground.x =  ground.x + 5;
  }
  player.velocityY = player.velocityY + 0.8

  
  player.collide(invisibleGround1);
  player.collide(invisibleGround2);
  player.collide(invisibleGround3);

  if (ground.x < 50 || ground.x > 50){
    ground.x = ground.width/2;
  }

  console.log(player.y)
 //box1.x = World.mouseX;
  //box1.y = World.mouseY;
  bullet.y = player.y
  //bullet.x = player.x

if(keyDown("F")){
  bullet.velocityX= 10;
}
if(bullet.x>1000){
  bullet.x = player.x
  bullet.y = player.y
}
if(obstaclesGroup.isTouching(bullet)){
  for(var i = 0; i < obstaclesGroup.length;i++){
    if(obstaclesGroup[i].isTouching(bullet)){
      obstaclesGroup[i].destroy()
      bullet.destroy()
      bullet.
      score = score+1
     
    }
  }
}
  spawnObstacles();
  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  //obstaclesGroup.destroyEach();
  //cloudsGroup.destroyEach();
  
  player.changeAnimation("running",player_running);
  
  
  score = 0;
  
}

function spawnObstacles() {
  if(frameCount % 30 === 0) {
     obstacle = createSprite(camera.x+width/2,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.y = Math.round(random(500,550))
    obstacle.addAnimation("enemy",enemyImg)
    //generate random obstacles
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
obstaclesGroup.add(obstacle)
     
  }
}
