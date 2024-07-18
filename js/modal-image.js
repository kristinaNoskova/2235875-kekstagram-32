import { picturesList } from './thumbnail-photos.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
// const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCaption = bigPicture.querySelector('.social__caption');

const drawBigPicture = (evt) => {
  const currentPicture = evt.target.closest('.picture');
  bigPictureImg.src = currentPicture.querySelector('.picture__img').src;
  bigPictureImg.alt = currentPicture.querySelector('.picture__img').alt;
  likesCount.textContent = currentPicture.querySelector('.picture__likes').textContent;
  commentTotalCount.textContent = currentPicture.querySelector('.picture__comments').textContent;
  socialCaption.textContent = currentPicture.querySelector('.picture__comments').textContent;
};

export { drawBigPicture };
