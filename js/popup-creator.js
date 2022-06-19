const popupTemplate = document.querySelector('.big-picture');
const commentsList = popupTemplate.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');

const createPopup = (card) => {

  const cardData = card;
  const closeButton = popupTemplate.querySelector('#picture-cancel');

  const openPopup = () => {
    popupTemplate.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };
  const closePopup = () => {
    popupTemplate.classList.add('hidden');
    document.body.classList.remove('modal-open');
    closeButton.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', closePopupEsc)
  };
  const closePopupEsc = (evt) => {
      if (evt.key === 'Escape') {
        closePopup();
      }
  }

  popupTemplate.querySelector('.big-picture__img img').src = cardData.url;
  popupTemplate.querySelector('.likes-count').textContent = cardData.likes;
  popupTemplate.querySelector('.comments-count').textContent = cardData.comments.length;
  popupTemplate.querySelector('.social__caption').textContent = cardData.description;

  let commentsFragment = document.createDocumentFragment();
  cardData.comments.forEach( dataComment => {
    let comment = commentTemplate.cloneNode(true);
    const img = comment.querySelector('.social__picture');
    img.src = dataComment.avatar;
    img.alt = dataComment.name;
    comment.querySelector('.social__text').textContent = dataComment.message;
    commentsFragment.append(comment);
  });
  commentsList.innerHTML = '';
  commentsList.append(commentsFragment);

  openPopup();
  closeButton.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopupEsc);

  popupTemplate.querySelector('.social__comment-count').classList.add('hidden');
  popupTemplate.querySelector('.comments-loader').classList.add('hidden');

};

export {createPopup};
