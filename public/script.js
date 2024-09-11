document.addEventListener("DOMContentLoaded", function () {
  // Handle button activation
  let buttons = document.querySelectorAll(".time-btn button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");

      // Get the selected time
      const selectedTime = this.textContent;
      document.getElementById("selected-time-display").textContent =
        selectedTime;
    });
  });

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
