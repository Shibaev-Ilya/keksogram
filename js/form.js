const mainForm = document.querySelector('#upload-select-image');
const uploadFileInput = document.querySelector('#upload-file');
const editImagePopup = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');

const openEditImagePopup = () => {
  editImagePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
};
const closeEditImagePopup = () => {
  editImagePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeEditImagePopup);
  document.removeEventListener('keydown', closeEditImagePopupEsc);
  mainForm.reset();
};
const closeEditImagePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    if (evt.target.tagName === 'INPUT' || evt.target.tagName === 'TEXTAREA') {
      evt.stopPropagation()
    } else {
      closeEditImagePopup();
    }
  }
};

window.onload = function () {
  // create the pristine instance
  let pristine = new Pristine(mainForm);

  pristine.addValidator(hashtagField, function(value) {
    let hashtags = value.split(' ');
    if (hashtags[0] === '' && hashtags.length === 1) {
      return true;
    }
    let regexp =  /^#/;

    return hashtags.every(element => regexp.test(element));

  }, "хештег должен начинаться с #", 3, true);

  pristine.addValidator(hashtagField, function(value) {
    let hashtags = value.split(' ');
    if (hashtags[0] === '' && hashtags.length === 1) {
      return true;
    }

    return hashtags.every(element => element !== '#');

  }, "хештег не может состоять из одной #", 4, true);

  pristine.addValidator(hashtagField, function(value) {
    let hashtags = value.split(' ');
    let regexp =  /^#[a-zA-Zа-яА-яЁё0-9]{1,19}$|^\s*$/;

    return hashtags.every(element => regexp.test(element));

  }, "хештег должен соответствовать ^#[a-zA-Zа-яА-яЁё0-9]{1,19}$", 3, true);

  pristine.addValidator(hashtagField, (value) => {
    const result = value.toLowerCase().split(' ');
    const arr = [];
    for (let i = 0; i < result.length; i++) {
      if (arr.includes(result[i])) {
        return false;
      }
      arr.push(result[i]);
    }
    return true;
  }, 'Хештеги не должны повторяться', 4, true);

  pristine.addValidator(hashtagField, (value) => {
    const hashtags = value.split(' ');
    if (hashtags[0] === '' && hashtags.length === 1) {
      return true;
    }
    return hashtags.length <= 5;

  }, 'Максимум 5 хештегов', 4, true);

  mainForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // check if the form is valid
    let valid = pristine.validate();
    if (valid) {
      mainForm.submit();
    }
  });
};

uploadFileInput.addEventListener('change', () => {
  openEditImagePopup();
  document.addEventListener('keydown', closeEditImagePopupEsc);
  closeButton.addEventListener('click', closeEditImagePopup);
});
