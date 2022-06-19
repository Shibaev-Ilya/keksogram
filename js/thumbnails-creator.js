import {createPopup} from "./popup-creator.js";

const template = document.querySelector('#picture').content;


const createThumbnails = (data) => {

  let fragment = document.createDocumentFragment();

  data.forEach((card) => {
    const element = template.querySelector('a').cloneNode(true);
    const img = element.querySelector('.picture__img');
    const commentsAmount = element.querySelector('.picture__comments');
    const likesAmount = element.querySelector('.picture__likes');

    const addPopupHandler = (evt) => {
      evt.preventDefault();
      createPopup(card);
    }

    img.src = card.url;
    commentsAmount.textContent = card.comments.length;
    likesAmount.textContent = card.likes;

    element.addEventListener('click', addPopupHandler);

    fragment.append(element);
  })

  return fragment;
};

export {createThumbnails};
