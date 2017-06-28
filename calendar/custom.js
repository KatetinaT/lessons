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
  console.log(numMonth + " numMonth");

  makeWeekDaysFunc(elem); //create days of week

  var daysArr = makeMonthDays(numMonth); //create days of month

  //add list of dates to calenadar
  makeCalendar(elem, daysArr); //doesn't work

  //check today
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
  console.log(firstDayInWeek + " firstDayInWeek")

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

var makeCalendar = function(elem) {
    var calendarId  = document.getElementById(elem);
    var calendarUl = document.createElement("ul");
    calendarUl.classList.add("calendar");
    calendarId.appendChild(calendarUl);

    console.log(daysArr);

}

//var makeCalendar = document.getElementById(elem);
//   var monthTitle = document.createElement('h3');
//   monthTitle.innerHTML = months[todayMonth-1];
//   makeCalendar.appendChild(monthTitle);

// var newCalendar = function(elem) {
//   var todayDate = new Date();
//   var todayYear = todayDate.getFullYear();
//   var todayMonth = todayDate.getMonth();
//   // var todayMonth = new Date(todayYear, todayMonth-1).getMonth();
//   var todayDay = todayDate.getDate();
//   var todayDayOfWeek = todayDate.getDay();
//
//   var allDaysArr = [];
//
//   for (var i=1; i<32; i++){
//     var getAllDays = new Date(todayYear, todayMonth, i).getDate();
//     if( getAllDays === i ){
//       allDaysArr.push(getAllDays);
//     } else {
//       break;
//     }
//   }
//
//   console.log(allDaysArr);
//
//   var firstWeekDay = new Date(todayYear, todayMonth, 1).getDay();
//
//   //add days in the begining
//   if (firstWeekDay > 1) {
//     for (var i=1; i<firstWeekDay; i++) {
//       var prevMonthDate = new Date(todayYear, todayMonth, 1-i).getDate();
//       allDaysArr.unshift(prevMonthDate);
//     }
//   }
//   if (firstWeekDay = 0) {
//     for (var i=1; i<6; i++) {
//       var prevMonthDate = new Date(todayYear, todayMonth, 1-i).getDate();
//       allDaysArr.unshift(prevMonthDate);
//     }
//   }
//
//   console.log(allDaysArr);
//
//   var moduloOf7 = allDaysArr.length%7;
//   console.log(7-moduloOf7); //2
//
//   if(moduloOf7!=0) {
//     for (var i=1; i<=(7-moduloOf7); i++) {
//       var nextMonthDate = new Date(todayYear, todayMonth+1, i).getDate();
//       allDaysArr.push(nextMonthDate);
//     }
//   }
//
//   console.log(allDaysArr);
//
//   //если получить несущесвующую дату текущего месяца, выведется дата следующего
//   // var days_in_april = 32 - new Date(2013, 3, 32).getDate();
//   // var days_in_april2 = new Date(2013, 3, 32).getDate();
//   // var days_in_april3 = new Date(2013, 3, 32).getMonth();
//   // console.log(todayDay);
//
//   var makeCalendar = document.getElementById(elem);
//   var monthTitle = document.createElement('h3');
//   monthTitle.innerHTML = months[todayMonth-1];
//   makeCalendar.appendChild(monthTitle);
//
//   var makeWeekDays;
//   for (var i=0; i<weekDays.length; i++) {
//     makeWeekDays = document.createElement('li');
//     makeWeekDays.innerHTML = weekDays[i];
//     makeCalendar.appendChild(makeWeekDays);
//     makeWeekDays.classList.add("week");
//   }
//
//   var newLi;
//   for (var i=0; i<allDaysArr.length; i++) {
//       newLi = document.createElement('li');
//       newLi.innerHTML = allDaysArr[i];
//       makeCalendar.appendChild(newLi);
//       newLi.classList.add('day');
//       if(allDaysArr[i]===todayDay) {
//         newLi.classList.add('current-day');
//       }
//   }
//
//
// }

newCalendar("calendar");
