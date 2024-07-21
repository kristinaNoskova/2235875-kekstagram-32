import { pictures } from './thumbnail-photos.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentShownCount = commentCount.querySelector('.social__comment-shown-count');
const commentTotalCount = commentCount.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const socialCommentsFragment = document.createDocumentFragment();

// const createCommentElement = (avatar, name, message) => {
//   const img = document.createElement('img');
//   img.classList.add('social__picture');
//   img.src = avatar;
//   img.alt = name;
//   img.width = 35;
//   img.height = 35;
//   const p = document.createElement('p');
//   p.classList.add('social__text');
//   p.textContent = message;
//   const li = document.createElement('li');
//   li.classList.add('social__comment');
//   li.append(img);
//   li.append(p);
//   socialCommentsFragment.append(li);
//   socialComments.append(socialCommentsFragment);
// };

// const renderComments = (comments) => {
//   for (let i = 0; i < 5; i++) {
//     const comment = comments[i];
//     createCommentElement(comment.avatar, comment.name, comment.message);
//   }
// };

// const renderAdditionalComments = (comments) => {
//   let currentIndex = 5;
//   while (currentIndex <= comments.length) {
//     const comment = comments[currentIndex];
//     createCommentElement(comment.avatar, comment.name, comment.message);
//     currentIndex += 5;
//   }
// };

const drawBigPicture = (currentPictureElement) => {
  bigPictureImg.src = currentPictureElement.querySelector('.picture__img').src;
  bigPictureImg.alt = currentPictureElement.querySelector('.picture__img').alt;
  likesCount.textContent = currentPictureElement.querySelector('.picture__likes').textContent;
  commentTotalCount.textContent = currentPictureElement.querySelector('.picture__comments').textContent;
  socialCaption.textContent = currentPictureElement.querySelector('.picture__img').alt;

  socialComments.innerHTML = '';

  const comments = currentPictureElement.comments;

  comments.forEach(({ avatar, name, message }) => {
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
    socialComments.append(socialCommentsFragment);
  });

  const commentItem = document.querySelectorAll('.social__comment');

  for (let i = 5; i < commentItem.length; i++) {
    commentItem[i].style.display = 'none';
  }

  let countComment = 5;
  commentsLoader.addEventListener('click', () => {
    countComment += 5;
    if (countComment <= commentItem.length) {
      for (let i = 0; i < countComment; i++) {
        commentItem[i].style.display = 'flex';
        if (commentItem.length < 5) {
          commentShownCount.textContent = commentItem.length;
        } else {
          commentShownCount.textContent = countComment;
        }
      }
    }
  });
};
export { drawBigPicture };
