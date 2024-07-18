import { isEscapeKey } from './util.js';
import { drawBigPicture } from './modal-image.js';

const bigPicture = document.querySelector('.big-picture');
const picturesList = document.querySelector('.pictures');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalClose();
  }
};

const modalOpen = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    drawBigPicture(evt);

    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const modalClose = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

picturesList.addEventListener('click', modalOpen);

bigPictureCancel.addEventListener('click', modalClose);
