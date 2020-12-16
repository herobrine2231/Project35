//const Engine = Matter.Engine;
 //const  World = Matter.World;
 //const Events = Matter.Events;
 // const Bodies = Matter.Bodies;
  //const Constraint = Matter.Constraint;

var dog, happyDog,database,foodS,foodStock;
var dogImage1, dogImage2,dogImage3,dogImage4;
var dogSprite;

var feedPet, addFoods, fedTime,lastFed;
var foodObj;

function preload()
{
  dogImage1=loadImage("images/Dog.png");
  dogImage2=loadImage("images/dogImg.png");
  dogImage3=loadImage("images/dogImg1.png");
  dogImage4=loadImage("images/happydog.png");
}

function setup() {

  database = firebase.database();
  console.log(database);

  createCanvas(500,500);
  
  dogSprite=createSprite(width/2,80,10,10);
  dogSprite.addImage(dogImage1);
  dogSprite.scale=0.2;

 // foodStock=database.ref('Food');
  //foodStock.on("value", readStock);

  foodObj= new Food();

  feedPet= createButton("Feed the dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);
  
  addFoods=createButton("Add Food");
  addFoods.position(800,95);
  addFoods.mousePressed(addFood);
}


function draw() {  

  background(46,139,87);

  foodObj.display();
 /* if(keyWentDown(UP_ARROW))
  { 
    writeStock(foodS);
    dogSprite.addImage(dogImage4);
  }*/

  drawSprites();
  //add styles here

  textSize(20);
  fill("white");
  stroke(10);
  text("Food Stock:" +foodStock, 20,30);

  fedTime= database.ref('FeedTime');
  fedTime.on("value", function(data)
  {
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed: "+ lastFed%12 + "PM", 350,30)
  }
  else if(lastFed==0)
  {
    text("Last Feed: 12 AM", 350,30);
  }
  else
  {
    text("Last Feed: " +lastFed +"AM", 350,30);
  }
}

function feedDog()
{
  dog.addImage(dogImage4);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update(
    {
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    }
  )
}

function addFood()
{
  foodS++;
  database.ref('/').update(
    {
      Food:foodS
    }
  )
}
/*function readStock(data)
{
  foodS=data.val();
}*/

/*function writeStock(x)
{
  if(x<=0)
  {
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({Food:x})
}*/


