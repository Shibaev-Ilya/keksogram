import './form.js';
import {createThumbnails} from './thumbnails-creator.js';
import {getData} from './server-connect.js'

getData(createThumbnails, (error) => console.log('getData onError', error));
