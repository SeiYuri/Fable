// <!-- Instructions button: ID #instructions-button -->
// <!-- Start button: ID #start-button -->
// <!-- Player name text boxes: CLASS .player-name-input -->


//Player Objects
var playersIn = 0

var player1 = {
    name: "",
    points : 0
};

var player2 = {
    name: "",
    points : 0
};

var player3 = {
    name: "",
    points : 0
};

var player4 = {
    name: "",
    points : 0
};

var players = [player1, player2, player3, player4];

var turn = 0

$("#instructions-button").on("click", function(){
    //Display a div with the instructions on it
    var modalContainer = $("<div>").addClass("modal");
    var modal = $("<div>").addClass("modal-content");
    var modalHead = $("<h1>").text("Instructions")
    var 
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
    
    //remove the div after ? seconds.

});

$("#start-button").on("click", function(){
    // If all players are in then start the game.
    if(playersIn = players.length){
        //hide the title screen and show the main gameplay div
    }
});

$("#player-name-button").on("click", function(){
    //add the player name to the corresponding player object
    var nameInput = $(".player-name-input").val().trim();
    if(nameInput){
        if (playersIn === 0){
            players[playersIn].name = nameInput;
            playersIn++;
            //append player name to the users list
        }
        else if (playersIn === 1){
            players[playersIn].name = nameInput
            playersIn++;
            //append player name to the users list
        }
        else if (playersIn === 2){
            players[playersIn].name = nameInput
            playersIn++;
            //append player name to the users list
        }
        else if (playersIn === 3){
            players[playersIn].name = nameInput
            playersIn++;
            //append player name to the users list
            //append message stating that the room is full
            console.log("Everybody is In! Start the Game")
        }
        else {
            //append message stating that the room is full
            console.log("Game is full!")

        }
    }
    
})