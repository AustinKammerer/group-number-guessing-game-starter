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
      }
      $("#tableOnDOM").append(row);
    }
  });
}
