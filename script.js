// Declare variables
var currentDay = $("#currentDay");
var scheduleArea = $(".schedule");
var timeBlock = $(".time-block");
var currentDate = $('#currentDate').text(moment().format('LLLL'));
var currentHour = moment().format("H");
var toDoItems = [];

//Array of objects
function startSchedule() {
    timeBlock.each(function() {
    var thisRow = $(this);
    var thisRowHour = parseInt(thisRow.attr("data-hour"));

    var todoObj = {
        hour: thisRowHour,
        text: "",
    }
    toDoItems.push(todoObj);    
    });
//Set up a for loop to go through all rows and save info to local storage
    localStorage.setItem("todos", JSON.stringify(toDoItems));
};

function saveItmes () {
    var hourUpdate = $(this).parent().attr("data-hour");
    var addItem = $(this).parent().children("textarea").val();
    for (var i = 0; i < toDoItems.length; i++) {
        if (toDoItems[i].hour === hourUpdate){
            toDoItems[i].text = addItem;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    renderSchedule();
}

//Color functionality for time of day
function setRowColor() {
    timeBlock.each(function() {
        var thisRow = $(this);
        var thisRowHour = parseInt(thisRow.attr("data-hour"));
        
        if (thisRowHour === currentHour) {
            thisRow.addClass("present").removeClass("past future");
        }
        if (thisRowHour < currentHour) {
            thisRow.addClass("past").removeClass("present future");
        }
        if (thisRowHour > currentHour) {
            thisRow.addClass("future").removeClass("present past");
        }
    });
}

//Render data
function renderSchedule() {
    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);

    for (var i = 0; i < toDoItems.length; i++){
        var itemHour = toDoItems[i].hour;
        var itemText = toDoItems[i].text;

        $("[data-hour" + itemHour + "]").children("textarea").val(itemText);
    }
}

//Start the array of objects. Otherwise, don't run the function since it will come from localStorage
$(document).ready(function() {
    setRowColor();

    if(!localStorage.getItem("todos")) {
        startSchedule();
    }

    //display the current date
    currentDay.text(currentDate);

    renderSchedule();

    //Whenever something is typed in the time block field and the save icon is clicked, save it to localStorage
    scheduleArea.on("click", "button", saveItmes);
});