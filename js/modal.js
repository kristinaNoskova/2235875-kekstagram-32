import { isEscapeKey } from './util.js';
import { renderPhoto, onMoreButtonClick } from './render-photo.js';

const bigPictureElement = document.querySelector('.big-picture');
const picturesListElement = document.querySelector('.pictures');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onModalCloseClick();
  }
};

const onModalOpenClick = (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (!currentPicture) {
    return;
  }

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderPhoto(currentPicture);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', onMoreButtonClick);
};

function onModalCloseClick() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onMoreButtonClick);
}

picturesListElement.addEventListener('click', onModalOpenClick);

bigPictureCancelElement.addEventListener('click', onModalCloseClick);
