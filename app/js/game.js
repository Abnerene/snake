var myBody;
var map;

async function init() {
  myBody = getEID("myBody");
  map = getEID("map");
  
  await Map();
  newFood()
}

var limitLine = 0;
function Map() {
  map.innerHTML = "";
  optionsSize = [1, 4, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169];
  arraySize = optionsSize[5];
  
  getEID("nBlocks").innerHTML = arraySize + " Blocks";
  s = 0;
  mapHeigth = map.offsetHeight;
  mapWidth = map.offsetWidth;

  blockSize = mapHeigth / Math.sqrt(arraySize);
  limitLine = Math.sqrt(arraySize);
  var xPos = 0;
  var yPos = 0;
  limit = 0;

  while (s < arraySize) {
    bgColor = `${getRandom(2)},${getRandom(0)},${getRandom(255)}`;
    block = nElement("div", map);
    block.setAttribute("class", "blockFree");
    block.style.width = blockSize + "px";
    block.style.height = blockSize + "px";
    block.style.background = "rgb(" + bgColor + ")";

    if (xPos == limitLine) {
      xPos = 0;
      yPos++;
    }
    idBlock = "block-" + xPos + "-" + yPos;
    block.setAttribute("id", idBlock);
    xPos++;
    s++;
  }
 
}

var Snake = {
  position: {
    x: 0,
    y: 0,
  },
  head: "block-0-0",
  tail: "block-0-0",
  body: [],
  size: 2,
};

var moveOn = {
  x0: false,
  y0: false,
  x1: true,
  y1: false,
};

var snakeSize = 1;
function moveSnake() {
  var xPos = Snake.position.x;
  var yPos = Snake.position.y;

  if (moveOn.x0) Snake.position.x = xPos - 1;
  if (moveOn.x1) Snake.position.x = xPos + 1;
  if (moveOn.y0) Snake.position.y = yPos - 1;
  if (moveOn.y1) Snake.position.y = yPos + 1;

  if (snakeSize > Snake.size ) {
    if(Snake.body[0]){
        console.log(Snake.body[0]);
        resetBlock(Snake.body[0]);
        Snake.body.shift();
    }
  }

  block = "block-" + xPos + "-" + yPos;
  if (getEID(block)) {
    getEID(block).setAttribute("class", "snakeBlock");
    if(block == Food.block){
        newFood()
        snakeSize=Snake.size
        Snake.size+= 1
        console.log(Snake.size)
        console.log(Snake.body[0])
        console.log(Snake.body)
    }
    Snake.body.push( "block-" + xPos + "-" + yPos);
    snakeSize++;

  } else {
    alert("GameOver");
    startGame(false);
    resetGame();
  }

  
}

var Food={
    block:''
};
function newFood(){

    while(true){
    xPos=getRandom(limitLine)-1;
    yPos=getRandom(limitLine)-1;
    block=getEID('block-'+xPos+'-'+yPos);

        if(block.getAttribute('class')!='snakeBlock' ){
            block.setAttribute('class','foodBlock');
            Food.block=block.getAttribute('id');
            break;
        }
    }

}

function resetBlock(block) {
  block = getEID(block);
  if(block){
    block.style.background = randomColor();
    block.setAttribute("class", "blockFree");
  }
}

function controls(value) {
  // console.log(value);
  moveOn.x0 = false;
  moveOn.x1 = false;
  moveOn.y0 = false;
  moveOn.y1 = false;
  if (value == "x0") moveOn.x0 = true;
  if (value == "x1") moveOn.x1 = true;
  if (value == "y0") moveOn.y0 = true;
  if (value == "y1") moveOn.y1 = true;
}

function updateMap() {
  moveSnake();
}

var gameClock = 0;

function startGame(status) {
  if (status) {
    gameClock = setInterval(updateMap, 1000);
  } else {
    clearInterval(gameClock);
  }
}

function resetGame() {
  Snake.position.x = 0;
  Snake.position.y = 0;
  Map();
  newFood()
}



function randomColor() {
  bgColor = `${getRandom(2)},${getRandom(0)},${getRandom(255)}`;
  return bgColor;
}
