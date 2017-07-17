var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

var weekDays = [
  "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"
];

var newCalendar = function(id) {
  var idElem = document.getElementById(id); //get element by id
  var currentDate =  new Date(); //get current date
  var currentMonth = currentDate.getMonth(); //get current month
  var currentYear = currentDate.getFullYear(); //get current year

  makeMonthTitle(idElem, currentMonth); //add title of current month

  createDaysOfWeek(idElem); //create days of week

  var daysArr = createDaysOfMonth(currentDate, currentMonth, currentYear); //create days of month
  // var daysArr = createDaysOfMonth(currentDate, currentMonth, currentYear);

  //add list of dates to calenadar
  makeCalendar(idElem, daysArr);

  //check today
  checkToday(currentMonth);

  //change months
  changeMonthPrev(idElem, currentMonth);
};

//add name of month to calendar
var makeMonthTitle = function(idElem, currentMonth) {
  var monthTag = idElem.querySelector(".month");
  monthTag.innerHTML = months[currentMonth];
};

//Create Days of Week
var createDaysOfWeek = function(idElem) {
  var ulWeek = document.createElement('ul');
  idElem.appendChild(ulWeek);
  ulWeek.classList.add('week');
  var makeWeekDays;

    for (var i=0; i<weekDays.length; i++) {
      makeWeekDays = document.createElement('li');
      makeWeekDays.innerHTML = weekDays[i];
      ulWeek.appendChild(makeWeekDays);

      if(i==5 || i==6) {
        makeWeekDays.classList.add('dayoff')
      };

    };

};

//Combine array with prev, current and next dates
var createDaysOfMonth = function(currentDate, currentMonth, currentYear) {
  var daysInMonth = new Date(currentYear, currentMonth+1, 0);
  var lastDateInMonth = daysInMonth.getDate();
  var firstDayInWeek = new Date(currentYear, currentMonth, 1).getDay();
  // console.log(firstDayInWeek + " firstDayInWeek")

  var daysArr = [];
  //current
  var getNewDate = function(num) {
    daysArr.push({date: num, month:"current"});
  };
  for (var i = 1; i <= lastDateInMonth; i++) {
    getNewDate(i);
  }

  //prev
  var prevMonthDate = function(num) {
    num = new Date(currentYear, currentMonth, 1-num).getDate();
    daysArr.unshift({date: num, month:"prev"});
  };

  if (firstDayInWeek > 1) {
    for (var i = 1; i < firstDayInWeek; i++) {
      prevMonthDate(i);
    }
  }
  if (firstDayInWeek == 0) {
    for (var i = 1; i < firstDayInWeek; i++) {
      prevMonthDate(i);
    }
  }

  //next
  var checkNextMonth = daysArr.length%7;

    if(checkNextMonth!=0) {
      for (var i=1; i<=(7-checkNextMonth); i++) {
        var nextMonthDate = new Date(currentYear, currentMonth+1, i).getDate();
        daysArr.push({date: nextMonthDate, month: "next"});
      }
    }

  return daysArr;

}

//add numbers to the calendar from array
var makeCalendar = function(idElem, arr) {
    var calendarUl = document.createElement("ul");
    calendarUl.classList.add("calendar");
    idElem.appendChild(calendarUl);

    var newLi;
    for (var i=0; i<arr.length; i++) {
      newLi = document.createElement('li');
      newLi.innerHTML = arr[i].date;
      newLi.classList.add(arr[i].month);
      calendarUl.appendChild(newLi);
    }
}

//check and mark today's date
var checkToday = function(currentMonth) {
  var checkDate = new Date();
  var checkMonth = checkDate.getMonth();
  
  if(checkMonth == currentMonth) {
    var getToday = checkDate.getDate();
    var findToday = document.querySelectorAll(".current")[getToday-1];
    findToday.classList.add("today");
  }

};

//change month prev
var changeMonthPrev = function(idElem, currentMonth) {
  var calendarPrev = idElem.querySelector(".arr-prev");

  calendarPrev.onclick = function() {
    console.log("after: " + currentMonth);
    idElem.removeChild(idElem.querySelector(".calendar"));
    return numMonth--;
  }

};

newCalendar("calendar");
