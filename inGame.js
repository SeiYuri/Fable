/* Timers */ 
/* In game screen should be visible until the time limit is up */ 
var numRounds = 3; // each user will get this many turns
var activeRound = 1; // number of active round
var turnTimeLimit = 30; // seconds
var voteTimeLimit = 10; // seconds
var currentPlayer = "";
var time = 30;
// holds all story sentences

var story = []; //attributes are playerID and sentence

// vars to hold timers and timeouts
var timer;
var timeout;

function timerChange(){
    time--
    console.log(time);
    $("#time-left").text(time);

    if (time === 0 ){
        clearInterval(timer);
        moveToApproval();
        time = turnTimeLimit;
        
    };
}

function appendStory(){
    $("#current-story").empty();
    for(k = 0 ; k < story.length ; k++){
        $("#current-story").append("<p>" + story[k] + "</p>")
    }
}

function moveToApproval (){
    approveSentence();
    pickNextPlayer();
}

function approveSentence() {
    var reviewDiv = $("#review-prev-sentence")
    var newSentenceDiv = $("#review-new-sentence")
    var newSentenceInput = $("#new-sentence-input").val().trim();
    console.log(newSentenceInput);
    if(story.length === 0){
        newSentenceDiv.html("<p>"+ newSentenceInput + "</p>");
    }
    else{
        reviewDiv.html("<p>" + story[story.length - 1] + "</p>")
        newSentenceDiv.html("<p>"+ newSentenceInput + "</p>");
    }
    $("#exampleModal").modal('show');
}

$(document).on("click", "#new-sentence-submit-button", function(){
    event.preventDefault();
    clearInterval(timer);
    moveToApproval();
});

/* Turn logic: Picks a player at random, but ensures that no player is "ahead" of any other player by more than 1 turn */ 
var playersRemainingThisRound = players.concat(); // creates a copy of players array
console.log(playersRemainingThisRound);

function pickNextPlayer() {
    if (playersRemainingThisRound.length === 0) { // all players have gone this round
        // all players are eligible to be next
        playersRemainingThisRound = players.concat(); // reset array back to all players
        activeRound++;
    }

    if (activeRound > numRounds) {
        gameOver();
    }
    
    // determine next player, store in 'currentPlayer', and remove current player from eligible players in current round
    var nextPlayer = playersRemainingThisRound[Math.floor(Math.random()*playersRemainingThisRound.length)].playerID; //need to read .name property
    currentPlayer = nextPlayer;
    playersRemainingThisRound.splice(playersRemainingThisRound.findIndex(findIndexOfCurrentPlayer),1); // remove current player from remaining players array
}

function findIndexOfCurrentPlayer(element) {
    return element.playerID == currentPlayer;
}

function gameOver() {
    $(".game-screen").css("display", "none");
    $(".results-screen").css("display", "block");
    // TO-DO: do we need to cancel any timers here?
    
    // Populate story div
    story.forEach(function(element) {
        var newSentence = $("<span>").text(element.sentence);
        $(newSentence).addClass(function() {
            var className = "player-" + this.playerID + "-sentences";
            return className;
        });
        $("#full-story-display").append(newSentence);
    });

}