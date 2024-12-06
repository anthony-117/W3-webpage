if (!localStorage.getItem("schedules")) {
  localStorage.setItem(
    "schedules",
    JSON.stringify({
      "fall-semester": [
        {
          name: "GEN350",
          days: [1, 5],
          startTime: "11:00",
          endTime: "12:15",
          location: "H006",
        },
        {
          name: "ECO350",
          days: [1, 5],
          startTime: "09:30",
          endTime: "10:45",
          location: "D306",
        },
        {
          name: "GEL313",
          days: [2, 4],
          startTime: "09:30",
          endTime: "10:45",
          location: "H004",
        },
        {
          name: "GIN321",
          days: [2, 4],
          startTime: "15:30",
          endTime: "16:45",
          location: "H004",
        },
        {
          name: "GIN446",
          days: [2, 4],
          startTime: "17:00",
          endTime: "18:15",
          location: "H104",
        },
        {
          name: "GEL445",
          days: [5],
          startTime: "12:30",
          endTime: "15:15",
          location: "H005",
        },
      ],
      "spring-semester": [
        {
          name: "GEL420",
          days: [2, 4],
          startTime: "09:30",
          endTime: "10:45",
          location: "",
        },
        {
          name: "GIN421",
          days: [1, 5],
          startTime: "11:00",
          endTime: "12:15",
          location: "",
        },
        {
          name: "GERE210",
          days: [2, 4],
          startTime: "11:00",
          endTime: "12:15",
          location: "",
        },
        {
          name: "GIN425",
          days: [2, 4],
          startTime: "14:00",
          endTime: "15:15",
          location: "",
        },
        {
          name: "GIN450",
          days: [3],
          startTime: "11:00",
          endTime: "13:30",
          location: "",
        },
        {
          name: "GEL474",
          days: [3],
          startTime: "14:10",
          endTime: "15:50",
          location: "",
        },
        {
          name: "GEL521",
          days: [3],
          startTime: "17:00",
          endTime: "19:10",
          location: "",
        },
      ],
    })
  );
}

const schedules = JSON.parse(localStorage.getItem("schedules")) || [];

const saveSchedules = (schedules) =>
  localStorage.setItem("schedules", JSON.stringify(schedules));

const scheduleSelect = document.getElementById("schedule-select");
const addScheduleBtn = document.getElementById("add-schedule-btn");
const deleteScheduleBtn = document.getElementById("delete-schedule-btn");
const addEventForm = document.getElementById("add-event-form");
const addEventBtn = document.getElementById("add-event-btn");
const cancelAddEvent = document.getElementById("cancel-add-event");
const calendarBody = document.getElementById("calendar-body");
const messages = document.getElementById("messages");
const themeToggle = document.getElementById("theme-toggle");

function showMessage(type, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;
  messages.appendChild(messageDiv);

  setTimeout(() => messageDiv.remove(), 3000);
}

function loadScheduleOptions() {
  scheduleSelect.innerHTML = "";
  Object.keys(schedules).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    scheduleSelect.appendChild(option);
  });

  if (Object.keys(schedules).length === 0) {
    showMessage(
      "info",
      "No schedules available. Add a new schedule to get started."
    );
  } else {
    let selectedSchedule = scheduleSelect.value;
    renderSchedule(selectedSchedule);
  }
}

function addEventToUI(event, scheduleKey, eventIndex) {
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

      eventDiv.dataset.scheduleName = scheduleKey;
      eventDiv.dataset.eventIndex = eventIndex;

      eventDiv.addEventListener("dblclick", function () {
        const scheduleName = this.dataset.scheduleName;
        const eventIndex = this.dataset.eventIndex;

        if (schedules[scheduleName]) {
          schedules[scheduleName].splice(eventIndex, 1);
          saveSchedules(schedules);

          renderSchedule(scheduleName);

          showMessage(
            "success",
            `Event "${event.name}" deleted from schedule "${scheduleName}".`
          );
        }
      });

      cell.appendChild(eventDiv);
    }
  });
}

function renderSchedule(scheduleName) {
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const cell = document.getElementById(`day${day}-hour${hour}`);
      cell.innerHTML = "";
    }
  }

  if (schedules[scheduleName]) {
    schedules[scheduleName].forEach((event, index) => {
      addEventToUI(event, scheduleName, index);
    });
  }
  scroll;
}
addScheduleBtn.addEventListener("click", () => {
  const scheduleName = prompt("Enter schedule name:");
  if (scheduleName) {
    if (!schedules[scheduleName]) {
      schedules[scheduleName] = [];
      saveSchedules(schedules);
      loadScheduleOptions();
      showMessage("success", `Schedule "${scheduleName}" added successfully.`);
    } else {
      showMessage("error", "Schedule already exists!");
    }
  }
});

