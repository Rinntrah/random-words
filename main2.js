var eQuote = document.querySelector("#neat");

var regex = /\ /;
// save the original paragraph as array of words
// regex = /[,.?!;:]/; /* Uncomment for sentences */
var aQuote = eQuote.innerHTML.split(regex);

// wrap each word with a span
eQuote.innerHTML = "";
for(var word in aQuote){
  eQuote.innerHTML += "<span>" + aQuote[word] + "</span>";
}
// ...and save them for later
var eWords = document.querySelectorAll("span");

var repeat = setInterval(function() {

}, 25);

function fHighlightRandomWord (e) {
  var iRandom = Math.floor(Math.random() * e.length);
  e[iRandom].classList.add("highlight");
}

function fClearAllHighlights (e) {
  var nlHighlights = e.querySelectorAll(".highlight");
  // convert the nodeList into an array
  var aHighlights = Array.prototype.slice.call(nlHighlights);
  // remove .highlight from the spans which have it
  Array.prototype.map.call(aHighlights, function(){
    arguments[0].classList.remove("highlight");
  });
}

var ILOSC_SLOW_PODSWIETLONYCH = 10;

//funkcja wzywana po wcisnięciu przycisku Highlight
function hlRandomWord(){
	
  fClearAllHighlights(eQuote);
  
  for( let i=0; i < ILOSC_SLOW_PODSWIETLONYCH;i++){
	fHighlightRandomWord(eWords);
  }
  
}