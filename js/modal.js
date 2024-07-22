import { isEscapeKey } from './util.js';
import { drawBigPicture } from './modal-image.js';

const bigPicture = document.querySelector('.big-picture');
const picturesList = document.querySelector('.pictures');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalClose();
  }
};

const modalOpen = (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (!currentPicture) {
    return;
  }
  evt.preventDefault();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  drawBigPicture(currentPicture);

  document.addEventListener('keydown', onDocumentKeydown);
};

function modalClose() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onModalOpen = () => picturesList.addEventListener('click', modalOpen);
onModalOpen();

const onModalClose = () => bigPictureCancel.addEventListener('click', modalClose);
onModalClose();