deleteScheduleBtn.addEventListener("click", () => {
  const selectedSchedule = scheduleSelect.value;
  if (selectedSchedule) {
    delete schedules[selectedSchedule];
    saveSchedules(schedules);
    loadScheduleOptions();
    showMessage(
      "success",
      `Schedule "${selectedSchedule}" deleted successfully.`
    );
  } else {
    showMessage("error", "No schedule selected!");
  }
});

scheduleSelect.addEventListener("change", () => {
  const selectedSchedule = scheduleSelect.value;
  renderSchedule(selectedSchedule);
});

addEventBtn.addEventListener(
  "click",
  () => (addEventForm.style.display = "block")
);
cancelAddEvent.addEventListener("click", () => {
  addEventForm.reset();
  addEventForm.style.display = "none";
});

// themeToggle.addEventListener("click", () => {
//   document.body.classList.toggle("dark-theme");
//   themeToggle.querySelector("i").classList.toggle("bx-sun");
//   themeToggle.querySelector("i").classList.toggle("bx-moon");
// });

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let events = JSON.parse(localStorage.getItem("events")) || [];
function saveEventsToLocalStorage() {
  localStorage.setItem("events", JSON.stringify(events));
}

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
    currentDate.setDate(startDate.getDate() + index);
    const dayNumber = currentDate.getDate();
    calendarHeader.innerHTML += `<div class="header">${day} ${dayNumber}</div>`;
  });

  for (let hour = 0; hour < 24; hour++) {
    const timeString =
      hour < 12
        ? `${hour === 0 ? 12 : hour} AM`
        : `${hour === 12 ? 12 : hour - 12} PM`;

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

function loadEvents() {
  events.forEach(addEventToUI);
}

function setActiveDay() {
  const today = new Date().getDay();
  const activeDay = document.querySelector(
    `#calendar-header > div:nth-child(${today + 2})`
  );
  if (activeDay) activeDay.classList.add("active-day");
}

function showAddEventForm() {
  document.getElementById("add-event-form").style.display = "block";
}

function hideAddEventForm() {
  document.getElementById("add-event-form").style.display = "none";
}

document
  .getElementById("cancel-add-event")
  .addEventListener("click", hideAddEventForm);

addEventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedSchedule = scheduleSelect.value;

  if (!selectedSchedule) {
    showMessage("error", "Please select a schedule first.");
    return;
  }

  const eventName = document.getElementById("event-name").value;
  const eventDays = Array.from(
    document.querySelectorAll('input[name="event-days[]"]:checked')
  ).map((input) => parseInt(input.value));
  const eventStart = document.getElementById("event-start").value;
  const eventEnd = document.getElementById("event-end").value;
  const eventLocation = document.getElementById("event-location").value;

  if (eventDays.length === 0) {
    showMessage("error", "Please select at least one day for the event.");
    return;
  }

  const newEvent = {
    name: eventName,
    days: eventDays,
    startTime: eventStart,
    endTime: eventEnd,
    location: eventLocation,
  };

  if (!schedules[selectedSchedule]) {
    schedules[selectedSchedule] = [];
  }

  schedules[selectedSchedule].push(newEvent);

  saveSchedules(schedules);

  addEventToUI(newEvent);

  addEventForm.reset();
  addEventForm.style.display = "none";

  showMessage(
    "success",
    `Event "${eventName}" added to schedule "${selectedSchedule}".`
  );
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

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const icon = document.querySelector("#theme-toggle i");
  if (icon.classList.contains("bx-sun")) {
    icon.classList.replace("bx-sun", "bx-moon");
  } else {
    icon.classList.replace("bx-moon", "bx-sun");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  setThemeBasedOnBrowserPreference();
  setCurrentMonth();
  createCalendar();
  loadEvents();
  setActiveDay();

  loadScheduleOptions();
  if (!scheduleSelect.value) {
    showMessage(
      "info",
      "No schedules available. Add a new schedule to get started."
    );
  }
  showMessage("info", "double click on event to delete");
  document
    .getElementById("add-event-btn")
    .addEventListener("click", showAddEventForm);
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
});
