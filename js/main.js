import './modal.js';
import { updateScaleValue } from './scale-image.js';
import {
  renderThumbnailPhoto,
  getRandomPhotos,
  sortByCommentsLength,
  removeHiddenInFilters,
  setRandomPhotos,
  setDefaultPhotos,
  setSortPhotos,
  getDefaultPhotos
} from './thumbnail-photos.js';
import './filter-image.js';
import { showTextErrors, debounce } from './util.js';
import { setImgFormSubmit } from './form-validate.js';
import { onUploadOverlayClose } from './change-image.js';
import { getData } from './api.js';
import { setState } from './state.js';

const RERENDER_DELAY = 500;
updateScaleValue();

const getDataPhotos = async () => {
  try {
    const photo = await getData();
    removeHiddenInFilters();
    renderThumbnailPhoto(photo);
    setState('data', photo);

    const sortPhoto = sortByCommentsLength(photo);
    const defaultPhoto = getDefaultPhotos(photo);

    setRandomPhotos(debounce(
      () => renderThumbnailPhoto(getRandomPhotos(photo)),
      RERENDER_DELAY));
    setSortPhotos(debounce(
      () => renderThumbnailPhoto(sortPhoto),
      RERENDER_DELAY));
    setDefaultPhotos(debounce(
      () => renderThumbnailPhoto(defaultPhoto),
      RERENDER_DELAY));
  } catch (error) {
    showTextErrors();
  }
};

getDataPhotos();

setImgFormSubmit(onUploadOverlayClose);

