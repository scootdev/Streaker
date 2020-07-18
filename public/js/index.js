let userid = 0;
const date = new Date();
let month = date.getMonth() + 1
if (month < 10) {
    month = `0${month}`;
};
const today = `${month}/${date.getDate()}/${date.getFullYear()}`
$('#selected-date').html(today);
// selectDate
$('#calendar').on('selectDate', function (newDate) {
    $('#selected-date').html(newDate);
    renderGoals(userid, newDate)
});

// gets the current user id
$.get("/api/user_data").then(data => {
    userid = data.id
});

function renderGoals(userid, date) {
    $.get(`/api/goals/${userid}/${date}`).then(data => {
        console.log(data);
    })
}


