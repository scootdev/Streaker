$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(data => {
        window.location.replace("/calendar");
        console.log(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

// Quote API
// const context = { quote: "new" };
// $(document).ready(() => {
//   // console.log(Object.keys(jQuery)); // Loading the object with keys
//   jQuery.get(
//     "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
//     data => {
//       console.log(data);
//       $(".result").html(JSON.stringify(data.quoteText));
//     }
//   );
// });

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
