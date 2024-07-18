import { getArrayWithPhotos } from './data.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureElement = pictureTemplate.querySelector('.picture');

const fragment = document.createDocumentFragment();

const datafromPhoto = getArrayWithPhotos();

datafromPhoto.forEach(({ url, description, likes, comments }) => {
  const pictureElementCopy = pictureElement.cloneNode(true);
  const image = pictureElementCopy.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  pictureElementCopy.querySelector('.picture__comments').textContent = comments.length;
  pictureElementCopy.querySelector('.picture__likes').textContent = likes;
  fragment.append(pictureElementCopy);
});

picturesList.append(fragment);

export { picturesList };

