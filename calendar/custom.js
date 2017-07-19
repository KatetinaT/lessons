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

  var btnPrev = idElem.querySelector(".arr-prev");
  var btnNext = idElem.querySelector(".arr-next");

  var newMonth = currentMonth;
  // var daysArr = [];

  makeMonthTitle(idElem, currentMonth); //add title of current month

  createDaysOfWeek(idElem); //create days of week
  createUlCalendar(idElem);

  var daysArr = createDaysOfMonth(currentDate, currentMonth, currentYear); //create days of month

  //add list of dates to calenadar
  makeCalendar(idElem, daysArr);

  //check today
  checkToday(currentMonth);

  changeMonthPrev(idElem, btnPrev, newMonth);//load prev month by click
  changeMonthNext(idElem, btnNext, newMonth);//load next month by click
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

//add ul calendar
var createUlCalendar = function(idElem) {
    var calendarUl = document.createElement("ul");
    calendarUl.classList.add("calendar");
    idElem.appendChild(calendarUl);
}

//Combine array with prev, current and next dates
var createDaysOfMonth = function(currentDate, currentMonth, currentYear) {
  var daysInMonth = new Date(currentYear, currentMonth+1, 0);
  var lastDateInMonth = daysInMonth.getDate();
  var firstDayInWeek = new Date(currentYear, currentMonth, 1).getDay();
  // console.log(firstDayInWeek + " firstDayInWeek")

  var daysArr = [];
  //current
  var getNewDate = function(num) {
    daysArr.push({date: num, month:"current", data:""+num + currentMonth + currentYear});
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
    var calendarUl = document.querySelector('.calendar');
    var newLi;

    for (var i=0; i<arr.length; i++) {
      newLi = document.createElement('li');
      newLi.innerHTML = arr[i].date;
      newLi.classList.add(arr[i].month);
      newLi.setAttribute("data-date", arr[i].data);
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

//load prev month by click
var changeMonthPrev = function(idElem, btnPrev, newMonth) {

  var calendar = document.querySelector(".calendar");
  var month = document.querySelector(".month");

  //combine btnPrev & btnNext into one function
  //step 1 - define month
  //step 2 - define year
  //step 3 - define the button was clicked -> if close 

  btnPrev.onclick = function() {
    calendar.innerHTML = '';
    month.innerHTML = '';
    var newDate = new Date();
    var newYear = newDate.getFullYear();
    var newDaysArr = []

    if (newMonth >= 1) {
      newMonth -= 1;
      console.log(newMonth);
      makeMonthTitle(idElem, newMonth);
      newDaysArr = createDaysOfMonth(newDate, newMonth, newYear);
      makeCalendar(idElem, newDaysArr);
    } else {
      newMonth = 11;
      newYear -= 1;
      console.log(newMonth + " new year" + newYear);
      makeMonthTitle(idElem, newMonth);
      newDaysArr = createDaysOfMonth(newDate, newMonth, newYear);
      makeCalendar(idElem, newDaysArr);
    }
  }

};

//load next month by click
var changeMonthNext = function(idElem, btnNext, newMonth) {

  var calendar = document.querySelector(".calendar");
  var month = document.querySelector(".month");

  btnNext.onclick = function() {
    calendar.innerHTML = '';
    month.innerHTML = '';
    var newDate = new Date();
    var newYear = newDate.getFullYear();
    var newDaysArr = []

    if (newMonth <= 11) {
      newMonth += 1;
      console.log(newMonth);
      makeMonthTitle(idElem, newMonth);
      newDaysArr = createDaysOfMonth(newDate, newMonth, newYear);
      makeCalendar(idElem, newDaysArr);
    } else {
      newMonth = 0;
      newYear += 1;
      console.log(newMonth + " new year" + newYear);
      makeMonthTitle(idElem, newMonth);
      newDaysArr = createDaysOfMonth(newDate, newMonth, newYear);
      makeCalendar(idElem, newDaysArr);
    }
  }

};

newCalendar("calendar");
