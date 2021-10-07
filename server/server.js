const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static("server/public"));

// GET & POST Routes go here

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

function randNum(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

let guessResults = [];

let winningNum = randNum(1, 25);
console.log(winningNum);

app.post("/submission", (req, res) => {
  console.log(req.body);
  checkGuesses(req.body);
  res.sendStatus(201);
});

function checkGuesses(request) {
  let data = request.data;
  for (let i = 0; i < data.length; i++) {
    if (Number(data[i].guess) === winningNum) {
      data[i].result = "Correct";
    } else if (Number(data[i].guess) < winningNum) {
      data[i].result = "Too Low";
    } else if (Number(data[i].guess) > winningNum) {
      data[i].result = "Too High";
    }
  }
  guessResults.push(data);
  console.log(guessResults);
}
