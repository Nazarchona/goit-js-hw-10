// Імпорт бібліотеки iziToast та стилів
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Функція для створення промісу згідно з обраним станом та значенням затримки
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    if (state === "fulfilled") {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === "rejected") {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });
}

// Обробник події сабміту форми
document.querySelector(".form").addEventListener("submit", function (event) {
  event.preventDefault(); // Зупинити стандартну поведінку форми

  // Отримати значення затримки та стану
  const delay = parseInt(this.elements.delay.value);
  const state = this.elements.state.value;

  // Створити проміс
  const promise = createPromise(delay, state);

  // Обробка промісу
  promise
    .then((delay) => {
      // Вивести повідомлення про вдале виконання промісу
      iziToast.success({
        title: "Fulfilled promise",
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
    })
    .catch((delay) => {
      // Вивести повідомлення про відхилення промісу
      iziToast.error({
        title: "Rejected promise",
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });
    });
});
