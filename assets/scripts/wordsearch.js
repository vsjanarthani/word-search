// Initialize DOM elements

var fav = document.getElementById("add-favs");

var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var searchButton = document.getElementById("search-button");
var searchedWordEl = document.getElementById("searched-word");
var wordDisplayEl = document.getElementById("word-display");
var definitionEl = document.getElementById("definition");
var referenceEl = document.getElementById("reference");
var exampleEl = document.getElementById("example");
var wordEl = document.getElementById("word");
var phoneticsEl = document.getElementById("phonetics");
var favBtn = document.getElementById("add-favs");
var favSearchEl = document.getElementById("fav-search");
var tabNavSecEl = document.getElementById("display-answer");
var myKi = "a9948976b7msh01160229121d1b6p1fd4d3jsnf2012c72efd4";
tabNavSecEl.classList.add("hide");
// Function to get search word
searchButton.addEventListener("click", () => {
  var searchWord = searchInputEl.value.trim().toLowerCase();
  if (searchWord) {
    tabNavSecEl.classList.remove("hide");
    fetchDefinitionAPI(searchWord);
    fetchReferenceAPI(searchWord);
    fetchExampleAPI(searchWord);
    searchInputEl.value = "";
  }
});

// Function to fetch difinition API
function fetchDefinitionAPI(searchWord) {
  fetch(
    `https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=${searchWord}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": myKi,
        "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
      },
    }
  )
    // fetch request using sample json response
    // fetch("./assets/scripts/response-twinword-definition.json")
    .then((res) => {
      if (res.status != 200) {
        throw Error(res.status + " " + res.statusText);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      // call back function to display dictionary data
      displayDefinition(data);
    })
    .catch((error) => {
      definitionEl.innerText = error;
    });
}

// Function to display search results
function displayDefinition(searchResult) {
  // console.log(searchResult);
  searchedWordEl.innerText = searchResult.response.toUpperCase();
  let defintion = searchResult.meaning;
  var defVal = "";
  const myDefinition = (input) =>
    Object.entries(input).forEach(([key, value]) => {
      if (value.length > 0) {
        defVal =
          defVal +
          "<strong>" +
          key +
          "</strong>" +
          ":<br>" +
          value.replaceAll("\n", ".<br>") +
          "." +
          "<br>";
      } else {
        definitionEl.innerText = "Nothing to Display";
      }
    });
  myDefinition(defintion);
  definitionEl.innerHTML = defVal;
  phoneticsEl.innerText = ` ${searchResult.ipa}`;
}

// function to fetch reference for the searched word

function fetchReferenceAPI(searchWord) {
  fetch(
    `https://twinword-word-graph-dictionary.p.rapidapi.com/reference/?entry=${searchWord}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": myKi,
        "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
      },
    }
  )
    // fetch request using sample json response
    // fetch("./assets/scripts/response-twinword-reference.json")
    .then((res) => {
      if (res.status != 200) {
        throw Error(res.status + " " + res.statusText);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      // call back function to display dictionary data
      displayReference(data);
    })
    .catch((error) => {
      referenceEl.innerText = error;
    });
}

// function to display reference data
function displayReference(searchResult) {
  // console.log(searchResult);
  let reference = searchResult.relation;
  var refVal = "";
  const myReference = (input) =>
    Object.entries(input).forEach(([key, value]) => {
      if (value.length > 0) {
        refVal =
          refVal +
          "<strong>" +
          key +
          "</strong>" +
          ":<br>" +
          value +
          "." +
          "<br>";
      } else {
        referenceEl.innerText = "Nothing to Display";
      }
    });
  myReference(reference);
  referenceEl.innerHTML = refVal;
}

// function to fetch examples for the searched word

function fetchExampleAPI(searchWord) {
  fetch(
    `https://twinword-word-graph-dictionary.p.rapidapi.com/example/?entry=${searchWord}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": myKi,
        "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
      },
    }
  )
    // fetch request using sample json response
    // fetch("./assets/scripts/response-twinword-example.json")
    .then((res) => {
      if (res.status != 200) {
        throw Error(res.status + " " + res.statusText);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      // console.log(data);
      // call back function to display dictionary data
      displayExample(data);
    })
    .catch((error) => {
      exampleEl.innerText = error;
    });
}

// function to display example data
function displayExample(searchResult) {
  // console.log(searchResult);
  let example = searchResult.example;
  let underlinedWord = searchedWordEl.textContent.toLowerCase()
    ? searchedWordEl.textContent.toLowerCase()
    : localStorage.getItem("rdmWrd");
  // let underlinedWord = localStorage.getItem('rdmWrd');
  var examVal = "";
  var slNo = 0;
  const myExample = (input) =>
    Object.entries(input).forEach(([key, value]) => {
      if (value.length > 0) {
        slNo++;
        examVal = `${examVal}${slNo}: ${value}<br>`;
        // console.log(key.length, value.length);
      } else {
        exampleEl.innerText = "Nothing to Display";
      }
    });
  myExample(example);
  exampleEl.innerHTML = examVal.replace(
    new RegExp(underlinedWord, "gi"),
    `<u>${underlinedWord}</u>`
  );
}

// Function to add favoutite word to favoutite words HTML

favBtn.addEventListener("click", () => {
  var favWord = searchedWordEl.innerText;
  // console.log(favWord);
  // store the search result in local storage
  if (localStorage.getItem("saved-word") == null) {
    savedWord = [];
  } else {
    savedWord = JSON.parse(localStorage.getItem("saved-word"));
  }

  if (!savedWord.includes(favWord)) {
    // Add new data to the exisitng data
    savedWord.push(favWord);
  }
  // To display last 5 searches
  if (savedWord.length > 20) {
    savedWord.shift();
  }

  localStorage.setItem("saved-word", JSON.stringify(savedWord));

  // Call back function to display searched city
  favWordDisplay();
});

// Function to apend and display Fav Words
function favWordDisplay() {
  favSearchEl.innerHTML = "";
  savedWord = JSON.parse(localStorage.getItem("saved-word"));
  if (savedWord != null) {
    savedWord.forEach((element) => {
      var buttonEl = document.createElement("button");
      buttonEl.setAttribute("class", "btn btn-primary ripple-surface fav");
      buttonEl.setAttribute("type", "button");
      buttonEl.setAttribute("href", "./index.html");
      buttonEl.innerText = element;
      favSearchEl.appendChild(buttonEl);
    });
  }
}
favWordDisplay();

// Function to pass favWord as the search input - TO DO
favSearchEl.addEventListener("click", function (event) {
  if (event.target.classList == "btn btn-primary ripple-surface fav") {
    var searchWord = event.target.innerText.toLowerCase();
    tabNavSecEl.classList.remove("hide");
    fetchDefinitionAPI(searchWord);
    fetchReferenceAPI(searchWord);
    fetchExampleAPI(searchWord);
  }
});

// Function to clear storage
function clearData() {
  localStorage.removeItem("saved-word");
  document.location.reload();
}
