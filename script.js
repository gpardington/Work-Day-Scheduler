//VARIABLES
//----------------------
//First, pull initial timeBlock items from localStorage to set initial variables and change them from the string to an object. Create the array in local storage using the || function
let timeBlocks = JSON.parse(localStorage.getItem("timeBlocks")) || [];
let lastID = localStorage.getItem("lastID") || 0;

//FUNCTIONS
//----------------------
//Third, function that updates localStorage with latest timeBlock item
const updateStorage = () => {
    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
    localStorage.setItem("lastID", lastID);
}
console.log(updateStorage);
//Fourth, function to render timeBlocks to table
const renderItems = function (items) {
    //this is saying that if a different item array is passed in, use that instead
    //if no items array is passed, then default and use the timeBlocks
    if (!items) items = timeBlocks;
    const textarea = $("#timeBlocks textarea");
    //prevents the entries from repeating themselves each time an entry is added:
    textarea.empty();
    //
    for (const { id, notes } of items) {
        textarea.append(`<tr data-id=${id}><td>${notes}</td></tr>`);
    }
}


//MAIN PROCESS
//Second, make a click event on the Save button that saves the text typed in the to-do box
$("addItem").click(function(event) {
    event.preventDefault();

    const newItem = {
        id: ++lastID,
        notes: $("#textarea").val().trim()
    };

    if (!newItem.notes) {
        return alert("Each event must have a description.");
    }
    //Update entered info to local storage
    timeBlocks.push(newItem);
    //Clear the form after it has been filled out and saved
    $("input, select").val("");
    updateStorage();
    renderItems();

})

//Called
renderItems();



//Date and time under header
$(document).ready(function () {
    //Used moment.js library to display current day & time under the header
    $('#currentDay').text(moment().format('LLLL'));
});
