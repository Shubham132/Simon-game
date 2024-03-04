var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var gameOn = false;
var levelCounter = 0;
var levelInstanceCounter = 0;

$('.btn').click(function(){
    var button = $(this);
    var colour = button.attr('class').split(' ')[1];
    buttonPressAnimation(colour);
    if(gameOn){
        checkPattern(colour);
    }
})

function fail(){
    failAnimation();
    levelCounter = 0;
    levelInstanceCounter = 0;
    gameOn = false;
    gamePattern = [];
    $('h1').text("Game over! Press any key to restart");
}

$(document).on('keydown', function(){
    if(!gameOn){
        gameOn = true;
        nextLevel();
    }
})

function updateContent(){
    levelCounter++;
    $('h1').text("level "+levelCounter);
    var randomChosenColour = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColour);
    buttonPressAnimation(randomChosenColour);
}

function nextLevel(){
    userPattern = [];
    levelInstanceCounter = 0;
    setTimeout(updateContent, 1000);
    
}

function checkPattern(color){
    levelInstanceCounter++;
    userPattern.push(color);
    var status = firstNElementsAreEqual(gamePattern,userPattern,levelInstanceCounter);
    if(status){
        if(levelInstanceCounter == levelCounter){
            nextLevel();
        }
    } else {
        fail();
    }
}

function firstNElementsAreEqual(array1, array2, n) {
    if (array1.length < n || array2.length < n) {
        return false;
    }
    for (var i = 0; i < n; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

function buttonPressAnimation(colour){
    var audioFile ='sounds/'+ colour + '.mp3';
    var audio = new Audio(audioFile);
    audio.play();
    $("#"+colour).toggleClass("pressed");
    setTimeout(function() {
        $("#"+colour).toggleClass("pressed")
    }, 50);
}

function failAnimation(){
    $("body").toggleClass("game-over");
    setTimeout(function() {
        $("body").toggleClass("game-over")
    }, 50);
    var audioFile = 'sounds/wrong.mp3';
    var audio = new Audio(audioFile);
    audio.play();
}

function nextSequence() {
    return Math.floor(Math.random() * 4);
}