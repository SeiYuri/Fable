$(document).ready(function() {

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
            /* this is temporary until we have Words API working */
                var randomWords = ["apple", "banana", "clementine", "dragonfruit"];
                var randomArrayElement = Math.floor(Math.random()*4);
                var randomWord = randomWords[randomArrayElement];
            
            $("#random-content").html(randomWord);
        }
        
    }
    

});
