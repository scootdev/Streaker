const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();


let data = [{
    date: '2020-07-20',
    value: 'Presentation Day'
}];

// inline
const $ca = $('#calendar').calendar({
     // width
     width: window.innerWidth - 25,
    
     // height, 
     height: window.innerWidth - 25,
     data: data
});