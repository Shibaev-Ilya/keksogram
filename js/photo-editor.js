const scaleElement = document.querySelector('.js-scale');
const effectsElement = document.querySelector('.js-effects');
const imgElement = document.querySelector('.js-img img');
const scaleInputElement = scaleElement.querySelector('.js-scale-input');

const scaleHandler = (evt) => {

  if (evt.target.classList.contains('js-bigger')) {
    switch (scaleInputElement.value) {
      case '75%' :
        scaleInputElement.value = '100%';
        imgElement.style.transform = 'scale(1)';
        break;
      case '50%' :
        scaleInputElement.value = '75%';
        imgElement.style.transform = 'scale(0.75)';
        break;
      case '25%' :
        scaleInputElement.value = '50%';
        imgElement.style.transform = 'scale(0.5)';
        break;
      default :
        scaleInputElement.value = '100%';
        imgElement.style.transform = 'scale(1)';
    }
  }

  if (evt.target.classList.contains('js-smaller')) {
    switch (scaleInputElement.value) {
      case '100%' :
        scaleInputElement.value = '75%';
        imgElement.style.transform = 'scale(0.75)';
        break;
      case '75%' :
        scaleInputElement.value = '50%';
        imgElement.style.transform = 'scale(0.5)';
        break;
      case '50%' :
        scaleInputElement.value = '25%';
        imgElement.style.transform = 'scale(0.25)';
        break;
      default :
        scaleInputElement.value = '25%';
        imgElement.style.transform = 'scale(0.25)';
    }
  }

};

const effectsHandler = (evt) => {
 if (evt.target.classList.contains('effects__radio')) {
   let value = evt.target.value;
   if (imgElement.classList.length > 0) {
     let classes = `${imgElement.classList}`;
     imgElement.classList.remove(classes);
   }
   imgElement.classList.add(`effects__preview--${value}`);

   console.log(value);
 }
}

scaleElement.addEventListener('click', scaleHandler);

effectsElement.addEventListener('click', effectsHandler);

export const resetImageStyles = () => {
  scaleInputElement.value = '100%';
  imgElement.style.transform = 'scale(1)';
}
