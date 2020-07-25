$(document).ready(function () {
    //Used moment.js library to display current day & time under the header
    $('#currentDay').text(moment().format('LLLL'));
});
