// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // Listener for click events on the save buttons
  $(".container-fluid").on("click", ".saveBtn", function () {
    // Get the id of the parent time-block
    const timeBlockId = $(this).closest(".time-block").attr("id");

    // Get the user input (e.g., from a textarea within the time-block)
    const userInput = $(this).siblings(".description").val();

    // Save the user input in local storage using the time-block id as a key
    localStorage.setItem(timeBlockId, userInput);
  });

  $(function () {
    // Get the current hour using Day.js in 24-hour format
    const currentHour = dayjs().format("H");
  
    // Loop through each time block
    $(".time-block").each(function () {
      // Extract the hour from the time block's id
      const timeBlockId = $(this).attr("id");
      const timeBlockHour = parseInt(timeBlockId.split("-")[1]);
  
      // Compare the time block hour with the current hour
      if (timeBlockHour < currentHour) {
        // Time block is in the past
        $(this).removeClass("present future").addClass("past");
      } else if (timeBlockHour == currentHour) {
        // Time block is in the present
        $(this).removeClass("past future").addClass("present");
      } else {
        // Time block is in the future
        $(this).removeClass("past present").addClass("future");
      }
    });

    $(function () {
            // Loop through each time block
      $(".time-block").each(function () {
        // Get the id of the time block
        const timeBlockId = $(this).attr("id");
    
        // Create a unique key for localStorage
        const localStorageKey = "userInput-" + timeBlockId;
    
        // Retrieve the saved user input from localStorage
        const savedUserInput = localStorage.getItem(localStorageKey);
    
        // Check if there's saved user input
        if (savedUserInput !== null) {
          // Set the value of the textarea to the saved user input
          $(this).find(".description").val(savedUserInput);
        }

        $(this).find(".description").on("input", function () {
          const userInput = $(this).val();
          localStorage.setItem(localStorageKey, userInput);
        });
      });


      //for the timer and date in the header
      $(function () {
        function updateDateTime() {
        const currentDate = new Date();
      
        const formattedDate = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          
        }) + ' ' + currentDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit", });
      
        // Insert the formatted date into the HTML element with the id "currentDay"
        $("#currentDay").text(formattedDate); 
        }

        updateDateTime()

        setInterval(updateDateTime, 1000);
      
        
      });
      
      
    });
    
  
  });
  

  
});


