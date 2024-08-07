import './modal.js';
import { updateScaleValue } from './scale-image.js';
import { renderThumbnailPhoto } from './thumbnail-photos.js';
import './filter-image.js';
import { showTextError } from './util.js';
import { setImgFormSubmit, onUploadOverlayClose } from './form-validate.js';
// import { showTextSuccess } from './data-sending-status.js';


updateScaleValue();
import { getData } from './api.js';

getData()
  .then((photos) => {
    renderThumbnailPhoto(photos);
  })
  .catch((err) => {
    showTextError(err.message);
  });

setImgFormSubmit(onUploadOverlayClose);

