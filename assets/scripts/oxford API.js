// Initialise DOM elements
var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");

// var apiUrl = `https://od-api.oxforddictionaries.com/api/v2/${endpoint}/${language_code}/${searchWord}`;

const app_id = "67feb028";
const app_key = "dd57d4e1df89bd4ae48852837d7c462c";
const headers = {"app_id": app_id, "app_key": app_key};

// var wordlowercase = searchWord.toLowerCase();

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

var endpoint = "entries";
var language_code = "en-us";
    // fetch request
  //   fetch(`https://od-api.oxforddictionaries.com/api/v2/${endpoint}/${language_code}/${searchWord}`, 
  //   {
  //     method: "GET",
  //     headers: headers,
  // })
    fetch("./assets/scripts/response_home.json")
    .then(res => {
        if (res.status != 200) {
          throw Error(res.status + " " + res.statusText);
        } else {
          return res.json();
        }
    })
    .then((data) => {
        // call back function to display dictionary data
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