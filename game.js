var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    // var colorSoundsSystem = new Audio("./sounds/" + randomChosenColor + ".mp3");
    // colorSoundsSystem.play();
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
    console.log("system chose " + randomChosenColor);
}

$(".btn").click(function(event) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // var colorSoundsUser = new Audio("./sounds/" + userChosenColor + ".mp3");
    // colorSoundsUser.play();
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log("user chose " + userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {
    var colorSounds = new Audio("./sounds/" + name + ".mp3");
    colorSounds.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keydown(function() {
    if(!started) {
        // $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    });

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        // Correct so far
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 500);
        } 

    } else {
            console.log("Failure");
            var wrongSound = new Audio("./sounds/wrong.mp3");
            wrongSound.play();
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 1200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
