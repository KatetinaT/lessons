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
  var newDate = new Date();
  var idElem = document.getElementById(id); //get element by id
  var currentDate =  new Date(); //get current date
  var currentMonth = currentDate.getMonth(); //get current month
  var currentYear = currentDate.getFullYear(); //get current year
  var calendarUl;

  var btnPrev = idElem.querySelector(".arr-prev");
  var btnNext = idElem.querySelector(".arr-next");

  makeYearTitle(idElem, currentYear); //add title of current month
  makeMonthTitle(idElem, currentMonth); //add title of current month

  createDaysOfWeek(idElem); //create days of week
  createUlCalendar(idElem);

  var daysArr = createDaysOfMonth(currentDate, currentMonth, currentYear); //create days of month
  addWeekends(daysArr); //add options to daysArr

  //add list of dates to calenadar
  makeCalendar(idElem, daysArr);

  //check today
  checkToday(currentMonth);

  var newMonth = currentMonth;
  var newYear = currentYear;

  btnPrev.onclick = function() {
    if (newMonth > 0) {
      newMonth -= 1;
    } else {
      newMonth = 11;
      newYear -= 1;
      makeYearTitle(idElem, newYear);
    }
    makeMonthTitle(idElem, newMonth); //add title of current month
  	newDate = defineNewDate(newMonth, newYear);
    daysArr = createDaysOfMonth(newDate, newMonth, newYear); //create days of month
    addWeekends(daysArr); //add options to daysArr
    makeCalendar(idElem, daysArr); //add list of dates to calenadar
    checkToday(newMonth);
    console.log("prev returns the new date: " + newDate);
  	return newDate;
  }

  btnNext.onclick = function() {
    if (newMonth < 11) {
      newMonth += 1;
    } else {
      newMonth = 0;
      newYear += 1;
      makeYearTitle(idElem, newYear);
    }
    makeMonthTitle(idElem, newMonth); //add title of current month
  	newDate = defineNewDate(newMonth, newYear);
    daysArr = createDaysOfMonth(newDate, newMonth, newYear); //create days of month
    addWeekends(daysArr); //add options to daysArr
    makeCalendar(idElem, daysArr); //add list of dates to calenadar
    checkToday(newMonth);
    console.log("next returns the new date: " + newDate);
  	return newDate;
  }

};

var updateDate = function(month, year, date){
	month -= 1;
	year -= 1;
	date = defineNewDate(month, year);
	return date;
};

var defineNewDate = function(month, year) {
	var date = new Date(year, month, 1);
	return date;
}

//add 19-07
var addWeekends = function(arr) {

	if(arr.length > 0) {
		for(var i = 5; i < arr.length; i += 7) {
			arr[i].attr = "sa";
		}

		for(var i = 6; i < arr.length; i += 7) {
			arr[i].attr = "su";
		}

	}
}; //add 19-07

//add name of month to calendar
var makeYearTitle = function(id, year) {
  var yearTag = id.querySelector(".year");
  yearTag.innerHTML = year;
};

//add name of month to calendar
var makeMonthTitle = function(id, month) {
  var monthTag = id.querySelector(".month");
  monthTag.innerHTML = months[month];
};

//Create Days of Week
var createDaysOfWeek = function(id) {
  var ulWeek = document.createElement('ul');
  id.appendChild(ulWeek);
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
var createUlCalendar = function(id) {
    var calendarUl = document.createElement("ul");
    calendarUl.classList.add("calendar");
    id.appendChild(calendarUl);
}

//Combine array with prev, current and next dates
var createDaysOfMonth = function(currentDate, month, year) {
  var daysInMonth = new Date(year, month+1, 0);
  var lastDateInMonth = daysInMonth.getDate();
  var firstDayInWeek = new Date(year, month, 1).getDay();

  var daysArr = [];
  var fulldate;
  //current
  var getNewDate = function(num) {
	fulldate = new Date(year, month, num);
    daysArr.push({date: num, month:"current", data: new Intl.DateTimeFormat('en-GB').format(fulldate) });
  };
  for (var i = 1; i <= lastDateInMonth; i++) {
    getNewDate(i);
  }

  //prev
  var prevMonthDate = function(num) {
    num = new Date(year, month, 1-num).getDate();
	fulldate = new Date(year, month-1, num);
    daysArr.unshift({date: num, month:"prev", data: new Intl.DateTimeFormat('en-GB').format(fulldate)});
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
        var nextMonthDate = new Date(year, month+1, i).getDate();
		fulldate = new Date(year, month+1, i);
        daysArr.push({date: nextMonthDate, month: "next", data: new Intl.DateTimeFormat('en-GB').format(fulldate)});
      }
    }

  return daysArr;

}

//add numbers to the calendar from array
var makeCalendar = function(id, arr) {
    calendarUl = document.querySelector('.calendar');
    calendarUl.innerHTML = "";
    var newLi;

    for (var i=0; i<arr.length; i++) {
      newLi = document.createElement('li');
      newLi.innerHTML = arr[i].date;
      newLi.classList.add(arr[i].month);
	  if(arr[i].attr) {
		newLi.classList.add(arr[i].attr);
	  }
      newLi.setAttribute("data-date", arr[i].data);
      calendarUl.appendChild(newLi);
    }
}


//check and mark today's date
var checkToday = function(month) {
  var checkDate = new Date();
  var checkMonth = checkDate.getMonth();

  if(checkMonth == month) {
    var getToday = checkDate.getDate();
    var findToday = document.querySelectorAll(".current")[getToday-1];
    findToday.classList.add("today");
  }

};

newCalendar("calendar");
