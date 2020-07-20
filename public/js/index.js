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
    let checked = "";
    console.log(goal.completed);
    if (goal.completed) {
      checked = "checked";
    } else {
      checked = "";
    }
    const item = $(
      `<li class="list-group-item"><input class="check" type="checkbox" data-id="${goal.id}" ${checked} /> ${goal.name} <button class="float-right btn delete-goal" data-id="${goal.id}" data-name="${goal.name}"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></button></li>`
    );
    $("#goal-list").append(item);
  }
  $(".delete-goal")
    .unbind()
    .on("click", function(e) {
      e.stopPropagation();
      const name = $(this).data("name");
      $.ajax({
        url: `/api/goals/${name}/${userid}`,
        method: "DELETE"
      }).then(location.reload());
    });
}

function updateGoals() {
  $("#goal-list").html("");
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
          type: goal.color,
          completed: goal.completed,
          longterm: goal.longterm
        });
      } else {
        const goalDate = reformatDate(goal.date);
        userGoals.push({
          id: goal.id,
          name: goal.goalDes,
          date: goalDate,
          type: goal.color,
          completed: goal.completed,
          longterm: goal.longterm
        });
      }
    }
    $("#calendar").evoCalendar("addCalendarEvent", userGoals);
    renderGoals(today);
    getShortTerm();
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
    const dates = getDates(new Date(today), new Date(selectedDate));
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      postGoal(longTerm, date);
    }
  }
});

/* eslint-disable */
const getDates = function(startDate, endDate) {
  startDate = `${startDate.getMonth() +
    1}/${startDate.getDate()}/${startDate.getFullYear()}`;
  endDate = `${endDate.getMonth() + 1}/${endDate.getDate() +
    1}/${endDate.getFullYear()}`;
  let dates = [],
    currentDate = startDate,
    addDays = function(days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      return date;
    };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};
/* eslint-disable */

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

$(document).on("click", ".check", function() {
  const id = $(this).data("id");
  const bool = $(this).prop("checked");
  $.ajax({
    url: `/api/goals/${id}/${bool}`,
    method: "PUT"
  });
  location.reload();
});

function getShortTerm() {
  $.get(`/api/goals/${userid}/shortterm`).then(data => {
    // Progress bar goal array
    const goals = [];
    const colors = [];
    for (let i = 0; i < data.length; i++) {
      const goal = data[i].goalDes;
      const color = data[i].color;
      colors.push(color);
      goals.push(goal);
    }
    const listGoals = [...new Set(goals)];
    const listColors = [...new Set(colors)];

    // Progress Bars
    for (let i = 0; i < listGoals.length; i++) {
      let days = 0;
      let completed = 0;
      const goal = listGoals[i];
      $.get(`/api/goals/${goal}/${userid}`).then(data => {
        for (let i = 0; i < data.length; i++) {
          const goal = data[i];
          days++;
          if (goal.completed) {
            completed++;
          }
        }

        const percentage = parseInt((completed / days) * 100, 10);
        const progList = $("<li>");
        const progBar = $("<div>");
        const progDiv = $("<div>");
        const hr = $("<hr>");
        $("#progress").append(progList);
        progList
          .text(listGoals[i])
          .append(progBar)
          .append(hr);
        progBar.attr("class", "progress").append(progDiv);
        progDiv
          .attr(
            "class",
            "progress-bar-striped progress-bar-animated progress-bar-" +
              listColors[i]
          )
          .attr("role", "progressbar")
          .attr("style", "width:" + percentage + "%")
          .attr("aria-valuenow", "0")
          .attr("aria-valuemin", "0")
          .attr("aria-valuemax", "100");
      });
    }
  });
}

// if (listColors[i] = "red") {
//   var percent = redPer
// }
// console.log(percent)

// const bar = $(
//   `<li class="progress">${listGoals[i]}
// <div class="progress-bar-striped progress-bar-animated progress-bar-${listColors[i]}" role="progressbar" style="width: 25% aria-value-now="0" aria-valuemin="0" aria-valuemax="100">
// </div>
// </li>`)

// Each goal should get it's own array
// condition = [];
// for (let i = 0; i < data.length; i++) {
//   const status = data[i];
//   condition.push({
//     desc: status.goalDes,
//     date: status.date,
//   });
// };
// console.log(condition[1]);
// console.log(condition[2]);
// console.log(endDate);
