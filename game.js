// Dictionary contatining info for each button
function Button(id, sound) {
  this.id = id;
  this.sound = sound;
}

// Constants to be used
const N = 4;
var producedPattern = [];
var followedPattern = [];
var gameStatus = false;
var iteration = 0;

// This is the Dictionary containing my buttons
const buttons = {
  'red': new Button(1, new Audio("sounds/red.mp3")),
  'blue': new Button(2, new Audio("sounds/blue.mp3")),
  'yellow': new Button(3, new Audio("sounds/yellow.mp3")),
  'green': new Button(4, new Audio("sounds/green.mp3"))
};

// Wrong sound
wrongSound = new Audio("sounds/wrong.mp3");


function generateRandomButton(max) {
  return Object.keys(buttons)[Math.floor(Math.random() * max)];
}

function generateButton() {
  setTimeout(function() {
    newButton = generateRandomButton(N);
    producedPattern.push(newButton);
    console.log(producedPattern);
    playAnimation(newButton, true);
  }, 500);
}

function playAnimation(btn, isInputCorrect) {
  $("." + btn).addClass("pressed");
  setTimeout(function() {
    $("." + btn).removeClass("pressed");
  }, 100);
  if (isInputCorrect) {
    buttons[btn]['sound'].play();
  } else {
    wrongSound.play();
  }
}

$(".btn").click(function() {
  console.log(gameStatus);
  if (gameStatus == true) {
    followedPattern.push(this.id);
    isInputCorrect = validateGame(producedPattern, followedPattern);
    if (isInputCorrect) {
      playAnimation(this.id, true);
      actionWhenRight();
    } else {
      playAnimation(this.id, false);
      actionWhenWrong();
    }
  }
});

$(document).keypress(function(event) {
  if (gameStatus == false) {
    resetGame();
    startGame();
  }
});

function resetGame() {
  producedPattern = [];
  followedPattern = [];
  iteration = 0;
  gameStatus = false;
}

function startGame() {
  gameStatus = true;
  generateButton();
}

function validateGame(basePattern, subPattern) {
  return basePattern[subPattern.length - 1] == subPattern[subPattern.length - 1]
}

function actionWhenRight() {
  if (producedPattern.length == followedPattern.length) {
    followedPattern = [];
    generateButton();
  }
}

function actionWhenWrong() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  resetGame();
}
