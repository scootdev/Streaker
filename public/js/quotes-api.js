// eslint-disable-next-line no-unused-vars
const context = { quote: "new" };

$(document).ready(() => {
  // console.log(Object.keys(jQuery));
  $.get(
    "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
    data => {
      console.log(data.quoteText);
      $("#quote").text(data.quoteText);
      alert("Load was performed.");
    }
  );
});
