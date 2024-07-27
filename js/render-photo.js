import { dataForPhoto } from './thumbnail-photos';
const ADD_TO_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentShownCount = commentCount.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let photoComments = [];
let countComments = 0;

const socialCommentsFragment = document.createDocumentFragment();

const getIdPhoto = (currentPictureElement) => {
  const pictureDataset = currentPictureElement.dataset.id;
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

const renderPhoto = (currentPictureElement) => {
  countComments = 0;
  socialComments.innerHTML = '';
  const pictureId = getIdPhoto(currentPictureElement);
  bigPictureImg.src = pictureId.url;
  bigPictureImg.alt = pictureId.description;
  likesCount.textContent = pictureId.likes;
  commentTotalCount.textContent = pictureId.comments.length;
  socialCaption.textContent = pictureId.description;
  photoComments = pictureId.comments;
  onMoreButtonClick();
};

function onMoreButtonClick() {
  const commentsChunk = photoComments.slice(countComments, countComments + ADD_TO_COMMENTS);

  if (commentsChunk.length > 0) {
    renderComments(commentsChunk);
    socialComments.append(socialCommentsFragment);
    commentsLoader.classList.remove('hidden');

    countComments += commentsChunk.length;
    commentShownCount.textContent = countComments;
  }

  if (countComments >= photoComments.length) {
    commentsLoader.classList.add('hidden');
  }
}
export { renderPhoto, onMoreButtonClick };

