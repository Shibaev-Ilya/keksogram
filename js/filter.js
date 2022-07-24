import {getRandomIntInclusive} from "./util.js";
import {createThumbnails} from "./thumbnails-creator.js";

const filters = document.querySelector('.img-filters');

const filterType = {
  'DEFAULT': 'filter-default',
  'RANDOM': 'filter-random',
  'DISCUSSED': 'filter-discussed',
}

let posts = [];

const getRandomTen = (data) => {
  let newArr = new Set();
  for (let i = 0; newArr.size < 10; i++) {
    newArr.add(data[getRandomIntInclusive(0, data.length - 1)]);
  }
 return Array.from(newArr);
}

const checkClass = (currentButton) => {
  filters.querySelectorAll('.img-filters__button').forEach(el => {
    if (el.classList.contains('img-filters__button--active')) {
      el.classList.remove('img-filters__button--active')
    }
    currentButton.classList.add('img-filters__button--active');
  });
}

const sortByComments = (data) => {
  const newData = data.slice();
  return newData.sort(function(a, b) {
    const lengthA = a.comments.length;
    const lengthB = b.comments.length;
    if (lengthA > lengthB) {
      return -1;
    }
    if (lengthA < lengthB) {
      return 1;
    }
    return 0;
  });
}

const onChangeFilter = (evt) => {

  switch (evt.target.id) {
    case filterType.RANDOM:
      createThumbnails(getRandomTen(posts));
      checkClass(evt.target);
      break;
    case filterType.DISCUSSED:
      createThumbnails(sortByComments(posts))
      checkClass(evt.target);
      break;
    case filterType.DEFAULT:
      createThumbnails(posts);
      checkClass(evt.target);
      break;
  }
};

export const activateFilter = (data) => {
  posts = data;
  filters.classList.remove('img-filters--inactive');
  filters.addEventListener('click', onChangeFilter);
};
