// <!-- Instructions button: ID #instructions-button -->
// <!-- Start button: ID #start-button -->
// <!-- Player name text boxes: CLASS .player-name-input -->

$(document).ready(function(){
//Player Objects
var playersIn = 0
$(".player-list").append("<h6> Players: " + playersIn + " / 4</h6>")

var players = [];

var turn = 0;

$("#instructions-button").on("click", function(){
    //Display a div with the instructions on it
    var modalContainer = $("<div>").addClass("modal");
    var modal = $("<div>").addClass("modal-content");
    var modalHead = $("<h1>").text("Instructions");
    //remove the div after ? seconds.

});

$("#start-button").on("click", function(){
    // If all players are in then start the game.
    if(playersIn === 4){
        $(".title-screen").css("display", "none");
        //hide the title screen and show the main gameplay div
    }
});

$("#player-name-button").on("click", function(event){
    event.preventDefault();

    //add the player name to the corresponding player object
    var nameInput = $(".player-name-input").val().trim();

    $(".player-list").empty();

    if(nameInput){
        if (playersIn === 0){
            var player1 = {
                name: nameInput,
                points : 0
            };
            players.push(player1);
            playersIn++;

            //append player name to the users list
        }


        else if (playersIn === 1){
            var player2 = {
                name: nameInput,
                points : 0
            };
            players.push(player2);
            playersIn++;
            //append player name to the users list
        }


        else if (playersIn === 2){
            var player3 = {
                name: nameInput,
                points : 0
            };
            players.push(player3);
            playersIn++;
            //append player name to the users list
        }


        else if (playersIn === 3){
            var player4 = {
                name: nameInput,
                points : 0
            };
            players.push(player4);
            playersIn++;
            //append player name to the users list
            //append message stating that the room is full
            console.log("Everybody is In! Start the Game");
        }


        else {
            //append message stating that the room is full
            console.log("Game is full!");
        }
    }
    $(".player-list").append("<h6> Players: " + playersIn + "/ 4</h6>")
    for(var i= 0 ; i < players.length; i++) {
        $(".player-list").append("<li><i class='fas fa-user'></i>   " + players[i].name + "</li>");
    }
    
});

});