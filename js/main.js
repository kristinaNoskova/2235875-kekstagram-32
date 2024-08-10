import './modal.js';
import { updateScaleValue } from './scale-image.js';
import { renderThumbnailPhoto, getRandomPhotos, sortByCommentsLength, removeHiddenInFilters, setRandomPhotos, setDefaultPhotos, setSortPhotos } from './thumbnail-photos.js';
import './filter-image.js';
import { showTextError, debounce } from './util.js';
import { setImgFormSubmit } from './form-validate.js';
import { onUploadOverlayClose } from './change-image.js';
import { getData } from './api.js';
import { setState } from './state.js';

updateScaleValue();
const RERENDER_DELAY = 500;

try {
  const photo = await getData();
  setState('data', photo);
  const randomPhoto = getRandomPhotos(photo);
  const sortPhoto = sortByCommentsLength(photo);
  removeHiddenInFilters();
  renderThumbnailPhoto(photo);
  setRandomPhotos(debounce(
    () => renderThumbnailPhoto(randomPhoto),
    RERENDER_DELAY,
  ));
  setSortPhotos(debounce(
    () => renderThumbnailPhoto(sortPhoto),
    RERENDER_DELAY,
  ));
  setDefaultPhotos(debounce(
    () => renderThumbnailPhoto(photo),
    RERENDER_DELAY,
  ));
} catch {
  showTextError();
}

setImgFormSubmit(onUploadOverlayClose);

