import {sendData} from "./server-connect.js";
import {resetImageStyles} from "./photo-editor.js";

const mainForm = document.querySelector('#upload-select-image');
const editImagePopup = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const hashTagField = document.querySelector('.text__hashtags');
const uploadButton = document.querySelector('#upload-submit');
const errorMessageTemplate = document.querySelector('#error').content;
const successMessageTemplate = document.querySelector('#success').content;
const uploadFileInput = document.querySelector('#upload-file');
const imgElement = document.querySelector('.js-img img');
export let messageWindow = false;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const openEditImagePopup = () => {
  editImagePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
};
const closeEditImagePopup = () => {
  editImagePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeEditImagePopup);
  document.removeEventListener('keydown', closeEditImagePopupEsc);
  resetImageStyles();
  mainForm.reset();
};
const closeEditImagePopupEsc = (evt) => {
  if (evt.key === 'Escape' && !messageWindow) {
    if (evt.target.tagName === 'INPUT' || evt.target.tagName === 'TEXTAREA') {
      evt.stopPropagation()
    } else {
      closeEditImagePopup();
    }
  }
};

const closeMessage = (evt) => {
  if (evt.key === 'Escape') {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', closeMessage);
    messageWindow = false;
  }
};
const closeSuccessMessage = (evt) => {
  if (evt.key === 'Escape') {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', closeMessage);
    messageWindow = false;
  }
};

const onSuccess = () => {
  resetImageStyles();
  const template = successMessageTemplate.querySelector('.success').cloneNode(true);
  template.querySelector('.success__button').addEventListener('click', () => {
    template.remove();
    messageWindow = false;
  });
  document.body.append(template);
  messageWindow = true;
  document.addEventListener('keydown', closeSuccessMessage);
  closeEditImagePopup();
};

const onFail = () => {
  const template = errorMessageTemplate.querySelector('.error').cloneNode(true);
  template.querySelector('.error__button').addEventListener('click', () => {
    template.remove();
    messageWindow = false;
  });
  template.querySelector('.error__button').textContent = '??????????????????';
  template.querySelector('.error__title').textContent = "???????????? ?????? ???????????????????? ????????";
  document.body.append(template);
  messageWindow = true;
  document.addEventListener('keydown', closeMessage);
};

export const setDisableButton = (switcher) => {
  uploadButton.disabled = switcher;
};

// ?????????????????? ?? ????????????????
window.onload = function () {

  let pristine = new Pristine(mainForm);

  pristine.addValidator(hashTagField, function(value) {
    let hashtags = value.split(' ');
    if (hashtags[0] === '' && hashtags.length === 1) {
      return true;
    }
    let regexp =  /^#/;

    return hashtags.every(element => regexp.test(element));

  }, "???????????? ???????????? ???????????????????? ?? #", 3, true);

  pristine.addValidator(hashTagField, function(value) {
    let hashtags = value.split(' ');
    if (hashtags[0] === '' && hashtags.length === 1) {
      return true;
    }

    return hashtags.every(element => element !== '#');

  }, "???????????? ???? ?????????? ???????????????? ???? ?????????? #", 4, true);

  pristine.addValidator(hashTagField, function(value) {
    let hashtags = value.split(' ');
    let regexp =  /^#[a-zA-Z??-????-??????0-9]{1,19}$|^\s*$/;

    return hashtags.every(element => regexp.test(element));

  }, "???????????? ???????????? ?????????????????????????????? ^#[a-zA-Z??-????-??????0-9]{1,19}$", 3, true);

  pristine.addValidator(hashTagField, (value) => {
    const result = value.toLowerCase().split(' ');
    const arr = [];
    for (let i = 0; i < result.length; i++) {
      if (arr.includes(result[i])) {
        return false;
      }
      arr.push(result[i]);
    }
    return true;
  }, '?????????????? ???? ???????????? ??????????????????????', 4, true);

  pristine.addValidator(hashTagField, (value) => {
    const hashTags = value.split(' ');
    if (hashTags[0] === '' && hashTags.length === 1) {
      return true;
    }
    return hashTags.length <= 5;

  }, '???????????????? 5 ????????????????', 4, true);

  mainForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = pristine.validate();
    if (valid) {
      setDisableButton(true);
      sendData(onSuccess, onFail, new FormData(e.target));
    }
  });
};

const showUploadImage = (fileInput, imgTag) => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    imgTag.src = URL.createObjectURL(file);
  }
}

uploadFileInput.addEventListener('change', () => {
  showUploadImage(uploadFileInput, imgElement);
  openEditImagePopup();
  document.addEventListener('keydown', closeEditImagePopupEsc);
  closeButton.addEventListener('click', closeEditImagePopup);
});
