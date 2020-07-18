$("#short-goal").on("click", () => {
  function postGoal(startDate, endDate, exampleInputEmail1, options) {
    $.post("/api/short-term-goal", {
      startDate: startDate,
      endDate: endDate,
      goalDescription: exampleInputEmail1,
      colorSelected: options
    })
      .then(data => {
        // window.location.replace("/calendar");
        console.log(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(err => {
        console.log(err);
      });
  }
  const exampleInputEmail1 = $("#exampleInputEmail1").val(); // This gets the element
  const options = $("input[name='options']:checked").val(); // Selecting an element using the input and specify the propery and go find that value of what was checked from the radio button option

  postGoal(startDate, endDate, exampleInputEmail1, options);
});
