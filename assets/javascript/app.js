// when a button is clicked, GIF API is pulled and populates HTML div (10 images)
// If the same button is clicked the GIF will pause, and when clicked again it will start.
// A prebuilt array is created with animals already populated 
// When an animal is entered into the search bar the submit button will add that item to the existing array

var animalList = ["dog", "cat", "bird", "skunk", "rat", "chinchilla"];

function displayGif() {
// $("button").on("click", function() {
	var animal = $(this).attr("data-url");

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";
	
	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response){
			console.log(response);
			console.log(queryURL);
			
			
		})
// });
}

// Function to display the movie data
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

// function showAnimals() {
	$("#addAnimal").on("click", function(){
		var animal = $("#animal-input").val().trim();
		console.log(animal);
		animalList.push(animal);

		createButtons();

		return false;
	})
// }

$(document).on("click", "newAnimal", displayGif);
createButtons();