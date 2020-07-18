$(document).ready(() => {
    console.log("Hello!");

    let totalDays = 0;
    let progress = 0;
    const goalOne = $("input.goal-one");

    function countBoxes() {
        // count = $("input[type='checkbox']").length;

        totalDays = goalOne.length;
        console.log(totalDays);
    };
    countBoxes();

    // $(":checkbox").click(countBoxes);

    // count checks

    function countChecked() {
        progress = $("input:checked").length;
        console.log(progress);

        let percentage = parseInt(((progress / totalDays) * 100), 10);
        console.log(percentage);

        $("#dynamic")
            .css("width", percentage + "%")
            .attr("aria-valuenow", percentage)
            .text(percentage + "% Complete");
    };

    countChecked();

    $(":checkbox").click(countChecked);

    

});