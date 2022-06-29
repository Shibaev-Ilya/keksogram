const popupTemplate = document.querySelector('.big-picture');
const commentsList = popupTemplate.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');

const createPopup = (card) => {

  const cardData = card;
  const postComments = cardData.comments;
  const closeButton = popupTemplate.querySelector('#picture-cancel');
  const buttonShowMore = popupTemplate.querySelector('.comments-loader');
  const showedCommentsCount = popupTemplate.querySelector('.showed-comments-count');
  const commentsPerPage = 5;
  let showedCommentAmount = commentsPerPage;

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
  };
  const renderComments = (commentsToRender, showMore) => {
    let commentsFragment = document.createDocumentFragment();

    commentsToRender.forEach( dataComment => {
      let comment = commentTemplate.cloneNode(true);
      const img = comment.querySelector('.social__picture');
      img.src = dataComment.avatar;
      img.alt = dataComment.name;
      comment.querySelector('.social__text').textContent = dataComment.message;
      commentsFragment.append(comment);
    });
    if (!showMore) {
      commentsList.innerHTML = '';
    }
    commentsList.append(commentsFragment);
  };

  popupTemplate.querySelector('.big-picture__img img').src = cardData.url;
  popupTemplate.querySelector('.likes-count').textContent = cardData.likes;
  popupTemplate.querySelector('.comments-count').textContent = `${cardData.comments.length}`;
  popupTemplate.querySelector('.social__caption').textContent = cardData.description;

  let commentsToRender = postComments.slice(0, commentsPerPage);
  renderComments(commentsToRender);

  const clickShowMore = (evt) => {
    evt.preventDefault();


    commentsToRender = postComments.slice(showedCommentAmount, showedCommentAmount + commentsPerPage);
    showedCommentAmount = showedCommentAmount + commentsPerPage;

    renderComments(commentsToRender, true);

    if (postComments.length <= showedCommentAmount) {
      buttonShowMore.classList.add('hidden');
      showedCommentsCount.textContent = `${commentsToRender.length}`;
    } else {
      buttonShowMore.classList.remove('hidden');
    }
  };

  if (postComments.length <= commentsPerPage) {
    buttonShowMore.classList.add('hidden');
    showedCommentsCount.textContent = `${postComments.length}`;
  }
  else {
    buttonShowMore.classList.remove('hidden');
    buttonShowMore.addEventListener('click', clickShowMore);
    showedCommentsCount.textContent = `${commentsPerPage}`;
  }

  openPopup();
  closeButton.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopupEsc);

};

export {createPopup};
