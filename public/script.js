document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.querySelectorAll(".time-btn button");
  let openingTime = null;
  let closingTime = null;

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Handle the first selection as the opening time and the second as closing
      if (!openingTime) {
        openingTime = this.textContent;
        console.log(openingTime);

        this.classList.add("selected-opening");
        document.getElementById("selected-time-display").textContent =
          openingTime;
      } else if (!closingTime && this.textContent !== openingTime) {
        closingTime = this.textContent;
        console.log(closingTime);

        this.classList.add("selected-closing");
        document.getElementById("selected-time-display").textContent +=
          " - " + closingTime;

        // Calculate the time difference
        const duration = calculateTimeDifference(openingTime, closingTime);
        document.getElementById("time-difference-display").textContent =
          duration + " Hours Meeting";
      } else {
        // Reset if the user tries to select a different opening time or reset closing time
        resetSelection();
      }
    });
  });

  // Function to calculate time difference
  function calculateTimeDifference(start, end) {
    const startTime = parseTime(start);
    const endTime = parseTime(end);

    let duration = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours

    if (duration < 0) {
      duration += 24; // Adjust for overnight times
    }

    return duration;
  }

  // Helper function to parse the time strings
  function parseTime(timeString) {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    // Convert the time to a date object, keeping the current date.
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date;
  }

  // Function to reset selection
  function resetSelection() {
    openingTime = null;
    closingTime = null;
    buttons.forEach(function (btn) {
      btn.classList.remove("selected-opening", "selected-closing");
    });
    document.getElementById("selected-time-display").textContent = "";
    document.getElementById("time-difference-display").textContent = "";
  }

  // Handle tab navigation
  const tabs = document.querySelectorAll(".tab-btn");
  const all_content = document.querySelectorAll(".tab-content");
  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      tabs.forEach((tab) => tab.classList.remove("active"));
      tab.classList.add("active");
      all_content.forEach((content) => content.classList.remove("active"));
      all_content[index].classList.add("active");
    });
  });

  // Calendar functionality
  const calendarDays = document.getElementById("calendar-days");
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  let date = new Date();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  function renderCalendar() {
    date.setDate(1);
    const firstDayIndex = date.getDay() - 1;
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const nextDays = 7 - new Date(currentYear, currentMonth + 1, 0).getDay();

    month.innerHTML = `${months[currentMonth]}`;
    year.innerHTML = `${currentYear}`;
    let days = "";

    // Previous month's days
    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    // Current month's days
    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
      ) {
        days += `<div class="today">${i}</div>`;
      } else {
        days += `<div class="calendar-day">${i}</div>`;
      }
    }

    // Next month's days
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
    }

    calendarDays.innerHTML = days;

    // Add event listener to each day
    const calendarDayElements = document.querySelectorAll(
      ".calendar-day, .today"
    );
    calendarDayElements.forEach((day) => {
      day.addEventListener("click", function () {
        // Remove previous selection
        calendarDayElements.forEach((day) => day.classList.remove("selected"));
        // Add selected class to clicked day
        day.classList.add("selected");

        // Get the selected day
        const selectedDate = new Date(
          currentYear,
          currentMonth,
          day.textContent
        );
        const selectedDayOfWeek = daysOfWeek[selectedDate.getDay()];
        const formattedSelectedDate = `${selectedDayOfWeek}, ${months[currentMonth]} ${day.textContent}, ${currentYear}`;

        // Render the selected date
        document.getElementById("selected-date-display").textContent =
          formattedSelectedDate;
        document.getElementById("picked-date").textContent = day.textContent;
        document.getElementById("picked-month").textContent =
          months[currentMonth];
        document.getElementById("picked-day").textContent = selectedDayOfWeek;
      });
    });

    // Display the current date when the calendar is first rendered
    if (!document.querySelector(".selected")) {
      const today = new Date();
      const currentDayOfWeek = daysOfWeek[today.getDay()];
      const formattedToday = `${currentDayOfWeek}, ${
        months[today.getMonth()]
      } ${today.getDate()}, ${today.getFullYear()}`;
      document.getElementById("selected-date-display").textContent =
        formattedToday;

      document.getElementById("picked-date").textContent = today.getDate();
      document.getElementById("picked-month").textContent =
        months[today.getMonth()];
      document.getElementById("picked-day").textContent = currentDayOfWeek;
    }
  }

  prevButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    date.setMonth(currentMonth);
    date.setFullYear(currentYear);
    renderCalendar();
  });

  nextButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    date.setMonth(currentMonth);
    date.setFullYear(currentYear);
    renderCalendar();
  });

  renderCalendar();
});
