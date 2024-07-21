import { getArrayWithPhotos } from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');

const fragment = document.createDocumentFragment();

const dataForPhoto = getArrayWithPhotos();

dataForPhoto.forEach(({ url, description, likes, comments }) => {
  const pictureCopy = picture.cloneNode(true);
  const image = pictureCopy.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  pictureCopy.querySelector('.picture__comments').textContent = comments.length;
  pictureCopy.querySelector('.picture__likes').textContent = likes;
  pictureCopy.comments = comments;
  fragment.append(pictureCopy);
});

pictures.append(fragment);

export { pictures };

