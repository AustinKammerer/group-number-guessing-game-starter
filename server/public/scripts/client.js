$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");
  // click handler for submit button
  $("#submitBtn").on("click", sendGuess);
}

// function to sent POST request with guesses
function sendGuess() {
  $.ajax({
    method: "POST",
    url: "/submission",
    data: {
      data: [
        {
          guess: $("#inputIsiah").val(),
        },
        {
          guess: $("#inputRonald").val(),
        },
        {
          guess: $("#inputAustin").val(),
        },
        {
          guess: $("#inputKatherine").val(),
        },
        {
          guess: $("#inputChaoching").val(),
        },
      ],
    },
  });
}
