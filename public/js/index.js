var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var date = now.getDate();


var data = [{
    date: year + '-' + month + '-' + (date - 1),
    value: 'hello'
}, {
    date: year + '-' + month + '-' + date,
    value: '上班'
}, {
    date: new Date(year, month - 1, date + 1),
    value: '吃饭睡觉打豆豆'
}, {
    date: '2016-10-31',
    value: '2016-10-31'
}];

// inline
var $ca = $('#calendar').calendar({
     // width
     width: window.innerWidth - 50,
    
     // height, 
     height: window.innerWidth - 50,
});