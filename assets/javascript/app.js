// when a button is clicked, GIF API is pulled and populates HTML div (10 images)
// If the same button is clicked the GIF will pause, and when clicked again it will start.
// A prebuilt array is created with animals already populated 
// When an animal is entered into the search bar the submit button will add that item to the existing array
$(document).ready(function(){

var animalList = ["dog", "cat", "bird", "skunk", "rat", "chinchilla"];
	$(document).on("click", ".gif", changeState);

function displayGif() {

	var animal = $(this).attr("data-name");
	var limit = 10;
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";
	
	// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";
	
	
	$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			
			console.log(response);

			for (var j = 0; j < animalList.length; j++) {
					
				var gifSection = $("<div>");
				gifSection.addClass();

				var img = $("<img>");
				img.attr("src", response.data[j].images.downsized.url);
				img.attr("data-still", response.data[j].images.downsized_still.url);
				img.attr("data-animate", response.data[j].images.downsized.url);
				img.attr("data-state", "still");
				img.attr("class", "gif");
				gifSection.append(img);

				var rating = response.data[j].rating;
				var displayRating = $("<h3>").text("Rating: " + rating);
				gifSection.append(displayRating);

				$("#animals").prepend(gifSection);


			}
		})
}

// Function to display the animal data
function createButtons() {
	
$("#animalButtons").empty();
	for (var i = 0; i < animalList.length; i++) {
		var newButton = $("<button>")
		newButton.addClass("newAnimal");
		newButton.attr("data-name", animalList[i]);
		newButton.text(animalList[i]);

		$("#animalButtons").append(newButton);

	 }
}
	
	$("#addAnimal").on("click", function(){
		var animal = $("#animal-input").val().trim();
		console.log(animal);
		animalList.push(animal);

		createButtons();

		return false;
	})

function changeState() {
	var state = $(this).attr("data-state");
	var animate = $(this).attr("data-animate");
	var still = $(this).attr("data-still");

	if(state == "still") {
		$(this).attr("src", animate);
		$(this).attr("data-state", "animate");
	} else if(state == "animate") {
		$(this).attr("src", still);
		$(this).attr("data-state", "still");
	}
}

$(document).on("click", ".newAnimal", displayGif);
createButtons();

});