var bananaImage, jungleImage, obstacle_img, monkeyAnimated;
var monkey,obstaclesGroup, bananaGroup, jungle, banana, score, dist, countOut, countSize;
var invisibleground1;
var timing,exacts;
var state = "play";
var restart,rImg;

function preload(){
  monkeyAnimated = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  jungleImage = loadImage("jungle.jpg");
  obstacle_img = loadImage("stone.png");
  rImg = loadImage("restart.png");
}

function setup(){
  createCanvas(400,400);
  jungle = createSprite(100,100);
  jungle.addImage("jungle", jungleImage);
  monkey = createSprite(65,250);
  monkey.addAnimation("monkey", monkeyAnimated);
  monkey.setInterval = 1;
  monkey.scale = 0.1;
  invisibleground1 = createSprite(200,310,400,51);
  invisibleground1.visible = false;
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  dist = monkey.y + (monkey.height/2);
  countOut = 0;
  countSize = 0;
  score = 0;
  restart = createSprite(200,300);
  restart.addImage(rImg);
  restart.visible = false;
} 

function draw(){
  background(255,255,255);
  
  spawnBanana();
  spawnObstacles();
  
  exacts = Math.round(performance.now()/1000);


  if(state == "play"){
    jungle.velocityX = -5;

    monkey.velocityY = monkey.velocityY+1;

    monkey.collide(invisibleground1);

    document.getElementById("demo").innerHTML = "Score : "+ score;

    dist = monkey.y + monkey.height;

    if(jungle.x <= 0){
      jungle.x = width/2;
    }

    if(keyDown("space") && dist >= 265){
      monkey.velocityY = -15;
    }

    if(dist >= 265){
      monkey.play();
    }

    if(dist <= 265){
      monkey.pause();
    }
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 2; 
    }  

    if(score%10 == 0 && score >0 && countSize == 0){
      monkey.scale = monkey.scale + 0.02;
      countSize = 1;
    }

    if(score%10 == 2 && score > 0 && countSize != 0){
        countSize = 0;
    }

    if(bananaGroup.xEach <= 0){
      bananaGroup.setLifetimeEach(-1);
    }

    if(monkey.isTouching(obstaclesGroup) && countOut ==0){
      monkey.scale = 0.02;
      countOut = 1;
      timing = exacts;
    }

    if(exacts >= timing + 10){
      countOut = 0;
    }

    console.log(timing);

    if(monkey.isTouching(obstaclesGroup) && countOut ==1){
      countOut = 2;
      state = "lose"
      monkey.pause();
      monkey.velocityY=0;
      obstaclesGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstaclesGroup.destroyEach();
      bananaGroup.destroyEach();
      jungle.velocityX = 0;
      jungle.visible = false;
      monkey.visible = false;
      restart.visible = true;
    }
  }  

  if(state == "lose"){
    background("black");

    fill("red");
    stroke("yellow");
    textSize(40);
    strokeWeight(3);
    text("YOU SCORED "+ score,10,200);

    if(mousePressedOver(restart)){
      state = "play";
      score = 0;
      jungle.visible = true;
      monkey.visible = true;
      restart.visible = false;
      countOut = 0;
      countSize = 0;
      monkey.scale = 0.1;
      monkey.play();
      monkey.y = 150;
    }
  }
  drawSprites();
} 

function spawnBanana(){
  if(frameCount%90 == 0 && frameCount > 0 && state == "play"){
    banana=createSprite(450,random(125,175));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.05;
    banana.velocityX= -5;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%133 == 0 && frameCount > 0 && state== "play"){
    obstacles = createSprite(450,265);
    obstacles.addImage("stone",obstacle_img);
    obstacles.setCollider("circle",5,0,200);
    obstacles.scale = 0.14;
    obstacles.velocityX = -5;
    obstaclesGroup.add(obstacles);
  }
}