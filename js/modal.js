import { isEscapeKey } from './util.js';
import { renderPhoto, onMoreButtonClick } from './render-photo.js';

const bigPicture = document.querySelector('.big-picture');
const picturesList = document.querySelector('.pictures');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onModalClose();
  }
};

const onModalOpen = (evt) => {
  evt.preventDefault();
  const currentPicture = evt.target.closest('.picture');

  if (!currentPicture) {
    return;
  }

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderPhoto(currentPicture);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onMoreButtonClick);
};

function onModalClose() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onMoreButtonClick);
}

picturesList.addEventListener('click', onModalOpen);

bigPictureCancel.addEventListener('click', onModalClose);
