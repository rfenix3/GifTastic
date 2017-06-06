$(document).ready(function() {
  console.log('game.js loaded');

    // This variable will be pre-programmed with our authentication key
    var authKey = "dc6zaTOxFJmzC";

    // Initial array of categories
    var categories = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle"];

    // displayCateoryInfo function re-renders the HTML to display the appropriate content
    function displayCategoryInfo() {

        var category = $(this).attr("data-name");

        var queryURLBase = "https://api.giphy.com/v1/gifs/search?api_key=" + 
authKey + "&q=" + category + "&limit=" + "10";

        console.log(category);
        console.log(queryURLBase);

        // Creates AJAX call for the specific category button being clicked
        $.ajax({
          url: queryURLBase,
          method: "GET"
        }).done(function(response) {

          var results = response.data;

            $(".item").empty();

          for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r") {

              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");
              // gifDiv.addClass("item");
              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var categoryImage = $("<img>");

              // Giving the image tag an src attribute of a property
              //categoryImage.attr("src", results[i].images.fixed_height_still.url);

              // Add class
              categoryImage.addClass("gif");

              // Add multiple attributes that can be used to animate the gifs when clicked
              categoryImage.attr("src", results[i].images.fixed_height_still.url);
              categoryImage.attr("data-still", results[i].images.fixed_height_still.url);
              categoryImage.attr("data-animate", results[i].images.fixed_height.url);
              categoryImage.attr("data-state", "still");

              var state = $(categoryImage).attr("data-state");

              // Appending the paragraph and categoryImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(categoryImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#categories-view").prepend(gifDiv);
            }
          }

        });
    }

      // Function for displaying category data
      function renderButtons() {

        // Deletes the categories prior to adding new categories
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Loops through the array of categories
        for (var i = 0; i < categories.length; i++) {

          // Then dynamicaly generates buttons for each category in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of category to our button
          a.addClass("category");
          // Added a data-attribute
          a.attr("data-name", categories[i]);
          // Provided the initial button text
          a.text(categories[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add category button is clicked
      $("#add-category").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox

        var category = $("#category-input").val().trim();

        // still working on validating if user did not enter any text
        //if (category ==="" || IsNull(category)) {
        //  alert("Please enter text");
        //} else {

        // The category from the textbox is then added to our array
        categories.push(category);

        $("#category-input").val("");

        console.log(categories);

        // Calling renderButtons which handles the processing of our category array
        renderButtons();
      //}
      });

      function animatePause() {
        
        var state = $(this).attr("data-state");
        var animatedSrc = $(this).attr("data-animate");
        var stillSrc = $(this).attr("data-still");

        console.log("Hello World!");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
      
        if (state === "still") {
          $(this).attr("src", animatedSrc);
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", stillSrc);
          $(this).attr("data-state", "still");
        }

      };

      // Adding click event listeners to all elements with a class of "category" (the buttons) 
      // and "gif" (the images) so they can recognize click event.  Then call the following functions
      // when they get clicked
      $(document).on("click", ".category", displayCategoryInfo);
      $(document).on("click", ".gif", animatePause);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

});