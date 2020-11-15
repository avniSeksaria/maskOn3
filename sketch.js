var backImage,backgr;
var player, player_running;
var ground;

var maskGroup, maskImage;
var obstaclesGroup, obstacle_img;

//var gameOver=false;

var score=0;
var chance=5;
var chance1, chance2, chance3, chance4, chance5; 
var chance1Img, chance2Img, chance3Img, chance4Img, chance5Img;
var medicalImg, medical;
var startButton;
var bgMusic;
var PLAY =1;
var END = 0;
var FrontScreen=2
var gameState = FrontScreen;
var database;

var EnterName;
var logo;
var button;

function preload(){

//bgMusic = loadSound("Deal.mp3");
  player_running=loadImage("image/person.png");
  obstacle_img=loadImage("image/obstacle.png");
 backImage=loadImage("image/background1.jpg");
  maskImage=loadImage("image/mask.png");
  chance1Img=loadImage("image/chance1.png");
medicalImg=loadImage("image/GameOver.png");
//bgMusic = loadSound("Deal.mp3")
logo = loadImage("image/logo.jpg");
}

function setup(){
 database = firebase.database();
 //console.log(database);
 EnterName=prompt("Enter your Name");
 //console.log(EnterName); 
 database.ref(EnterName).update({playerName:EnterName})


 createCanvas(1000,500);


  button=createButton("Play!")
  button.position(425, 350);
  

  backgr=createSprite(0,0,1000,1000);
 backgr.addImage(backImage);
 backgr.visible=false;
  backgr.scale=2;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  
 

  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  player = createSprite(100,340,20,50);
  player.visible=false
  player.addImage(player_running);
  player.scale=0.2

  chance1=createSprite(450,70,20,20);
  chance1.addImage(chance1Img);
  chance1.visible=false
  chance1.scale=0.07;

  chance2=createSprite(480,70,20,20);
  chance2.addImage(chance1Img);
  chance2.visible=false
  chance2.scale=0.07;

  
  chance3=createSprite(510,70,20,20);
  chance3.addImage(chance1Img);
  chance3.visible=false
  chance3.scale=0.07;


  chance4=createSprite(540,70,20,20);
  chance4.addImage(chance1Img);
  chance4.visible=false
  chance4.scale=0.07;


  chance5=createSprite(570,70,20,20);
  chance5.addImage(chance1Img);
  chance5.visible=false
  chance5.scale=0.07;



medical=createSprite(300, 300)
medical.addImage(medicalImg);
medical.scale=0.8
medical.visible=false


  maskGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  //background(0,0,1000,1000);
  background(137, 133, 133);
  if (gameState===FrontScreen){
 image(logo,300,15, 300, 300);
 button.mousePressed(()=>{gameState=PLAY})
  }
  else if(gameState === PLAY){
   // bgMusic.play()
   backgr.visible=true;
   player.visible=true;
   chance1.visible=true
   chance2.visible=true
   chance3.visible=true
   chance4.visible=true
   chance5.visible=true
   button.hide();
    if(ground.x<0) {
      ground.x=ground.width/2;
    }
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
    for(var i =0;i<maskGroup.length;i++){
      if(maskGroup.get(i).isTouching(player)){
        maskGroup.get(i).destroy();
      score = score + 2;
      }
    }
      
      if(keyDown("space")&&player.y>275 ) {
        player.velocityY = -15;
      }
      player.velocityY = player.velocityY + 0.5;
      spawnmask();
      spawnObstacles();
      for(var i =0;i<obstaclesGroup.length;i++){
        if(obstaclesGroup.get(i).isTouching(player)){ 
       chance--
     obstaclesGroup.get(i).destroy();
     }
     if(chance===4){
     chance5.visible=false;
     console.log(chance)
     }
     if(chance===3){
       chance4.visible=false;
       }
       if(chance===2){
         chance3.visible=false;
         }
           if(chance===1){
             chance2.visible=false;
             }
             if (chance===0){
               gameState = END;
             }
     }
  }
 else if(gameState === END){
   gameOver();
 }
  
    player.collide(ground);
   
  drawSprites();
 if(gameState!==FrontScreen){
   stroke("blue");
 textSize(20);
 fill("white");
 text("Score: "+ score, 500,50);}
  
}

function spawnmask() {
  //write code here to spawn the mask
  if (frameCount % 80 === 0) {
    var mask = createSprite(600,250,40,10);
    mask.y = random(120,200);    
    mask.addImage(maskImage);
    mask.scale = 0.1 ;
    mask.velocityX = -5;
     //assign lifetime to the variable
    mask.lifetime = 300;
    player.depth = mask.depth + 1;
    
    //add each mask to the group
    maskGroup.add(mask);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
   obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function gameOver(){
  chance1.visible=false;
          medical.visible=true;
          //gameOver=true
          backgr.velocityX=0;
          maskGroup.setVelocityXEach(0)
          obstaclesGroup.setVelocityXEach(0);
         database.ref(EnterName).update({playerScore:score})
}

  
