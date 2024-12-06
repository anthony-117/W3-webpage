const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let events = JSON.parse(localStorage.getItem("events")) || [];
function saveEventsToLocalStorage() {
  localStorage.setItem("events", JSON.stringify(events));
}
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const icon = document.querySelector("#theme-toggle i");
  if (icon.classList.contains("bx-sun")) {
    icon.classList.replace("bx-sun", "bx-moon");
  } else {
    icon.classList.replace("bx-moon", "bx-sun");
  }
}

function setCurrentMonth() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const now = new Date();
  const monthYear = `${months[now.getMonth()]} ${now.getFullYear()}`;
  document.querySelector(".current-month").innerText = monthYear;
}

function createCalendar() {
  const calendarHeader = document.getElementById("calendar-header");
  const calendarBody = document.getElementById("calendar-body");

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - startDate.getDay());

  calendarHeader.innerHTML = '<div class="time" style="width: 52px;"> </div>';
  days.forEach((day, index) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + index);
    const dayNumber = currentDate.getDate();
    calendarHeader.innerHTML += `<div class="header">${day} ${dayNumber}</div>`;
  });

  for (let hour = 0; hour < 24; hour++) {
    const timeString =
      hour < 12 ? `${hour === 0 ? 12 : hour} AM` : `${hour === 12 ? 12 : hour - 12} PM`;

    calendarBody.innerHTML +=
      hour !== 0
        ? `<div class="time">${timeString}</div>`
        : `<div class="time"> </div>`;
    for (let day = 0; day < 7; day++) {
      calendarBody.innerHTML += `<div class="day-column" id="day${day}-hour${hour}"></div>`;
    }
  }
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function calculateEventStyle(startTime, endTime) {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const top = ((startMinutes % 60) / 60) * 61;
  const height = ((endMinutes - startMinutes) / 60) * 61;
  return `top: ${top}px; height: ${height}px; z-index: 10;`;
}

function addEventToUI(event) {
  event.days.forEach((day) => {
    const startHour = parseInt(event.startTime.split(":")[0]);
    const cell = document.getElementById(`day${day}-hour${startHour}`);
    if (cell) {
      const eventDiv = document.createElement("div");
      eventDiv.className = "event";
      eventDiv.innerHTML = `${event.name}<br>${event.startTime} - ${event.endTime}`;
      eventDiv.style.cssText = calculateEventStyle(event.startTime, event.endTime);
      cell.appendChild(eventDiv);
    }
  });
}

function loadEvents() {
  events.forEach(addEventToUI);
}

function setActiveDay() {
  const today = new Date().getDay();
  const activeDay = document.querySelector(`#calendar-header > div:nth-child(${today + 2})`);
  if (activeDay) activeDay.classList.add("active-day");
}

function showAddEventForm() {
  document.getElementById("add-event-form").style.display = "block";
}

function hideAddEventForm() {
  document.getElementById("add-event-form").style.display = "none";
}

document.getElementById("cancel-add-event").addEventListener("click", hideAddEventForm);

document.getElementById("add-event-form").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const newEvent = {
    name: document.getElementById("event-name").value,
    days: Array.from(
      document.querySelectorAll('input[name="event-days[]"]:checked')
    ).map((cb) => parseInt(cb.value)),
    startTime: document.getElementById("event-start").value,
    endTime: document.getElementById("event-end").value,
    location: document.getElementById("event-location").value,
  };
  console.log(newEvent)

  events.push(newEvent);
  saveEventsToLocalStorage();
  addEventToUI(newEvent);
  this.reset();
  hideAddEventForm();
});

function setThemeBasedOnBrowserPreference() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.body.classList.add("dark-theme");
    document
      .querySelector("#theme-toggle i")
      .classList.replace("bx-sun", "bx-moon");
  }
}

function addEvent(event) {
  event.days.forEach((day) => {
    const startHour = parseInt(event.startTime.split(":")[0]);
    const cell = document.getElementById(`day${day}-hour${startHour}`);
    if (cell) {
      const eventDiv = document.createElement("div");
      eventDiv.className = "event";
      eventDiv.innerHTML = `${event.name}<br>${event.startTime} - ${event.endTime}`;
      eventDiv.style.cssText = calculateEventStyle(
        event.startTime,
        event.endTime
      );
      cell.appendChild(eventDiv);
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {

  setThemeBasedOnBrowserPreference();
  setCurrentMonth();
  createCalendar();
  loadEvents();
  setActiveDay();

  document.getElementById("add-event-btn").addEventListener("click", showAddEventForm);

  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
});
