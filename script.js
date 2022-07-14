const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("tweet");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

let jsonQuotes = [];

// Show Loader
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
} 
// Hide Loader
function complete(){
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show Quote
function newQuote() {
  loading();
  // Pick a random quote from getQuotes array
  const quote = jsonQuotes[Math.floor(Math.random() * jsonQuotes.length)];

  // check quote length to change the font size
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote and Hide Loader
  quoteText.textContent = quote.text;
  complete();

  // Check if author field is blank == null
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
}

// Get Quotes Function
async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    jsonQuotes = await response.json();
    newQuote();
  } catch (e) {
    // alert(e);
  }
}

// Tweet the quote
function tweetQuote(){
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();