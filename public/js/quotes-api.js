$(document).ready(() => {
  jQuery.get(
    "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
    data => {
      console.log(data);
      $(".result").html(data);
      alert("Load was performed.");
    }
  );
});

// $.ajax({
//   type: "GET",
//   url: "https://cors-anywhere.herokuapp.com/http://forismatic.com/en/api/",
//   dataType: "jsonp",
//   headers: {
//     "x-requested-with": "xhr"
//   },
//   success: function(result) {
//     console.log(result);
//   }
// });
