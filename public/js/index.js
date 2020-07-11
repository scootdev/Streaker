const data = [
  {
    date: "2020-07-20",
    value: "Presentation Day"
  }
];

// calendar
$("#calendar").calendar({
  // width
  width: window.innerWidth - 25,

  // height,
  height: window.innerWidth - 25,
  data: data
});

// planner
// function renderPlanner() {
//     $("#planner").html("");
//     const table = ("<table>");
//     $("#planner").append(table);
//     for (let i = 0; i = 24; i++) {
//         const row = (`
//         <tr id="hour-${i}">
//             <th class="text-center border-right" scope="row">${i}:00</th>
//             <td class="w-75"></td>
//         </tr>
//         `)
//         $(table).append(row);
//     }
// }

// set current hour
const currentHour = "#hour-" + moment().hour();
$(currentHour).addClass("time-present");
// set past hours
for (let i = 1; i < moment().hour(); i++) {
  const hour = "#hour-" + i;
  $(hour).addClass("time-past");
}
