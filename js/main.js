import './form.js';
import {createThumbnails} from './thumbnails-creator.js';
import {getData} from './server-connect.js'
import {errorMessage} from "./util.js";

getData(createThumbnails, errorMessage);
