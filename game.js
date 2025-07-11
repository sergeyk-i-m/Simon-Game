let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;
let buttonColours = ["red", "blue", "green", "yellow"];

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

$(document).keypress(function() { //user press any key
  if (!gameStarted) {
    gameStarted = true;
    $("h1").text(`Level ${level}`);
    nextSequence();
  }
});

$(document).ready(function(){ //user clicked button/ user's chose
  $(".btn").on("click", function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  })
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  
}

function nextSequence(){ //the game code
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4); //создаем рандомное число от 0 до 3
    level++;
    $("h1").text(`Level ${level}`);
    let randomChosenColour = buttonColours[randomNumber]; //используем рандомное число что бы указать индекс цвета из массива
    gamePattern.push(randomChosenColour); // добавляем рандомный цвет в пустой массив
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //прослушка на кнопку которая будет моргать.
    playSound(randomChosenColour);

}



function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) { //animation for pressed button
  $("#" + currentColour).addClass('pressed');
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

