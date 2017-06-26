var months = [
  "January",
  "February",
  "March",
  "April",
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
  var todayDate = new Date();
  var todayYear = todayDate.getFullYear();
  var todayMonth = todayDate.getMonth();
  // var todayMonth = new Date(todayYear, todayMonth-1).getMonth();
  var todayDay = todayDate.getDate();
  var todayDayOfWeek = todayDate.getDay();

  var allDaysArr = [];

  for (var i=1; i<32; i++){
    var getAllDays = new Date(todayYear, todayMonth, i).getDate();
    if( getAllDays === i ){
      allDaysArr.push(getAllDays);
    } else {
      break;
    }
  }

  console.log(allDaysArr);

  var firstWeekDay = new Date(todayYear, todayMonth, 1).getDay();

  //add days in the begining
  if (firstWeekDay > 1) {
    for (var i=1; i<firstWeekDay; i++) {
      var prevMonthDate = new Date(todayYear, todayMonth, 1-i).getDate();
      allDaysArr.unshift(prevMonthDate);
    }
  }
  if (firstWeekDay = 0) {
    for (var i=1; i<6; i++) {
      var prevMonthDate = new Date(todayYear, todayMonth, 1-i).getDate();
      allDaysArr.unshift(prevMonthDate);
    }
  }

  console.log(allDaysArr);

  var moduloOf7 = allDaysArr.length%7;
  console.log(7-moduloOf7); //2

  if(moduloOf7!=0) {
    for (var i=1; i<=(7-moduloOf7); i++) {
      var nextMonthDate = new Date(todayYear, todayMonth+1, i).getDate();
      allDaysArr.push(nextMonthDate);
    }
  }

  console.log(allDaysArr);

  //если получить несущесвующую дату текущего месяца, выведется дата следующего
  // var days_in_april = 32 - new Date(2013, 3, 32).getDate();
  // var days_in_april2 = new Date(2013, 3, 32).getDate();
  // var days_in_april3 = new Date(2013, 3, 32).getMonth();
  // console.log(todayDay);

  var makeCalendar = document.getElementById(elem);
  var monthTitle = document.createElement('h3');
  monthTitle.innerHTML = months[todayMonth-1];
  makeCalendar.appendChild(monthTitle);

  var makeWeekDays;
  for (var i=0; i<weekDays.length; i++) {
    makeWeekDays = document.createElement('li');
    makeWeekDays.innerHTML = weekDays[i];
    makeCalendar.appendChild(makeWeekDays);
    makeWeekDays.classList.add("week");
  }

  var newLi;
  for (var i=0; i<allDaysArr.length; i++) {
      newLi = document.createElement('li');
      newLi.innerHTML = allDaysArr[i];
      makeCalendar.appendChild(newLi);
      newLi.classList.add('day');
      if(allDaysArr[i]===todayDay) {
        newLi.classList.add('current-day');
      }
  }


}

newCalendar("calendar");
