var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var mankey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var ground;
var survivalTime = 0;
var score = 0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided = loadAnimation("sprite_1.png");
}

function setup() {
  createCanvas(650, 250);
 
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,245,900,10);
  ground.velocityX=-6;
  ground.x=width/2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();  
  //monkey.debug = true
}

function draw() {
 background("lightblue");
  
  if(gameState === PLAY){
    
    ground.velocityX = -(6 + 5* score/100);
     
   if(ground.x < 0){
    ground.x = ground.width/2;
    } 
    
 if(keyDown("space") && monkey.y >= 100) {
     monkey.velocityY = -8;
    }
   monkey.velocityY = monkey.velocityY + 0.5;
   
   monkey.collide(ground);
   
   spawnBananas();
   spawnObstacles();  
   
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
   if(FoodGroup.isTouching(monkey)){
     score=score+2;
   }
  }
  else if (gameState === END) {
     
     monkey.changeAnimation(monkey_collided);
     ground.velocityX = 0;
     monkey.velocityY = 0;
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
  }
   drawSprites();
   stroke("white");
   textSize(15);
   fill("white");
   text("Score: " + score, 480, 50);
  
   stroke("black");
  textSize(15)
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 480,70);
}

function spawnObstacles(){
  if(frameCount % 70 === 0){
   var obstacle = createSprite(600,220,10,40);
   obstacle.velocityX = -(4 + score/100);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   var rand = Math.round(random(1,6));
   obstacle.lifetime = 220;
   obstacleGroup.add(obstacle);
  }  
}
function spawnBananas() {
  if(frameCount % 70 === 0) {
    var banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(70,140));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(4 + score/100);
    banana.lifetime = 220;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1
    FoodGroup.add(banana);
  }
}