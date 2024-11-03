const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const events = [
  {
    name: "ECO350",
    days: [1, 5],
    startTime: "09:30",
    endTime: "10:45",
    location: "",
  },
  {
    name: "GEL313",
    days: [2, 4],
    startTime: "09:30",
    endTime: "10:45",
    location: "",
  },
  {
    name: "GEN350",
    days: [1, 5],
    startTime: "11:00",
    endTime: "12:15",
    location: "",
  },
  {
    name: "GIN321",
    days: [2, 4],
    startTime: "15:30",
    endTime: "16:45",
    location: "",
  },
  {
    name: "GIN446",
    days: [2, 4],
    startTime: "17:00",
    endTime: "18:15",
    location: "",
  },
  {
    name: "GEL445",
    days: [5],
    startTime: "12:30",
    endTime: "15:15",
    location: "",
  },
];

function setCurrentMonth() {
  const months = [
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
    "December",
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
    currentDate.setDate(startDate.getDate() + index); // Increment the date for each day
    const dayNumber = currentDate.getDate(); // Get the day of the month
    calendarHeader.innerHTML += `<div class="header">${day} ${dayNumber}</div>`;
  });

  for (let hour = 0; hour < 24; hour++) {
    const timeString =
      hour < 12
        ? `${hour === 0 ? 12 : hour} AM`
        : `${hour === 12 ? 12 : hour - 12} PM`;

    calendarBody.innerHTML +=
      hour != 0
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
  const top = ((startMinutes % 60) / 60) * 61; // 61px to account for borders
  const height = ((endMinutes - startMinutes) / 60) * 61;
  return `top: ${top}px; height: ${height}px; z-index: 10;`;
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

function setActiveDay() {
  const today = new Date().getDay();
  const activeDay = document.querySelector(
    `#calendar-header > div:nth-child(${today + 2})`
  );
  if (activeDay) activeDay.classList.add("active-day");
}

function showCurrentTime() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const currentTimeDiv = document.createElement("div");
  currentTimeDiv.className = "current-time";
  currentTimeDiv.style.top = `${(minutes / 60) * 61}px`; // 61px to account for borders
  document
    .getElementById(`day${now.getDay()}-hour${0}`)
    .appendChild(currentTimeDiv);

  // document.querySelector(".day-column").appendChild(currentTimeDiv);
  return minutes;
}

function scrollToCurrentTime(minutes) {
  const calendarContainer = document.querySelector(".calendar-container");
  const scrollPosition = (minutes / 60) * 61 - window.innerHeight / 2;
  calendarContainer.scrollTop = Math.max(0, scrollPosition);
}

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

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const icon = document.querySelector("#theme-toggle i");
  if (icon.classList.contains("bx-sun")) {
    icon.classList.replace("bx-sun", "bx-moon");
  } else {
    icon.classList.replace("bx-moon", "bx-sun");
  }
}
function addNewEvent(event) {
  events.push(event);
  addEvent(event);
}

function showAddEventForm() {
  const form = document.createElement("form");
  form.id = "add-event-form";
  form.innerHTML = `
    <h2>Add New Event</h2>
    <label for="event-name">Event Name:</label>
    <input type="text" id="event-name" required>
    <fieldset>
      <legend>Days:</legend>
      ${days
        .map(
          (day, index) => `
        <label>
          <input type="checkbox" name="event-days" value="${index}">
          ${day}
        </label>
      `
        )
        .join("")}
    </fieldset>
    <label for="event-start">Start Time:</label>
    <input type="time" id="event-start" required>
    <label for="event-end">End Time:</label>
    <input type="time" id="event-end" required>
    <label for="event-location">Location:</label>
    <input type="text" id="event-location">
    <div class="form-buttons">
    <button type="button" id="cancel-add-event">Cancel</button>
    <button type="submit">Add Event</button>
    </div>
  `;

  document.body.appendChild(form);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const newEvent = {
      name: document.getElementById("event-name").value,
      days: Array.from(
        document.querySelectorAll('input[name="event-days"]:checked')
      ).map((cb) => parseInt(cb.value)),
      startTime: document.getElementById("event-start").value,
      endTime: document.getElementById("event-end").value,
      location: document.getElementById("event-location").value,
    };
    addNewEvent(newEvent);
    document.body.removeChild(form);
  });

  document
    .getElementById("cancel-add-event")
    .addEventListener("click", function () {
      document.body.removeChild(form);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  setThemeBasedOnBrowserPreference();
  setCurrentMonth();
  createCalendar();
  events.forEach(addEvent);
  setActiveDay();
  const currentMinutes = showCurrentTime();
  scrollToCurrentTime(currentMinutes);

  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);

  document
    .getElementById("add-event-btn")
    .addEventListener("click", showAddEventForm);
});
