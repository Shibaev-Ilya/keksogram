const scaleElement = document.querySelector('.js-scale');
const effectsElement = document.querySelector('.js-effects');
const imgElement = document.querySelector('.js-img img');
const scaleInputElement = scaleElement.querySelector('.js-scale-input');
const sliderField = document.querySelector('.js-input-slider');
const inputRangeSlider = sliderField.querySelector('.effect-level__value');
const rangeSlider = sliderField.querySelector('.effect-level__slider');

const scaleStep = 25;
let scaleValue = 100;
let effect = 'none';

noUiSlider.create(rangeSlider, {
  start: [100],
  step: 1,
  range: {
    'min': [0],
    'max': [100]
  }
});

const scaleHandler = (evt) => {

  if (evt.target.classList.contains('js-bigger') && scaleValue < 100) {
    scaleValue += scaleStep;
  }

  if (evt.target.classList.contains('js-smaller') && scaleValue > scaleStep) {
    scaleValue -= scaleStep;
  }

  scaleInputElement.value = `${scaleValue}%`;
  imgElement.style.transform = `scale(${scaleValue / 100})`;
};

const effectsHandler = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    let value = evt.target.value;
    effect = value;
    if (value !== 'none') {
      if (sliderField.classList.contains('hidden')) {
        sliderField.classList.remove('hidden');
      }
    } else {
      sliderField.classList.add('hidden');
    }
    imgElement.removeAttribute('style');
    imgElement.style.transform = `scale(${scaleValue / 100})`;
    rangeSlider.noUiSlider.set('100');

    if (imgElement.classList.length > 0) {
      imgElement.classList.forEach(el => imgElement.classList.remove(el));
    }
    imgElement.classList.add(`effects__preview--${value}`);
  }
};

scaleElement.addEventListener('click', scaleHandler);

effectsElement.addEventListener('click', effectsHandler);

export const resetImageStyles = () => {
  scaleValue = 100;
  effect = 'none';
  imgElement.removeAttribute('style');
  scaleInputElement.value = '100%';
  imgElement.style.transform = 'scale(1)';
  imgElement.classList.forEach(el => imgElement.classList.remove(el));
  rangeSlider.noUiSlider.set('100');
  if (!sliderField.classList.contains('hidden')) {
    sliderField.classList.add('hidden');
  }
};

rangeSlider.noUiSlider.on('update', function (values, handle) {
  const effectDegree = values[handle];
  inputRangeSlider.value = effectDegree;
  switch (effect) {
    case "chrome":
      imgElement.style.filter = `grayscale(${ Math.trunc(effectDegree/10) / 10})`;
      break;
    case "sepia":
      imgElement.style.filter = `sepia(${ Math.trunc(effectDegree/10) / 10})`;
      break;
    case "marvin":
      imgElement.style.filter = `invert(${effectDegree}%`;
      break;
    case "phobos":
      imgElement.style.filter = `blur(${ effectDegree/100 * 3}px)`;
      break;
    case "heat":
      imgElement.style.filter = `brightness(${ effectDegree/100 * 3})`;
      break;
  }
});
