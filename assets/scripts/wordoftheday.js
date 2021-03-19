//Initialising DOM elements and variables
var wordOfTheDayEl = document.getElementById("word-of-the-day"); 
var pronunciationEl = document.getElementById("pronunciation");
var definitionEl = document.getElementById("definition");
var myKi = "a9948976b7msh01160229121d1b6p1fd4d3jsnf2012c72efd4";
var randomWordSaved = localStorage.getItem("rdmWord");

// // Checking for saved word in local storage, if its not available then fetching for one.
// if (!randomWordSaved) {
getRandomWord();


// function to get random word

function getRandomWord() {
//   fetch("https://random-words-with-pronunciation.p.rapidapi.com/word", {
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-key": myKi,
//       "x-rapidapi-host": "random-words-with-pronunciation.p.rapidapi.com"
//     }
//   })

  fetch("./assets/scripts/response-wordsapi-randomWord.json")
    .then(response => {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data);
            displayWord(data);
        });
      } else {
        definitionEl.innerText = error;
      }
    })
    .catch(err => {
      console.error(err);
    });
}

(function () {
  setInterval(function () {
    getRandomWord();
  }, 1000 * 60 * 60 * 24);
}) ();

// function to display word of the day
function displayWord(data) {
    console.log(data); 
    wordOfTheDayEl.innerText = data[0].word;
    pronunciationEl.innerText = data[0].pronunciation;
    definitionEl.innerText = data[0].definition;
    localStorage.setItem("rdmWord", wordOfTheDayEl.innerText);
}




