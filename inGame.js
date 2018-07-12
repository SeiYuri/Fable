/* Timers */ 

    /* In game screen should be visible until the time limit is up */ 
    var numRounds = 1; // each user will get this many turns
    var activeRound = 0; // number of active round
    var turnTimeLimit = 30; // seconds
    var voteTimeLimit = 10; // seconds
    var currentPlayer = "";
    var time = 30;
    var playersRemainingThisRound = [];
    // holds all story sentences

    var story = []; //attributes are playerID and sentence

    // vars to hold timers and timeouts
    var timer;
    var timeout;

    // var to hold votes
    var votesLeft = 0;
    var upVote = 0;
    var downVote = 0;

function timerChange(){
    if (activeRound > numRounds){
        clearInterval(timer)
    }

    $("#time-left").text(time);
    time--
    
    if (time === 0){
            clearInterval(timer);
            moveToApproval();
            time = turnTimeLimit;
            
        };
        
    }

function moveToApproval (){
    approveSentence();
    
}

    function appendStory(divID){
        $("#" + divID).empty();
        for(k = 0 ; k < story.length ; k++){
            var newSentence = $("<span>").text(" " + story[k].sentence);
            if (story[k].startParagraph){
                $("#" + divID).append("<br><br>");
            }
            $(newSentence).addClass("player-" + story[k].playerID + "-sentences");
            $("#" + divID).append(newSentence);
        }
    }


    function approveSentence() {
        var newSentenceDiv = $(".review-new-sentence")
        var newSentenceInput = $("#new-sentence-input").val().trim();

        if (newSentenceInput.length === 0) {
            pickNextPlayer();
            timer = setInterval(timerChange,1000);
        }

        else{
            newSentenceDiv.html("<p>"+ newSentenceInput + "</p>");
            $(".player-on-review").text(players[currentPlayer].name);

            for (var l = 0; l < players.length; l++){
                var buttonsDiv = $("<div id=player" + players[l].playerID + ">").html("<h6>" + players[l].name + "</h6>");
                var upVote = $("<button class='approvalBtn' data-vote='up' data-player=player" + players[l].playerID+ "><i class='fas fa-thumbs-up'></i></button>")
                var downVote = $("<button class='approvalBtn' data-vote='down' data-player=player" + players[l].playerID+ "><i class='fas fa-thumbs-down'></button>")
                buttonsDiv.append(upVote,downVote);
                $(".approval-btns").append(buttonsDiv);
                
            }
            
            votesLeft = players.length;
            $("#reviewModal").modal();
        }
    };


    $(document).on("click", ".approvalBtn", function(){
        var vote = $(this).attr("data-vote");

        var buttonDivLoc = $(this).attr("data-player");

        if (vote === "up"){
            upVote++;
        }
        else {
            downVote++;
        }

        votesLeft--;

        if(votesLeft === 0){
            if(downVote < Math.floor(players.length * 0.75)){
                if ($("#new-paragraph-check").is(':checked')){
                    var newParagraph = true
                }
                else {
                    var newParagraph = false
                }
                var newStory = {
                    sentence: $("#new-sentence-input").val().trim(),
                    playerID: players[currentPlayer].playerID,
                    startParagraph: newParagraph
                };
                story.push(newStory);
            }

            $("#reviewModal").modal('hide');
            timer = setInterval(timerChange,1000);

            pickNextPlayer();
            $("#new-sentence-input").val("");
            downVote = 0;
        };

        $("#" + buttonDivLoc).remove();

        if (story.length > 0){
            appendStory("current-story");
        }
        
    });



    $(document).on("click", "#new-sentence-submit-button", function(){
        event.preventDefault();
        clearInterval(timer);
        time = turnTimeLimit;
        moveToApproval();
    })


/* Turn logic: Picks a player at random, but ensures that no player is "ahead" of any other player by more than 1 turn */ 
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
    $(".current-player-turn").text(players[currentPlayer].name);
    playersRemainingThisRound.splice(playersRemainingThisRound.findIndex(findIndexOfCurrentPlayer),1); // remove current player from remaining players array
    console.log(players[parseInt(currentPlayer)].name);
    updateRandomContent();
}

function findIndexOfCurrentPlayer(element) {
    return element.playerID == currentPlayer;

}

function gameOver() {
    $(".game-screen").css("display", "none");
    $(".results-screen").css("display", "block");
    // TO-DO: do we need to cancel any timers here?

    // Populate story div
    appendStory("full-story-display");


}

$(document).on("click", "#play-again-btn", function(){
    event.preventDefault();
    $(".results-screen").css("display", "none");
    playersIn = 0;
    players = [];
    story = [];
    activeRound = 0;
    currentPlayer = "";
    time = 30;
    playersRemainingThisRound = [];
    votesLeft = 0;
    upVote = 0;
    downVote = 0;
    usedNames = [];
    $(".player-name-input").val("");
    $("#nameAlert").text("");
    $(".player-list").html("");
    $(".num-players-in").html("Players : <span class='player-number'>0</span> / 4")
    $(".title-screen").css("display", "block");
    $("#current-story").html("");
    $("#full-story-display").html("");
    $(".approval-btns").html("");
});