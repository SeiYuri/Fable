updateRandomContent(); // this should go where 
function updateRandomContent() {
    
    var randomBoolean = Math.floor(Math.random()*2);
    if (randomBoolean === 0) { /* update & display random image */
        var randomImgQueryURL = "https://api.unsplash.com/photos/random?client_id=de1f3cde2de36e59880cc078d226a340adb625b535b3b059f97555a8e18fd26f";
        var randomImgUrl = "";
        $.ajax({
            url: randomImgQueryURL,
            method: "GET"
        }).then(function(response) {
            randomImgUrl = response.urls.regular;
            var randomImg = $("<img>").attr({
                "src": randomImgUrl,
                "class": "random-img",
                "alt": "random image",
                "width": "300px"
            });
            $("#random-content").html(randomImg);
        });
    } else if (randomBoolean === 1) { /* update & display random word */
        var randomWordQueryURL = "https://random-word-api.herokuapp.com/word?key=JHYBH4V4&number=1";
        var randomWord = "";
        $.ajax({
            url: randomWordQueryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            randomWord = response;
            $("#random-content").html(randomWord);
        });
    }
}