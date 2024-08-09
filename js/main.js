import './modal.js';
import { updateScaleValue } from './scale-image.js';
import { renderThumbnailPhoto } from './thumbnail-photos.js';
import './filter-image.js';
import { showTextError } from './util.js';
import { setImgFormSubmit } from './form-validate.js';
import { onUploadOverlayClose } from './change-image.js';
import { getData } from './api.js';
import { setState } from './state.js';

updateScaleValue();

try {
  const photo = await getData();
  setState('data', photo);
  renderThumbnailPhoto(photo);
} catch {
  showTextError();
}

setImgFormSubmit(onUploadOverlayClose);

