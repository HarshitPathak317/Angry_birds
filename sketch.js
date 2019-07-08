const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Constraint} = Matter;
const CANVAS_WIDTH = 1280,
      CANVAS_HEIGHT = 720;

var engine, world;
var ground, base; // All static bodies
var box1, box2,box3,box4, box5; // box obstacles objects
var log1, log2, log3, log4; // Recatngle obstacles objects
var enemy1, enemy2; // Enemy objects
var bird; //Bird object
var bgImage,groundImage, baseImage, birdImage, boxWood, logWood, enemyImage; // All Sprite's
var mConstraint;
var slingshot;
var platform, platformImage; // Platform object
var slin1, sling2, slingImage1, slingImage2, slingImage3 //Sling and Catapult
var value = false;

function preload(){
  bgImage = loadImage('sprites/bg.png');
  groundImage = loadImage('sprites/ground.png');
  baseImage = loadImage('sprites/base.png')
  birdImage = loadImage('sprites/bird.png');
  boxWood = loadImage('sprites/wood1.png');
  logWood = loadImage('sprites/wood2.png');
  enemyImage = loadImage('sprites/enemy.png');
  platformImage = loadImage('sprites/platform.png');
  slingImage1 = loadImage('sprites/sling1.png');
  slingImage2 = loadImage('sprites/sling2.png');
  slingImage3 = loadImage('sprites/sling3.png');
}

function setup(){
  const canvas =  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  engine = Engine.create();
  world = engine.world;

  // Ground object
  ground = new Ground(width/2, height, width, 50, groundImage);

  // Base for obstacles in brown color
  base = new Base(width - 250,height-35, 350, 20, baseImage)

  // left box obstacle
  box1 = new Obstacle(width-350,height-80,80,80,boxWood);

  // Lower Middle Enemy
  enemy1 = new Enemy(width-250, height-90,50,50,enemyImage);

  // Right box Obstacle
  box2 = new Obstacle(width-150,height-80,80,80,boxWood);

  // Lower Rectangle obstacle
  log1 = new Log(width-250,height-120,280,PI/2,logWood);

  // Middle box obstacle
  box3 = new Obstacle(width-350,height-125,80,80,boxWood);

  // Middle Enemy
  enemy2 = new Enemy(width-250,height-125,50,50,enemyImage);

  // Right box Obstacle
  box4 = new Obstacle(width-150,height-125,80,80,boxWood);

  // Upper Rectangle Obstacle
  log2 = new Log(width-250,height-225,280,PI/2,logWood);

  // Upper Middle box
  box5 = new Obstacle(width-250,height-250,80,80,boxWood);

  // Left Rod
  log3 = new Log(width-320, height-250,150,PI/7,logWood)

  // Right Rod
  log4= new Log(width-180,height-250,150, -PI/7,logWood);

  // Bird Object
  bird = new Bird(270,225,50,50,birdImage);

  // Catapult
  sling1 = new Catapult(270,300,8, 2, slingImage1); // Octagon
  sling2  = new Catapult(244,255, 6, 2, slingImage2); // Hexagon
  // SlingShot for catapult
  slingshot = new SlingShot(270, 225, bird.body);


  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  }

  // A fix for HiDPI displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

  //Platform for catapult
  platform = new Platform(100, 545, 400,300,platformImage);
}


function draw(){
  background(bgImage);
  Matter.Engine.update(engine);

  ground.show();

  base.show();

  box1.show();
  enemy1.show();
  box2.show();

  log1.show();

  box3.show();
  enemy2.show();
  box4.show();

  log2.show();

  box5.show();
  log3.show();
  log4.show();

  platform.show();


  sling1.show();
  bird.show();


  if(mousePressed){
    if(value == true){
      slingshot.show();
    }
  }
  sling2.show();


}

function mouseReleased() {
  value = false;
  setTimeout(() => {
    slingshot.fly();
  }, 100);

  slingshot.destroy()
}

function mousePressed(){
  value = true;
}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(50,height-400,50,50,birdImage);
    slingshot.attach(bird.body);
  }

}
