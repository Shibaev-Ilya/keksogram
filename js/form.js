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
    let regexp =  /^#[a-zA-Zа-яА-яЁё0-9]{1,19}$/;

    //TODO: добавить: один и тот же хэш-тег не может быть использован дважды;
    if (hashtags[0] === '' && hashtags.length === 1) {
      return true;
    }
    if (hashtags.length > 5) {
      return false;
    }
    return hashtags.every(element => regexp.test(element));

  }, "хештег(и) введен(ы) неверно", 2, false);

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
})
