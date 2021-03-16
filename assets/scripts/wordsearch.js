// Initialise DOM elements
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
var myKi = "";
var wordOfDayBtn = document.getElementById("wordOfDay");

    // TO DO: get DOM elements and assign value
    // TO DO: create an button to mark the word as favourite
    // To DO: add an event listner to fav button
    // TO DO: create a function to store the favourite word in local storage


// Function to get search word
searchButton.addEventListener('click', () => {
  var searchWord = searchInputEl.value.trim().toLowerCase();
  if (searchWord) {
    fetchDefinitionAPI(searchWord);
    fetchReferenceAPI(searchWord);
    fetchExampleAPI(searchWord)
    searchInputEl.value ="";
  }
});

function fetchDefinitionAPI(searchWord) {
fetch(`https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=${searchWord}`, {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": myKi,
    "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com"
  }
})
// fetch request using sample json response
// fetch("./assets/scripts/response-twinword-definition.json")
.then(res => {
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
.catch(error => {
  definitionEl.innerText = error;
})
}

// Function to display search results
function displayDefinition(searchResult) {
  // console.log(searchResult);
  searchedWordEl.innerText = searchResult.response.toUpperCase();
  let defintion = searchResult.meaning;
  var defVal = "";
  const myDefinition = (input) => Object.entries(input).forEach(([key,value]) => {
  if (value.length > 0) {
    defVal = defVal + "<strong>" + key + "</strong>" + ":<br>" + value.replaceAll("\n", ".<br>") + "." + "<br>" ;
  } else {
    definitionEl.innerText = "Nothing to Display";
  }
  })
  myDefinition(defintion);
  definitionEl.innerHTML = defVal;
  phoneticsEl.innerText = ` ${searchResult.ipa}`;
}

// function to fetch reference for the searched word

function fetchReferenceAPI(searchWord) {
fetch(`https://twinword-word-graph-dictionary.p.rapidapi.com/reference/?entry=${searchWord}`, {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": myKi,
    "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com"
  }
})
// fetch request using sample json response
// fetch("./assets/scripts/response-twinword-reference.json")
.then(res => {
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
.catch(error => {
  referenceEl.innerText = error;
})
}

// function to display reference data
function displayReference(searchResult) {
// console.log(searchResult);
let reference = searchResult.relation;
var refVal = "";
const myReference = (input) => Object.entries(input).forEach(([key,value]) => {
  if (value.length > 0) {
    refVal = refVal + "<strong>" + key + "</strong>" + ":<br>" + value + "." + "<br>" ;
  } else {
    referenceEl.innerText = "Nothing to Display";
  }
  })
myReference(reference);
referenceEl.innerHTML = refVal;
}

// function to fetch examples for the searched word

function fetchExampleAPI(searchWord) {
  fetch(`https://twinword-word-graph-dictionary.p.rapidapi.com/example/?entry=${searchWord}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": myKi,
      "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com"
    }
  })
  // fetch request using sample json response
  // fetch("./assets/scripts/response-twinword-example.json")
  .then(res => {
      if (res.status != 200) {
        throw Error(res.status + " " + res.statusText);
      } else {
        return res.json();
      }
  })
  .then((data) => {
      // call back function to display dictionary data
      displayExample(data);
  })
  .catch(error => {
    exampleEl.innerText = error;
  })
  }
  
// function to display example data
function displayExample(searchResult) {
  // console.log(searchResult);
  let example = searchResult.example;
  let underlinedWord = searchedWordEl.textContent.toLowerCase();
  console.log(example);
  var examVal = "";
  var slNo = 0;
  const myExample = (input) => Object.entries(input).forEach(([key,value]) => {
    if (value.length > 0) {
      slNo++;
      examVal = `${examVal}${slNo}: ${value}<br>`;
      console.log(key.length,value.length);
    } else {
      exampleEl.innerText = "Nothing to Display";
    }
    })
  myExample(example);
  exampleEl.innerHTML = examVal.replace(new RegExp(underlinedWord, "gi"), `<u>${underlinedWord}</u>`);
  console.log(examVal);
  }

// =========================== get random word of the day starts ============================== //
var getRandomWord = function() {
  fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": myKi,
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
	}
})
// fetch("./assets/scripts/response-wordsapi-randomWord.json")
.then(response => {
  if (response.ok) {
    response.json().then(function(data) {
      input = String(data.word);
      console.log(input);
      fetchDefinitionAPI(input);
      fetchReferenceAPI(input);
      fetchExampleAPI(input);
    });
} else {
  definitionEl.innerText = error;
}
})
.catch(err => {
	console.error(err);
});
}

// function to display random word
wordOfDayBtn.addEventListener('click', getRandomWord);