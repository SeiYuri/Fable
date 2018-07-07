/* Timers */ 
    /* In game screen should be visible until the time limit is up */ 
    var numRounds = 3; // each user will get this many turns
    var activeRound = 1; // number of active round
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
        time--
        console.log(time);
        $("#time-left").text(time);

        if (time === 0 ){
            clearInterval(timer);
            moveToApproval();
            time = turnTimeLimit;
            
        };
    }

    function appendStory(divID){
        $("#" + divID).empty();
        for(k = 0 ; k < story.length ; k++){
            var newSentence = $("<span>").text(story[k].sentence);
            $(newSentence).addClass("player-" + this.playerID + "-sentences");
            $("#" + divID).append(newSentence);
        }
    }

    function moveToApproval (){
        approveSentence();
        pickNextPlayer();
    }

    function approveSentence() {
        var reviewDiv = $(".review-prev-sentence")
        var newSentenceDiv = $(".review-new-sentence")
        var newSentenceInput = $("#new-sentence-input").val().trim();
        console.log(newSentenceInput);
        if(story.length === 0){
            newSentenceDiv.html("<p>"+ newSentenceInput + "</p>");
        }
        else{
            reviewDiv.html("<p>" + story[story.length - 1] + "</p>")
            newSentenceDiv.html("<p>"+ newSentenceInput + "</p>");
        }
        for (var l = 0; l < players.length; l++){
            var buttonsDiv = $("<div id=player" + players[l].playerID + ">");
            var upVote = $("<button class='approvalBtn' data-vote='up' data-player=player" + players[l].playerID+ ">")
            var downVote = $("<button class='approvalBtn' data-vote='down' data-player=player" + players[l].playerID+ ">")
            buttonsDiv.append(upVote,downVote);
            $(".approval-btns").append(buttonsDiv);
            
        }
        votesLeft = players.length;
        $("#reviewModal").modal('show');
        
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

        console.log(votesLeft);

        if(votesLeft === 0){
            if(downVote < Math.floor(players.length * 0.75)){
            var newStory = {
                sentence: $("#new-sentence-input").val().trim(),
                playerID: players[players.indexOf(currentPlayer)].playerID
            };
            story.push(newStory);
            }
            $("#reviewModal").modal('hide');
            timer = setInterval(timerChange,1000);
        };

        $("#" + buttonDivLoc).remove();

        if (story.length > 0){
            appendStory("current-story");
        }
    });

    function findIndexOfCurrentPlayer(element) {
        return element.name == currentPlayer;
    };


    $(document).on("click", "#new-sentence-submit-button", function(){
        event.preventDefault();
        clearInterval(timer);
        moveToApproval();
    })


function pickNextPlayer() {
    console.log("Pick Next player is run")
    if (playersRemainingThisRound.length === 0) { // all players have gone this round
        // all players are eligible to be next
        playersRemainingThisRound = players;
        activeRound++;
    }

    if (activeRound > numRounds) {
        gameOver();
    }

    
    // determine next player, store in 'currentPlayer', and remove current player from eligible players in current round
    var nextPlayer = playersRemainingThisRound[Math.floor(Math.random()*playersRemainingThisRound.length)].name; //need to read .name property
    currentPlayer = nextPlayer;
    playersRemainingThisRound.splice(playersRemainingThisRound.findIndex(findIndexOfCurrentPlayer),1); // remove current player from remaining players array
}


function findIndexOfCurrentPlayer(element) {
    return element.name == currentPlayer;
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
