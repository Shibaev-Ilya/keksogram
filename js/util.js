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

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}


export {getRandomIntInclusive, getRandom, checkLength, errorMessage, debounce, throttle};
