// <!-- Instructions button: ID #instructions-button -->
// <!-- Start button: ID #start-button -->
// <!-- Player name text boxes: CLASS .player-name-input -->

var players = [];
var playersIn = 0;


    $(".player-list").append("<h6> Players: " + playersIn + " / 4</h6>"); // TO-DO: since this is just an initialization it should be moved to the html

    $("#start-button").on("click", function(){
        if(playersIn === 4){ // If all players are in
            $(".title-screen").css("display", "none"); // hide the title screen and show the main gameplay div
            $(".game-screen").css("display", "block"); // show gameplay screen
            // TO-DO: add function call to start game (timers, etc)
            pickNextPlayer();
            timer = setInterval(timerChange,1000);
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
                    playerID: 0,
                    name: nameInput,
                    points : 0
                };
                players.push(player1);
                playersIn++;
            }
            else if (playersIn === 1){
                var player2 = {
                    playerID: 1,
                    name: nameInput,
                    points : 0
                };
                players.push(player2);
                playersIn++;
            }
            else if (playersIn === 2){
                var player3 = {
                    playerID: 2,
                    name: nameInput,
                    points : 0
                };
                players.push(player3);
                playersIn++;
            }
            else if (playersIn === 3){
                var player4 = {
                    playerID: 3,
                    name: nameInput,
                    points : 0
                };
                players.push(player4);
                playersIn++;
                $("#nameAlert").text("Everybody's in! Press “Start” to play!");
            }
            else {
                $("#nameAlert").text("Game is full!");
            }
        }

        $(".player-list").append("<h6> Players: " + playersIn + "/ 4</h6>")
            // it seems the h6 is overriding the bullet point, but i think it would be better practice to put this outside the list -Mark
        for(var i= 0; i < players.length; i++) {
            $(".player-list").append("<li><i class='fas fa-user'></i>   " + players[i].name + "</li>");
        }
        
    });

