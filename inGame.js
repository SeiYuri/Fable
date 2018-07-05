/* Timers */ 
    /* In game screen should be visible until the time limit is up */ 
    var gameTimeLimit = 180; // seconds
    var turnTimeLimit = 30; // seconds
    var voteTimeLimit = 10; // seconds
    var currentPlayer = "";

$(document).ready(function() {

    /* Turn logic: Picks a player at random, but ensures that no player is "ahead" of any other player by more than 1 turn */ 
    var playersRemainingThisRound = [ // hard coding this just for testing purposes. in production this should be initialized to 'players' array.
        {
            name: "player1"
        },
        {
            name: "player2"
        },
        {
            name: "player3"
        },
        {
            name: "player4"
        }
    ]; 

    $(document).on("click", "#new-sentence-submit-button", function() { // also execute this block if player runs out of time
        
        approveSentence();
        pickNextPlayer();

    })

});

function approveSentence() {
    var newSentenceInput = $("#new-sentence-input").val().trim();
    // approvers are all players except for the current player
    var approvers = players.splice(players.findIndex(findIndexOfCurrentPlayer),1)
    approvers.forEach(function(element) {
        
    });
}

function pickNextPlayer() {
    if (playersRemainingThisRound.length === 0) { // all players have gone this round
        // all players are eligible to be next
        playersRemainingThisRound = players;
    }
    
    // determine next player, store in 'currentPlayer', and remove current player from eligible players in current round
    var nextPlayer = playersRemainingThisRound[Math.floor(Math.random()*playersRemainingThisRound.length)].name; //need to read .name property
    currentPlayer = nextPlayer;
    playersRemainingThisRound.splice(playersRemainingThisRound.findIndex(findIndexOfCurrentPlayer),1); // remove current player from remaining players array
}

function findIndexOfCurrentPlayer(element) {
    return element.name == currentPlayer;
}