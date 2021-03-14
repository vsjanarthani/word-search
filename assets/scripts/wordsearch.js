// Initialise DOM elements
var searchInputEl = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var myModal = document.getElementById('myModal');
var myModalTitle = document.querySelector('.modal-title');
var myModalBody = document.getElementById('modalbodyval');
var closeModalEl = document.querySelector('.btn-close');
myModal.classList.add("hide");
var apiKey = "useKeyIProvideandRemoveitBeforePushing";

// Function to get search word
searchButton.addEventListener('click', () => {
    var searchWord = searchInputEl.value.trim().toLowerCase();
    if (searchWord) {
    //   myModal.setAttribute('class', 'hide');
      fetchEntriesAPI(searchWord);
      searchInputEl.value ="";
    }
});

// Function to fetch entries endpoint API

function fetchEntriesAPI(searchWord) {
    
// fetch request
  fetch(`https://xf-english-dictionary1.p.rapidapi.com/v1/dictionary?selection=${searchWord}&textAfterSelection=in%20English%20requires%20determination.&synonyms=true&audioFileLinks=true&pronunciations=true&relatedWords=true&antonyms=true&textBeforeSelection=Achieving%20full`, {
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "xf-english-dictionary1.p.rapidapi.com"
    }
  })
    // fetch("./response-entries-en-us-neanderthal.json")
    .then(res => {
        if (res.status != 200) {
          throw Error(res.status + " " + res.statusText);
        } else {
          return res.json();
        }
    })
    .then((data) => {
        // call back function to display dictionary data
        console.log(data);
        displayData(data);
    })
    .catch(error => {
        myModal.setAttribute('class', 'show');
        myModalTitle.innerText = "Oops, Something went wrong. Try again";
        myModalBody.innerText = error;
        closeModalEl.addEventListener('click',() => {
          myModal.setAttribute('class', 'hide');
        });
      })
}

// Function to display search results
function displayData(searchResult) {
    console.log(searchResult);
    // TO DO: get DOM elements and assign value
    // TO DO: create an button to mark the word as favourite
    // To DO: add an event listner to fav button
    // TO DO: create a function to store the favourite word in local storage
}