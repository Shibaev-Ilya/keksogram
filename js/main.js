import {mocks} from './mock-data.js';
import {createThumbnails} from './thumbnails-creator.js'

export const data = mocks();

const picturesContainer = document.querySelector('.pictures');

picturesContainer.append(createThumbnails(data));
