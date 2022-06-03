var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;


var zombieGroup;

var score = 0;
var life = 3;
var bullets = 70;



var gameState = "fight"



function preload(){
  
	

  shooterImg = loadImage("shooter1.png");
  shooter_shooting = loadImage("shooter2.png");

  zombieImg = loadImage("zombie.png");

  bgImg = loadImage("bg.png");

  

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
 

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)


  
   

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(0);
  image(bgImg,0,0,displayWidth,displayHeight); 


if(gameState === "fight"){

 

 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  
  player.addImage(shooter_shooting)
  bullets = bullets-1
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets
if(bullets==0){
  gameState = "bullet"
 
    
}

//destroy the zombie when bullet touches it and increase score
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
     
 
        score = score+2
        } 
  
  }
}

//reduce life and destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 
 
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
      
      life=life-1
       } 
 
 }
}

//calling the function to spawn zombies
enemy();
}




drawSprites();

//displaying the score and remaining lives and bullets
textSize(20)
  fill("white")
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)





//destroy zombie, player and bullets and display a message in gameState "bullet"
 if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.3
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}


