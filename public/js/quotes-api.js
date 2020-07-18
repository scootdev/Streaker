// eslint-disable-next-line no-unused-vars
const context = { quote: "new" };

$(document).ready(() => {
  // console.log(Object.keys(jQuery));
  getQuote();
}); // Test

function getQuote() {
  $.get(
    "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
    data => {
      if (data.quoteText.length < 128) {
        $("#quote").text(data.quoteText);
      }
      else {
        getQuote();
      }
    }
  );
}
