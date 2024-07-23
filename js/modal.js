import { isEscapeKey } from './util.js';
import { displaysСomments } from './сomments.js';
import { renderPhoto } from './render-photo.js';

const bigPicture = document.querySelector('.big-picture');
const picturesList = document.querySelector('.pictures');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onModalClose();
  }
};

const onModalOpen = (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (!currentPicture) {
    return;
  }
  evt.preventDefault();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderPhoto(currentPicture);
  displaysСomments(currentPicture);

  document.addEventListener('keydown', onDocumentKeydown);
};

function onModalClose() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

picturesList.addEventListener('click', onModalOpen);

bigPictureCancel.addEventListener('click', onModalClose);
