//Initialising DOM elements and variables
var wordOfTheDayEl = document.getElementById("word-of-the-day");
var pronunciationEl = document.getElementById("pronunciation");
var definitionEl = document.getElementById("definition");
var myKi = "a9948976b7msh01160229121d1b6p1fd4d3jsnf2012c72efd4";
var storedData = JSON.parse(localStorage.getItem('data'));
var randomWordSaved = localStorage.getItem("rdmWord");
var savedDate = localStorage.getItem("date");
var todaydate = new Date();
var mydate = todaydate.getFullYear() + '-' + (todaydate.getMonth() + 1) + '-' + todaydate.getDate();

if (!randomWordSaved || savedDate != mydate) {
  getRandomWord();
} else {
  displayWord(storedData);
}

// function to get random word

function getRandomWord() {
  fetch("https://random-words-with-pronunciation.p.rapidapi.com/word", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": myKi,
      "x-rapidapi-host": "random-words-with-pronunciation.p.rapidapi.com"
    }
  })

    // fetch("./assets/scripts/response-wordsapi-randomWord.json")
    .then(response => {
      if (response.ok) {
        response.json().then(function (data) {
          // console.log(data);
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

// (function () {
//   setInterval(function () {
//     getRandomWord();
//   }, 1000 * 60 * 60 * 24);
// }) ();

// function to display word of the day
function displayWord(data) {
  // console.log(data); 
  wordOfTheDayEl.innerText = `Word: ${data[0].word}`;
  pronunciationEl.innerText = `Pronunciation: ${data[0].pronunciation}`;
  definitionEl.innerText = `Definition: ${data[0].definition}`;
  localStorage.setItem('data', JSON.stringify(data));
  localStorage.setItem("rdmWord", wordOfTheDayEl.innerText);
  localStorage.setItem('date', mydate);
}




