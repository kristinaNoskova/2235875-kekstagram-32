import { renderComments } from './render-photo.js';

const bigPicture = document.querySelector('.big-picture');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentShownCount = commentCount.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const changesDisplayButton = (commentItems, countComment) => {
  if (commentItems.length <= countComment) {
    commentShownCount.textContent = commentItems.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentShownCount.textContent = countComment;
    commentsLoader.classList.remove('hidden');
  }
};

const displaysСomments = (currentPictureElement) => {
  renderComments(currentPictureElement);

  const commentItems = document.querySelectorAll('.social__comment');
  let countComment = 5;
  for (let i = 5; i < commentItems.length; i++) {
    commentItems[i].classList.add('hidden');
  }

  changesDisplayButton(commentItems, countComment);

  commentsLoader.addEventListener('click', () => {
    countComment += 5;
    for (let i = 0; i <= countComment; i++) {
      commentItems[i].classList.remove('hidden');
      changesDisplayButton(commentItems, countComment);
    }
  });
};

export { displaysСomments };
