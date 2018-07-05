var queryURL = "https://api.unsplash.com/photos/random?client_id=de1f3cde2de36e59880cc078d226a340adb625b535b3b059f97555a8e18fd26f";
var randomImg = "";
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  randomImg = response.urls.regular;
});