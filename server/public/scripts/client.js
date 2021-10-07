$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");
  resetGame();
  // click handler for submit button
  $("#submitBtn").on("click", sendGuess);
  // click listener for reset button
  $("#resetBtnContainer").on("click", "#resetBtn", resetGame);
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
  }).then(function (response) {
    renderTable();
    $("#inputIsiah").val(``);
    $("#inputRonald").val(``);
    $("#inputAustin").val(``);
    $("#inputKatherine").val(``);
    $("#inputChaoching").val(``);
  });
}

// function to GET processes guesses and add them to the DOM
function renderTable() {
  $.ajax({
    method: "GET",
    url: "/submission",
  }).then(function (response) {
    console.log(response);
    $("#tableOnDOM").empty();
    for (let i = 0; i < response.length; i++) {
      let row = $(`<tr><td>${i + 1}</td></tr>`);
      for (let guess of response[i]) {
        row.append(`
          <td>${guess.guess}: ${guess.result}</td>
        `);
        if (guess.result === "Correct") {
          makeResetBtn();
          $("#winnerContainer").empty();
          $("#winnerContainer").append(`<h2></h2>`);
        }
      }
      $("#tableOnDOM").append(row);
    }
  });
}

function makeResetBtn() {
  $("#resetBtnContainer").empty();
  $("#resetBtnContainer").append(`<button id="resetBtn">RESET</button>`);
}
// come back to this
function resetGame() {
  $.ajax({
    method: "POST",
    url: "/reset",
    data: {},
  }).then(renderTable());
}
