import { isEscapeKey } from './util.js';
import { resetForm } from './form-validate.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
const picturesListElement = document.querySelector('.pictures');

const imgFormElement = picturesListElement.querySelector('.img-upload__form');
const imgOverlayElement = imgFormElement.querySelector('.img-upload__overlay');
const imgInputElement = imgFormElement.querySelector('.img-upload__input');
const imgCancelButtonElement = imgFormElement.querySelector('.img-upload__cancel');
const textCommentsElement = imgFormElement.querySelector('.text__description');
const textHashtagsElement = imgFormElement.querySelector('.text__hashtags');
const imgPreviewElement = imgFormElement.querySelector('.img-upload__preview img');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');

const isFieldFocused = () => document.activeElement === textCommentsElement || document.activeElement === textHashtagsElement;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    onUploadOverlayClose();
  }
};

const onUploadOverlayChange = () => {
  imgOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const file = imgInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const ending = FILE_TYPES.some((el) => fileName.endsWith(el));

  if (ending) {
    imgPreviewElement.src = URL.createObjectURL(file);
    effectsPreviewElement.forEach((element) => {
      element.style.backgroundImage = `url("${imgPreviewElement.src}")`;
    });
  }

  document.addEventListener('keydown', onDocumentKeydown);
};

function onUploadOverlayClose() {
  resetForm();
  imgOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgInputElement.addEventListener('change', onUploadOverlayChange);

imgCancelButtonElement.addEventListener('click', onUploadOverlayClose);

export { onUploadOverlayClose };
