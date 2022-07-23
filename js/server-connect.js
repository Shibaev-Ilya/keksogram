import {setDisableButton} from "./form.js";
import {activateFilter} from "./filter.js";

const SERVER_GET_ADDRESS = 'https://26.javascript.pages.academy/kekstagram/data';
const SERVER_POST_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';

export const getData = (onSuccess, onError) => {
  fetch(SERVER_GET_ADDRESS)
    .then((response) => {
      if (!response.ok) {
        onError();
      } else {
        response.json().then((posts) => {
          onSuccess(posts);
          activateFilter(posts);
        });
      }

    })
    .catch((error) => onError(error));
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_POST_ADDRESS,
    {
      method: 'POST',
      body: body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        //resetForm();
      } else {
        onFail();
      }
      setDisableButton(false);
    })
    .catch(error => console.log('Ошибка:',error));
};
