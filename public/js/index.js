const date = new Date();
let month = date.getMonth() + 1;
if (month < 10) {
  month = `0${month}`;
}
const today = `${month}/${date.getDate()}/${date.getFullYear()}`;
$("#selected-date").html(today);
// selectDate
// eslint-disable-next-line no-unused-vars
$("#calendar").on("selectDate", (event, newDate, oldDate) => {
  $("#selected-date").html(newDate);
});
