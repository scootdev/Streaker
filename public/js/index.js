$("#add-btn").click(function() {
    console.log("clicked")
    $("#rightCol").html("{{> utilities/add-block }}");
});
