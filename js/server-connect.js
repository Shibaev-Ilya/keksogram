const SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram/data';

export const getData = (onSuccess, onError) => {
  fetch(SERVER_ADDRESS)
    .then((response) => response.json())
    .then((posts) => onSuccess(posts))
    .catch((error) => onError(error));
};
