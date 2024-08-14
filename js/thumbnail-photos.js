const PHOTO_SLICE_MIN = 0;
const PHOTO_SLICE_MAX = 10;
const picturesElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content;
const pictureElement = pictureTemplateElement.querySelector('.picture');
const imgFiltersElement = document.querySelector('.img-filters');
const buttonElements = imgFiltersElement.querySelectorAll('.img-filters__button');
const buttonDefaultElement = imgFiltersElement.querySelector('#filter-default');
const buttonRandomElement = imgFiltersElement.querySelector('#filter-random');
const buttonSortElement = imgFiltersElement.querySelector('#filter-discussed');

const renderThumbnailPhoto = (dataPhoto) => {
  const fragment = document.createDocumentFragment();

  dataPhoto.forEach(({ url, description, likes, comments, id }) => {
    const pictureCopyElement = pictureElement.cloneNode(true);
    const image = pictureCopyElement.querySelector('.picture__img');
    image.src = url;
    image.alt = description;
    pictureCopyElement.querySelector('.picture__comments').textContent = comments.length;
    pictureCopyElement.querySelector('.picture__likes').textContent = likes;
    pictureCopyElement.dataset.id = id;
    fragment.append(pictureCopyElement);
  });

  Array.from(picturesElement.querySelectorAll('.picture')).forEach((picture) => picture.remove());

  picturesElement.append(fragment);

  return dataPhoto;
};

const compareСomments = (elementA, elementB) => elementB.comments.length - elementA.comments.length;

const sortByCommentsLength = (dataPhoto) => dataPhoto.slice().sort(compareСomments);

const getDefaultPhotos = (dataPhoto) => dataPhoto.slice().sort((a, b) => a.id - b.id);

const getRandomPhotos = (dataPhoto) => dataPhoto.sort(() => Math.random() - 0.5).slice(PHOTO_SLICE_MIN, PHOTO_SLICE_MAX);


const removeHiddenInFilters = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};

const changeStateButton = (evt) => {
  buttonElements.forEach((buttonElement) => buttonElement.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
};

const setDefaultPhotos = (cb) => {
  buttonDefaultElement.addEventListener('click', (evt) => {
    changeStateButton(evt);
    cb();
  });
};

const setSortPhotos = (cb) => {
  buttonSortElement.addEventListener('click', (evt) => {
    changeStateButton(evt);
    cb();
  });
};

const setRandomPhotos = (cb) => {
  buttonRandomElement.addEventListener('click', (evt) => {
    changeStateButton(evt);
    cb();
  });
};

export {
  renderThumbnailPhoto,
  getRandomPhotos,
  sortByCommentsLength,
  removeHiddenInFilters,
  setRandomPhotos,
  setSortPhotos,
  setDefaultPhotos,
  getDefaultPhotos
};

