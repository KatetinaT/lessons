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

var newCalendar = function(elem) {
  var numMonth = makeMonthFucn(elem); //create current month  //return number of month in months arrow
  //console.log(numMonth + " numMonth");

  makeWeekDaysFunc(elem); //create days of week

  makeMonthDays(numMonth); //create days of month
  var daysArr = makeMonthDays(numMonth);

  //add list of dates to calenadar
  makeCalendar(elem, daysArr);

  //check today
  checkToday(numMonth);

  //change months
  changeMonthPrev(elem, numMonth);
}

//Create Month Function
var makeMonthFucn = function(id) {
  var idElem = document.getElementById(id);
  var monthTag = idElem.querySelector(".month");
  var cunnentDate = new Date();
  var currentMonth = cunnentDate.getMonth();
  // currentMonth = --currentMonth; //click back
  // currentMonth = ++currentMonth; //click front
  monthTag.innerHTML = months[currentMonth];
  return currentMonth;
}

//Days of Week Function
var makeWeekDaysFunc = function(id) {
  var idElem = document.getElementById(id);
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
      }
    }
}

//Combine array with prev, current and next dates
var makeMonthDays = function(month) {
  var newDate = new Date();
  var newYear = newDate.getFullYear();
  var newMonth = month;
  var daysInMonth = new Date(newYear, newMonth+1, 0);
  var lastDateInMonth = daysInMonth.getDate();
  var firstDayInWeek = new Date(newYear, newMonth, 1).getDay();
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
    num = new Date(newYear, newMonth, 1-num).getDate();
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
        var nextMonthDate = new Date(newYear, newMonth+1, i).getDate();
        daysArr.push({date: nextMonthDate, month: "next"});
      }
    }

  return daysArr;

}

//add numbers to the calendar from array
var makeCalendar = function(elem, arr) {
    var calendarId  = document.getElementById(elem);
    var calendarUl = document.createElement("ul");
    calendarUl.classList.add("calendar");
    calendarId.appendChild(calendarUl);

    var newLi;
    for (var i=0; i<arr.length; i++) {
      newLi = document.createElement('li');
      newLi.innerHTML = arr[i].date;
      newLi.classList.add(arr[i].month);
      calendarUl.appendChild(newLi);
    }
}

//check and mark today's date
var checkToday = function(month) {
  var checkDate = new Date();
  var checkMonth = checkDate.getMonth();
  if(checkMonth == month) {
    var getToday = checkDate.getDate();
    var findToday = document.querySelectorAll(".current")[getToday];
    findToday.classList.add("today");
  }

};

//change month prev
var changeMonthPrev = function(elem, numMonth) {
  var calendarId  = document.getElementById(elem);
  var calendarPrev = calendarId.querySelector(".arr-prev");
  calendarPrev.onclick = function() {
    console.log("after: " + numMonth);
    calendarId.removeChild(calendarId.querySelector(".calendar"));
    return numMonth--;

  }

}

newCalendar("calendar");
