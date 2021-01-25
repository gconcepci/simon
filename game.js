//Initializing Game Variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameOn = false;
var level = 0;

//Functions

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

function playSound(name) {
    var buttonAudio = new Audio(`sounds/${name}.mp3`);
    buttonAudio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        } 
    } else {
        
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameOn = false;
}


//Game Logic
$(document).click(function(){ //Page waiting for a key press
    if (!gameOn) { //gameOn by default is false, so if a key is pressed and gameon is false...
        nextSequence(); // Next sequence plays
        $("#level-title").text("Level " + level);
        gameOn = true; //And gameOn is true, keypresses no longer do anything.
      
    }
    
});

//Stores user clicked button presses.
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
    

});

