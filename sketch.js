var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;

var score = 0;
var count = 0;
var particle ;
var gameState = "play";
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,375));
    }    
}
function draw() {
  background("black");
  Engine.update(engine);
 
   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }

   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
   }

   for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
 
  if(particle != null) {
    particle. display(); 
    var pos = particle.body.position;
    if(pos.y > 760) {
      if(pos.x < 300) {
        score = score + 500;             
      } 
      if(pos.x > 300 && pos.x < 600 ) {
        score = score + 100;     
      } 
      if(pos.x > 600 && pos.x < 900 ) {
        score = score + 200;     
      } 
      particle = null;
      if( count >= 5) gameState = "end";  
    }

  }
  if(gameState === "end"){
   textSize(60);
   text("GAME OVER",225,475);
} 

  textSize(20)
  text("Score : " +score,20,30);
  text("500", 20,525);
  text("500", 100,525);
  text("500", 180,525);
  text("500", 260,525);
  text("100", 340,525);
  text("100", 420,525);
  text("100", 500,525);
  text("200", 580,525);
  text("200", 660,525);
  text("200", 740,525);
   
}
function mousePressed(){
  if(gameState !== "end"){
    count++;
    particle = new Particle(mouseX, 10 , 10, 10)
  }
}