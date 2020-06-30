var monkey,monkeyrunning,banana,stone,display,score = 0,ground,gameState = "play";

function preload(){
  monkeyrunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  displayimage = loadImage("jungle.jpg");
  bananaimage = loadImage("Banana.png");
  stoneimage = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  
  display = createSprite(300,150,600,300);
  display.addAnimation("displayimage",displayimage);
  
  display.scale = 1;
  display.x = display.width/2;
  monkey = createSprite(60,260,10,10);
  monkey.addAnimation("monkeyrunning",monkeyrunning);
  
  monkey.scale = 0.09;
  ground = createSprite(300,292,600,10);
  ground.visible = false;
  
  bananaGroup = createGroup();
  
  stoneGroup = createGroup();
}


function draw(){
  background(255); 
  createEdgeSprites();
  monkey.collide(ground);
  
  if(keyDown("space") && monkey.y >= 260)
    {
      monkey.velocityY = -12;
    }
  
  if(gameState == "play" || monkey.scale == 0.12 || monkey.scale == 0.14 || monkey.scale == 0.16 ||  monkey.scale == 0.18 || monkey.scale == 0.2)
  {  
    display.velocityX = -6;
    monkey.velocityY = monkey.velocityY + 0.6;
    if(display.x < 60)
    {
      display.x = display.width/2;
    }
    spawnBanana();
    spawnStone();
    if(monkey.isTouching(bananaGroup))
    {
      score = score + 2;
      bananaGroup.destroyEach();
    }
    if(stoneGroup.isTouching(monkey))
    {
      monkey.scale = 0.1;
      gameState = "end";
    }
  }
  else if(gameState == "end")
  {
    monkey.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    display.velocityX = 0;
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  if(monkey.scale == 0.09 || monkey.scale == 0.12 || monkey.scale == 0.14 || monkey.scale == 0.16 || monkey.scale == 0.18 || monkey.scale == 0.2)
  {
    gameState = "play";
  }
  
  switch(score)
  {
    case 10 : monkey.scale = 0.12;
    break;
      
    case 20 : monkey.scale = 0.14;
    break; 
      
    case 30 : monkey.scale = 0.16;
    break;
      
    case 40 : monkey.scale = 0.18;
    break;
      
    case 50 : monkey.scale = 0.2;
    break;
      
    default: break;
  }
  
  drawSprites();
  fill("white");
  text("Score: "+score,500,30);
}

function spawnBanana()
{
  if(World.frameCount % 80 == 0)
  {
    banana = createSprite(610,random(170,280),10,10);
    banana.addAnimation("banana",bananaimage);
    banana.scale = 0.05;
    banana.velocityX = -8;
    bananaGroup.add(banana);
  }
}

function spawnStone()
{
  if(World.frameCount % 150 == 0)
  {
    stone = createSprite(610,290,10,10);
    stone.addAnimation("stone",stoneimage);
    stone.scale = 0.3;
    stone.velocityX = -6;
    stone.setCollider("circle",0,0,150);
    stoneGroup.add(stone);
    stone.debug = true;
  }
}