let userid = 0;
const userGoals = [];

$("#calendar").evoCalendar({
  eventDisplayDefault: false,
  todayHighlight: true,
  eventListToggler: false,
  sidebarDisplayDefault: false
});

const date = new Date();
let month = date.getMonth() + 1;
if (month < 10) {
  month = `0${month}`;
}
const today = `${month}/${date.getDate()}/${date.getFullYear()}`;
$("#selected-date").html(today);
// selectDate
$("#calendar").on("selectDate", (event, newDate) => {
  console.log(newDate);
  $("#selected-date").html(newDate);
  renderGoals(newDate);
});

// gets the current user id
$.get("/api/user_data").then(data => {
  userid = data.id;
  updateGoals();
});

function renderGoals(date) {
  const goalList = [];
  $("#goal-list").html("");
  for (let i = 0; i < userGoals.length; i++) {
    const goal = userGoals[i];
    if (goal.date === date) {
      goalList.push(goal);
    }
  }
  for (let i = 0; i < goalList.length; i++) {
    const goal = goalList[i];
    const item = $(
      `<li class="list-group-item"><input type="checkbox" /> ${goal.name} </li>`
    );
    $("#goal-list").append(item);
  }
}

function updateGoals() {
  $.get(`/api/goals/${userid}`).then(data => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const goal = data[i];
      if (!goal.date) {
        const goalDate = today;
        userGoals.push({
          id: goal.id,
          name: goal.goalDes,
          date: goalDate,
          type: "event"
        });
      } else {
        const goalDate = reformatDate(goal.date);
        userGoals.push({
          id: goal.id,
          name: goal.goalDes,
          date: goalDate,
          type: "event"
        });
      }
    }
    $("#calendar").evoCalendar("addCalendarEvent", userGoals);
    renderGoals(today);
  });
}

$("#goal-submit").on("click", () => {
  if ($("#longTerm").prop("checked")) {
    const longTerm = true;
    const selectedDate = null;
    postGoal(longTerm, selectedDate);
  } else {
    const longTerm = false;
    const selectedDate = $("#end-date").val();
    postGoal(longTerm, selectedDate);
  }
});

function reformatDate(date) {
  const newDate = date.split("-");
  const reformattedDate = `${newDate[1]}/${newDate[2]}/${newDate[0]}`;
  return reformattedDate;
}

function postGoal(longterm, date) {
  const Goals = {
    goalDes: $("#description")
      .val()
      .trim(),
    date: date,
    longterm: longterm,
    color: $("input[name='options']:checked").val(),
    UserId: userid,
    completed: false
  };
  $.post("/api/goals", Goals).then(updateGoals());
}

$("#shortTerm").on("click", () => {
  $("#end-date").prop("disabled", false);
});

$("#longTerm").on("click", () => {
  $("#end-date").prop("disabled", true);
});

reformatDate("2020-07-23");
