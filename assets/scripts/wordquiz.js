// Initializing DOM Elements & variables
const startQuizEl = document.querySelector(".start");
const questionEl = document.getElementById("question-display");
const optionOneEl = document.getElementById("Button1");
const optionTwoEl = document.getElementById("Button2");
var timeValueEl = document.getElementById("timervalue");
var divEl = document.getElementById("result");
var h2El = document.querySelector(".show-result");
var clickedEl = document.getElementById("answer-display");
var scoreEl = document.getElementById("score");
var scoreValEl = document.getElementById("score-value");
var highscoreEl = document.getElementById("high-score");
var headerEl = document.getElementById("head");
var sectionEl = document.getElementById("start");
var paraEl = document.getElementById("highscores");
var displayEl = document.getElementById("form");
var myModal = document.getElementById("myModal");
var myModalTitle = document.querySelector(".modal-title");
var myModalBody = document.getElementById("modalbodyval");
var closeModalEl = document.querySelector(".btn-close");
myModal.classList.add("hide");
const myrapidki = "a9948976b7msh01160229121d1b6p1fd4d3jsnf2012c72efd4";
const myhost = "twinword-word-association-quiz.p.rapidapi.com";
var currentIndex = 0;
var score = 0;

// Start Quiz function
startQuizEl.addEventListener("click", function () {
  fetch("https://twinword-word-association-quiz.p.rapidapi.com/type1/?level=7&area=overall", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": myrapidki,
      "x-rapidapi-host": myhost
    }
  })

    // Fetching the sample file - works only with live server
    // fetch("./assets/scripts/response-twinwordquiz.json")
    .then((res) => {
      if (res.status != 200) {
        throw Error(res.status + " " + res.statusText);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      // call back function to display dictionary data
      setQuiz(data);
    })
    .catch((error) => {
      myModal.setAttribute("class", "active");
      myModalTitle.innerText = "Oops, Something went wrong. Try again";
      myModalBody.innerText = error;
      closeModalEl.addEventListener("click", () => {
        myModal.setAttribute("class", "hide");
      });
    });
  displayEl.classList.add("active");
  document.getElementById("start").classList.remove("active");
  startTimer();
});

// function to display timer
var timeLeft = 60;
var timer;
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      timeLeft = 0;
      clearInterval(timer);
    } else {
      timeLeft--;
      timeValueEl.textContent = timeLeft;
    }
  }, 1000);
}

// function to set quiz
function setQuiz(data) {
  myQuiz = data.quizlist;
  if (timeLeft > 0 && currentIndex < myQuiz.length) {
    displayQuiz(myQuiz[currentIndex]);
  } else {
    displayScore();
  }
}

// function to display questions
function displayQuiz(ques) {
  resetDiv();
  var myQues = ques.quiz.join(", ");
  questionEl.innerText = myQues;
  optionOneEl.textContent = ques.option[0];
  optionTwoEl.textContent = ques.option[1];
  correctAns = ques.correct;
}

// Event listner for clicking on the options
clickedEl.addEventListener("click", function (event) {
  if (event.target.classList == "btn choice ripple-surface") {
    var myAns = event.target.name;
    var userAns = parseInt(myAns);
    verifyAns(userAns);
    currentIndex++;
    if (timeLeft > 0 && currentIndex < myQuiz.length) {
      displayQuiz(myQuiz[currentIndex]);
    } else {
      displayEl.classList.remove("active");
      displayScore();
    }
  }
});

// Function to verify answer
function verifyAns(userAns) {
  // Verifying if user answer is equal to answer in the array with the index of current index
  if (userAns == correctAns) {
    divEl.classList.add("active");
    h2El.textContent = "Correct!";
    score = score + 10;
  } else {
    divEl.classList.add("active");
    h2El.textContent = "Wrong!";
    timeLeft = timeLeft - 10;
  }
}

// Function to reset the div element
function resetDiv() {
  document
    .getElementById("answer-display")
    .addEventListener("mouseleave", (event) => {
      if (event.target.classList != "choice") {
        divEl.classList.remove("active");
      }
    });
}

// function to display and store highscore
function displayScore() {
  clearInterval(timer);
  scoreEl.classList.add("active");
  scoreValEl.innerText = score;
  timeLeft = 0;
  timeValueEl.innerText = timeLeft;
}

// Function to store timeleft in local storage
function storeData() {
  // Get new data
  var newScore = score;
  var newInitial = document.querySelector('#initial').value;
  var newData = { score: newScore, initial: newInitial };

  if (localStorage.getItem("highScores") == null) {
    highScores = [];
  } else {
    highScores = JSON.parse(localStorage.getItem("highScores"));
  }

  // Add new data to the exisitng data
  highScores.push(newData);
  // To sort scores in descending order
  highScores.sort((a, b) => b.score - a.score);
  // To display top 5 scores only
  highScores = highScores.slice(0, 5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayHighScore();
}

// Function to display High score
function displayHighScore() {
  scoreEl.classList.remove("active");
  highscoreEl.classList.add("active");
  headerEl.classList.add("hide");
  sectionEl.classList.add("hide");
  if (localStorage.getItem("highScores") == null) {
    paraEl.innerText = "Nothing to display at the moment.";
  } else {
    var data = JSON.parse(localStorage.getItem("highScores"));
    var highScoreData = "";
    for (let count = 0; count < data.length; count++) {
      slNo = count + 1;
      highScoreData =
        highScoreData +
        "<br>" +
        slNo +
        ". " +
        data[count].initial +
        " : " +
        data[count].score;
    }
    paraEl.innerHTML = highScoreData;
  }
}

// Function to clear storage
function clearData() {
  localStorage.removeItem("highScores");
  paraEl.innerText = "Storage Cleared. Nothing to display at the moment.";
}
