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

  var btnPrev = idElem.querySelector(".arr-prev");
  var btnNext = idElem.querySelector(".arr-next");

  makeYearTitle(idElem, currentYear); //add title of current month
  makeMonthTitle(idElem, currentMonth); //add title of current month

  createDaysOfWeek(idElem); //create days of week
  var calendarUl = createUlCalendar(idElem);

  var daysArr = createDaysOfMonth(currentDate, currentMonth, currentYear); //create days of month
  addWeekends(daysArr); //add options to daysArr

  //add list of dates to calenadar
  makeCalendar(idElem, daysArr);

  //check today
  checkToday(currentMonth);

  var newMonth = currentMonth;
  var newYear = currentYear;

  //event block
  var eventWrap = addEventWrap(idElem);
  //addEvent(eventWrap, calendarUl);
  checkEvents(calendarUl);
  loadEvents(eventWrap, calendarUl);

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
    checkEvents(calendarUl);
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
    checkEvents(calendarUl);
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
    var ul = document.createElement("ul");
    ul.classList.add("calendar");
    id.appendChild(ul);
    return ul;
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

//add event block
var addEventWrap = function(id) {
  var eventWrap = document.createElement("div");
  eventWrap.classList.add("event-wrapper");
  id.appendChild(eventWrap);
  return eventWrap;
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

//display list of event for the selected date
var loadEvents = function(id, elem) {
  elem.onclick = function() {

    removeActiveLi(elem);
    var target = event.target;
    var targetId;

    if(target.tagName == "LI") {
      target.classList.add('active');
      targetId = target.getAttribute("data-date");
      var eventValueArr = localStorage[targetId];
    };

    var eventTitle = addEventDate(id, targetId);

    if(eventValueArr != undefined) {
      var eventValue = JSON.parse(localStorage.getItem(targetId));

      for (var i = 0; i < eventValue.length; i++) {
        addEvenItem(id, eventValue[i].done, eventValue[i].title, eventValue[i].desc);
        //console.log("Status: " + eventValue[i].done);
        //console.log("Title: " + eventValue[i].title);
        //console.log("Desc: " + eventValue[i].desc);
      };

    };

    addBtn(id, "btn-plus", "+ Add Event");

  };
};

var addEvenItem = function(wrapper, status, title, desc) {
  var itemWrap = document.createElement("div");
  itemWrap.classList.add("event-item");
  wrapper.appendChild(itemWrap);

  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  if(status == 1) {
    checkbox.checked = true;
  }
  itemWrap.appendChild(checkbox);

  var eventInfo = document.createElement("div");
  eventInfo.classList.add("event-info");
  itemWrap.appendChild(eventInfo);

  var eventTitle = document.createElement("h4");
  eventTitle.innerHTML = title;
  eventTitle.classList.add("event-title");
  eventInfo.appendChild(eventTitle);

  var eventDesc = document.createElement("div");
  eventDesc.innerHTML = desc;
  eventDesc.classList.add("event-desc");
  eventInfo.appendChild(eventDesc);
};

var eventArr = function(key) {
  var item1 = {title: "event title", desc: "event desc", done: 1};
  var item2 = {title: "event title new", desc: "event desc new", done: 0};
  var item3 = {title: "event title new last", desc: "event desc new", done: 1};
  var eventObj = [];
  eventObj.push(item1, item2, item3);
  var stringEventObj = JSON.stringify(eventObj);
  localStorage.setItem(key, stringEventObj);
  var returnEvent = JSON.parse(localStorage.getItem(key));
  console.log(returnEvent[1].title);
}
eventArr("15/07/2017");

//add event by click
/*
var addEvent = function(id, elem) {
  elem.onclick = function() {
    hideEventBlock(id);
    removeActiveLi(elem);

    var target = event.target;
    var targetId;

    if(target.tagName == "LI") {
      target.classList.add('active');
      targetId = target.getAttribute("data-date");
    };

    var eventValue = localStorage[targetId];

    var dateHere = targetId;
    var eventTitle = addEventTitle(id, dateHere);
    var delBtn = addBtn(id, "delete", "Delete Event");
    var eventBlock = addEventBlock(id, eventValue);
    var cancelBtn = addBtn(id, "cancel", "Cancel");
    var saveBtn = addBtn(id, "save", "Save");

    saveBtn.onclick = function() {
      eventValue = eventBlock.value;
      if(eventValue) {
        localStorage.setItem(targetId, eventValue);
        hideEventBlock(id);
        target.classList.remove('active');
        target.classList.add('event');
      } else {
        alert("Nothing to Save!");
      }
    }

    cancelBtn.onclick = function() {
      target.classList.remove('active');
      hideEventBlock(id);
    }

    delBtn.onclick = function() {
      if(eventValue || eventBlock.value) {
        if(confirm("Are You shure?")) {
          target.classList.remove('active');
          target.classList.remove('event');
          hideEventBlock(id);
          delete localStorage[targetId];
        };
      };//if

    };//btn

  };//elem
};//func
*/

//check events
var checkEvents = function(elem) {
  var datesList = elem.getElementsByTagName('li');

  for(var key in localStorage) {
    var attr;

    for (var i = 0; i < datesList.length; i++) {
        attr = datesList[i].getAttribute('data-date');
        //console.log("attr " + attr);
        //console.log("key " + key);
        if(attr == key) {
          datesList[i].classList.add('event');
        }
    }

  }
}


var addEventDate = function(id, value) {
  var eventDate = value.split('/');
  var eventDateTitle = new Date(eventDate[2], eventDate[1], eventDate[0]);
  var newTitle = document.createElement("h3");
  newTitle.innerHTML = eventDateTitle;
  id.appendChild(newTitle);
}

var addEventBlock = function(id, eventValue) {
  var newEvent = document.createElement("textarea");
  newEvent.classList.add("event-text");
  newEvent.setAttribute("placeholder", "Start to write here...");
  if(eventValue) newEvent.innerHTML = eventValue;
  id.appendChild(newEvent);
  return newEvent;
}

var addBtn = function(id, value, name) {
  var btn = document.createElement("button");
  btn.setAttribute("name", value);
  btn.classList.add(value);
  btn.innerHTML = name;
  id.appendChild(btn);
  return btn;
}

var hideEventBlock = function(id) {
  id.innerHTML = "";
}

var removeActiveLi = function(id) {
  var elem;
  if(elem = id.querySelector(".active")) {
    elem.classList.remove("active");
  }
}

newCalendar("calendar");



//checkEvents();

//more tasks
/*
1. Save Title and Description of the Event at the localStorage.
2. Save several Events at the same date.
3. Change Status to Done and turn it back.
4. Show Notification for Today.
*/
/*
var obj = {
    item1: {title: "title1", desc: "fdk", stat: 0},
    item2: {title: "title2", desc: "sass", stat: 1},
    item3: {title: "title3", desc: "two33", stat: 0},
};

var serialObj = JSON.stringify(obj); //сериализуем его

localStorage.setItem("myKey", serialObj); //запишем его в хранилище по ключу "myKey"

var returnObj = JSON.parse(localStorage.getItem("myKey"));
console.log(returnObj.item3.desc);
*/

//localStorage.clear();
