
$(document).ready(function() {
  console.log('game.js loaded');

    // This variable will be pre-programmed with our authentication key
    var authKey = "dc6zaTOxFJmzC";

    // Initial array of categories
    var categories = ["dog", "cat", "rabbit", "hamster"];

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

              // Add multiple attributes that can be used to animate the gifs when clicked
              categoryImage.attr({src:results[i].images.fixed_height_still.url, 
                dataStill:results[i].images.fixed_height_still.url, 
                dataAnimate:results[i].images.fixed_height.url, dataState: "still", class:"gif"});

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

        // The category from the textbox is then added to our array
        categories.push(category);

        $("#category-input").val("");

        // Calling renderButtons which handles the processing of our category array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "category"
      $(document).on("click", ".category", displayCategoryInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(".gif").on("click", function() {
      // STEP ONE: study the html above.
      // Look at all the data attributes.
      // Run the file in the browser. Look at the images.

      // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

      // STEP TWO: make a variable named state and then store the image's data-state into it.
      // Use the .attr() method for this.

      // ============== FILL IN CODE HERE FOR STEP TWO =========================
      var state = $(this).attr("data-state");
      console.log(state);

      // CODE GOES HERE

      // =============================================

      // STEP THREE: Check if the variable state is equal to 'still',
      // then update the src attribute of this image to it's data-animate value,
      // and update the data-state attribute to 'animate'.

      // If state does not equal 'still', then update the src attribute of this
      // image to it's data-animate value and update the data-state attribute to 'still'
      // ============== FILL IN CODE HERE FOR STEP THREE =========================

      if (state === "still") {
        $(this).attr("src", $(this).attr("dataanimate"));
        // var newState = $(this).attr("data-state", "animate");
        // console.log(newState);
      } else {
        $(this).attr("src", $(this).attr("datastill"));
        // var newState = $(this).attr("data-state", "still"); 
        // console.log(newState);       
      }

      // CODE GOES HERE

      // ==============================================

      // STEP FOUR: open the file in the browser and click on the images.
      // Then click again to pause.
    });  

});