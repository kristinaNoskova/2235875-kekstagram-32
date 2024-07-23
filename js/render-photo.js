const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');

const socialCommentsFragment = document.createDocumentFragment();

const renderPhoto = (currentPictureElement) => {
  bigPictureImg.src = currentPictureElement.querySelector('.picture__img').src;
  bigPictureImg.alt = currentPictureElement.querySelector('.picture__img').alt;
  likesCount.textContent = currentPictureElement.querySelector('.picture__likes').textContent;
  commentTotalCount.textContent = currentPictureElement.querySelector('.picture__comments').textContent;
  socialCaption.textContent = currentPictureElement.querySelector('.picture__img').alt;
};

const renderComments = (currentPictureElement) => {
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
  });
  socialComments.append(socialCommentsFragment);
};

export { renderPhoto, renderComments };
