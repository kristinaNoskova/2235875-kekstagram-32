import { getState } from './state.js';

const COUNT_COMMENT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentShownCountElement = commentCountElement.querySelector('.social__comment-shown-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
let photoComments = [];
let currentComment = 0;

const socialCommentsFragment = document.createDocumentFragment();

const getIdPhoto = (currentPictureElement) => {
  const pictureDataset = currentPictureElement.dataset.id;
  const dataForPhoto = getState('data');
  const pictureId = dataForPhoto.find((el) => el.id === Number(pictureDataset));
  return pictureId;
};

const renderComments = (comment) => {
  comment.forEach(({ avatar, name, message }) => {
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = avatar;
    img.alt = name;
    img.width = 35;
    img.height = 35;
    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = message;
    const li = document.createElement('li');
    li.classList.add('social__comment');
    li.append(img);
    li.append(p);
    socialCommentsFragment.append(li);
  });
};

const onMoreButtonClick = () => {
  const commentsSlice = photoComments.slice(currentComment, currentComment + COUNT_COMMENT);

  if (commentsSlice.length > 0) {
    renderComments(commentsSlice);
    socialCommentsElement.append(socialCommentsFragment);
    commentsLoaderElement.classList.remove('hidden');

    currentComment += commentsSlice.length;
    commentShownCountElement.textContent = currentComment;
  }

  if (currentComment >= photoComments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const displaysInitialComments = () => {
  onMoreButtonClick();
};

const renderPhoto = (currentPictureElement) => {
  currentComment = 0;
  socialCommentsElement.innerHTML = '';
  const pictureId = getIdPhoto(currentPictureElement);
  bigPictureImgElement.src = pictureId.url;
  bigPictureImgElement.alt = pictureId.description;
  likesCountElement.textContent = pictureId.likes;
  commentTotalCountElement.textContent = pictureId.comments.length;
  socialCaptionElement.textContent = pictureId.description;
  photoComments = pictureId.comments;
  displaysInitialComments();
};

export { renderPhoto, onMoreButtonClick };

