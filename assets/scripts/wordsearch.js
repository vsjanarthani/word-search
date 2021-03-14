// Initialise DOM elements
var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var searchButton = document.getElementById("search-button");
var myModal = document.getElementById('myModal');
var myModalTitle = document.querySelector('.modal-title');
var myModalBody = document.getElementById('modalbodyval');
var closeModalEl = document.querySelector('.btn-close');
myModal.classList.add("hide");
var apiKey = "";



// Function to get search word
searchButtonEl.addEventListener('click', () => {
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
  // fetch(`https://xf-english-dictionary1.p.rapidapi.com/v1/dictionary?selection=${searchWord}&textAfterSelection=in%20English%20requires%20determination.&synonyms=true&audioFileLinks=true&pronunciations=true&relatedWords=true&antonyms=true&textBeforeSelection=Achieving%20full`, {
  //   "method": "POST",
  //   "headers": {
  //     "content-type": "application/json",
  //     "x-rapidapi-key": apiKey,
  //     "x-rapidapi-host": "xf-english-dictionary1.p.rapidapi.com"
  //   }
  // })
    fetch("./assets/scripts/response-wordsearch-happy.json")
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
  // add the searched word as title
  var searchedTitleEl = document.getElementById("searchedWord");
  searchedTitleEl.textContent = searchResult.target;
  // add the type of word
  var typeWordEl = document.getElementById("typeOfWord");
  typeWordEl.textContent = searchResult.items[0].partOfSpeech;

  // add definition
  var definitionEL = document.getElementById("ex1-tabs-1");
  definitionEL.textContent = searchResult.items[0].definitions[0].definition;
  console.log(searchResult.items[0].synonyms[1])

  // synonyms section
  var synonymsEl = document.getElementById("synonyms");
  var synonymsObj = searchResult.items[0].synonyms;
  if(synonymsObj){
    synonymsEl.innerHTML = searchResult.items[0].synonyms[0];
  } else {
    synonymsEl.textContent ="Not found!";
  }

}