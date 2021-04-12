//Create variables here
var dog,dogImg, happyDogImg, database, foodS, foodStock , milkImg ,foodObj;
var lastFed,fedTime,food;
function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(850, 500);

  database = firebase.database();

  dog = createSprite(650,250,5,5);
  dog.scale=  0.2;
  dog.addImage(dogImg);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,65);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,65);
  addFood.mousePressed(addFoods);

  food = new Food();
 

}


function draw() {  
  background(46,139,87);

  dog.display();
  food.display();

  //add styles here
  fill(255,255,254);
  stroke("white");
  textSize(15);

  if(lastFed>=12){
    text("Last Feed: "+lastFed%12 +" PM",200,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",200,30);
  }else{
    text("Last Feed: "+lastFed+" AM",200,30);
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  drawSprites();
}

function readStock(data)
{
    foodS = data.val();
    food.updateFoodStock(foodS);
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDogImg);
  if(food.getFoodStock()<=0){
    food.updateFoodStock(food.getFoodStock()*0);
  }
  else{
    food.updateFoodStock(food.getFoodStock()-1)
  }
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })
}



