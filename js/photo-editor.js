const scaleElement = document.querySelector('.js-scale');
const effectsElement = document.querySelector('.js-effects');
const imgElement = document.querySelector('.js-img img');
const scaleInputElement = scaleElement.querySelector('.js-scale-input');

const scaleStep = 25;
let scaleValue = 100

const scaleHandler = (evt) => {

  if (evt.target.classList.contains('js-bigger') && scaleValue < 100) {
    scaleValue += scaleStep;
  }

  if (evt.target.classList.contains('js-smaller') && scaleValue > scaleStep) {
    scaleValue -= scaleStep;
  }

  scaleInputElement.value = `${scaleValue}%`;
  imgElement.style.transform = `scale(${scaleValue/100})`;
};

const effectsHandler = (evt) => {
 if (evt.target.classList.contains('effects__radio')) {
   let value = evt.target.value;
   if (imgElement.classList.length > 0) {
     imgElement.classList.forEach(el => imgElement.classList.remove(el));
   }
   imgElement.classList.add(`effects__preview--${value}`);
 }
}

scaleElement.addEventListener('click', scaleHandler);

effectsElement.addEventListener('click', effectsHandler);

export const resetImageStyles = () => {
  scaleInputElement.value = '100%';
  imgElement.style.transform = 'scale(1)';

  imgElement.classList.forEach(el => imgElement.classList.remove(el));
}
