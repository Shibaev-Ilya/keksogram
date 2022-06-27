// developer.mozilla.org
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomIntInclusive(a, b) {
  if(a < 0){
    throw new Error('Диапазон может быть только положительный, включая ноль');
  }
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для проверки максимальной длины строки.
function checkLength(string, maxlength) {
  return string.length < maxlength;
}

checkLength('new string', 4);

// Ф-я получения индекса элемента:
function getRandom (elementIndex) {
  return elementIndex[getRandomIntInclusive(0, elementIndex.length - 1)];
}

const errorMessage = () => {
  const message = document.createElement('DIV');
  message.style.backgroundColor = 'red';
  message.style.position = 'fixed';
  message.style.top = '0';
  message.style.padding = '0 20px';
  message.insertAdjacentHTML('beforeend', '<p>Произошла ошибка, обновите страницу</p>');
  document.body.append(message);
  function removeMessage() {
    message.remove();
  }
  window.setTimeout(removeMessage, 3000);
};

export {getRandomIntInclusive, getRandom, checkLength, errorMessage};
