var translateButton = document.getElementById("download-button")
var inputData = document.querySelector('.userInput')
var showForm = document.getElementById('showForm')
var selectButton = document.getElementById('selectButton')
var arabicSelect = document.getElementById('arabicCheck')
var spanishSelect = document.getElementById('spanishCheck')
var frenchSelect = document.getElementById('frenchCheck')
var sectionForTranslate = document.getElementById('addTranslation')
var userInput = inputData.value

document.addEventListener('DOMContentLoaded', function () {
  // var drop = document.querySelectorAll('.dropdown-trigger');
  // M.Dropdown.init(drop);
  init();


});



async function runFetch(input) {

  console.log(arabicCheck.checked)
  if (arabicCheck.checked) {
    targetLanguage = "ar"
  }
  else if (spanishCheck.checked) { targetLanguage = "es" }

  else { targetLanguage = "fr" }
  // if (arabicSelect.checked){
  //   targetLanguage=""
  // }


  var res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    body: JSON.stringify({
      q: input.value,


      source: "en",
      target: targetLanguage,
      format: "text"
    }),
    headers: { "Content-Type": "application/json" }
  });



  var inputTranslated = await res.json()

  return inputTranslated


}

translateButton.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(event.target);
  runFetch(inputData).then(function (translatedText) {
    console.log(translatedText)



    localStorage.setItem("userEntries", JSON.stringify(userEntries))

    var userInput = inputData.value
    var lastSearch = localStorage.setItem("previousSearch", userInput)
    var firstSearch = localStorage.getItem("previousSearch")
    userEntries.push(firstSearch)
    if (inputData.value !== lastSearch) {

    }
    console.log(userEntries)
    localStorage.setItem("firstSearch", firstSearch)


    var userInput = inputData.value;
    console.log(userInput);
    // localStorage.setItem("lastEntry", storedE);
    // inputData=localStorage.setItem('input-text');

    // the IF STATEMENTS GO HERE 

    showOnPage(translatedText)
  });
})


var userEntries = []

function init() {
  localStorage.clear();
  var storedEntries = JSON.parse(localStorage.getItem("userEntries"))
  if (storedEntries !== null) {
    userEntries = storedEntries;
  }
}

selectButton.addEventListener("click", function (event) {
  event.preventDefault()
  console.log("this works")
  showForm.setAttribute("style", "display:block")

})


//Show translation on Page

function showOnPage(userInput) {
  console.log(userInput)
  var newDiv = document.createElement("div")
  var showOnPage = document.createElement('h3')
  showOnPage.setAttribute("class", "addText")
  showOnPage.setAttribute("type", "text");
  showOnPage.innerText = userInput.translatedText
  showOnPage.style.textcolor = "black"
  newDiv.append(showOnPage)
  sectionForTranslate.append(newDiv)


}
// var showOnPage = document.createElement('h1')
// var innertext = response.translatedtext
// showOnPage.innerText = response
// sectionForTranslate.append(showOnPage)