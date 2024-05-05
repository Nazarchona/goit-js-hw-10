import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.getElementById("startButton"); // Оголошуємо startButton тут

let countdownInterval;

// Функція для перевірки чи обрана дата в майбутньому
function isFutureDate(date) {
  return date > new Date();
}

// Функція для запуску таймера
function startTimer(endDate) {
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
      });
      datetimePicker.disabled = false;
      startButton.disabled = false;
    } else {
      updateTimerDisplay(distance);
    }
  }, 1000);
}

// Функція для оновлення відображення таймера
function updateTimerDisplay(distance) {
  const { days, hours, minutes, seconds } = convertMs(distance);
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}

// Функція для форматування чисел менше двох символів
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Функція для конвертації мілісекунд у дні, години, хвилини і секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Обробник події кліку на кнопку "Start"
startButton.addEventListener("click", () => {
  const endDate = new Date(datetimePicker.value).getTime();
  datetimePicker.disabled = true;
  startButton.disabled = true;
  startTimer(endDate);
});

// Обробник події закриття елемента flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    if (!isFutureDate(userSelectedDate)) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

