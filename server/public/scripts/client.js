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
          name: `Isiah`,
          guess: $("#inputIsiah").val(),
        },
        {
          name: `Ronald`,
          guess: $("#inputRonald").val(),
        },
        {
          name: `Austin`,
          guess: $("#inputAustin").val(),
        },
        {
          name: `Katherine`,
          guess: $("#inputKatherine").val(),
        },
        {
          name: `Chaoching`,
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
    $("#resetBtnContainer").empty();
    $("#winnerContainer").empty();
    for (let i = 0; i < response.length; i++) {
      let row = $(`<tr><td>${i + 1}</td></tr>`);
      for (let guess of response[i]) {
        row.append(`
          <td${guess.result === "Correct" ? ' class="winner"' : ""}>${
          guess.guess
        }: ${guess.result}</td$>
        `);
        if (guess.result === "Correct") {
          makeResetBtn();

          $("#winnerContainer")
            .append(
              `<h2>The Winner Is: <span class="winPerson">${guess.name}</span></h2>`
            )
            .addClass("attention");
        }
      }
      $("#tableOnDOM").append(row);
    }
  });
}

function makeResetBtn() {
  $("#resetBtnContainer").empty();
  $("#resetBtnContainer").append(
    `<button id="resetBtn" class="btn btn-danger">RESET</button>`
  );
}
// come back to this
function resetGame() {
  $.ajax({
    method: "POST",
    url: "/reset",
    data: {},
  }).then(function () {
    $("#winnerContainer").empty();
    renderTable();
    $("#winnerContainer").removeClass("attention");
  });
}
