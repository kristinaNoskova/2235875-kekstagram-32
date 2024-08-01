import { isEscapeKey } from './util.js';

const HASHTAG = /^#[a-zя-яё0-9]{1,19}$/i;
const HASHTAG_COUNT = 5;

const picturesListElement = document.querySelector('.pictures');
const imgFormElement = picturesListElement.querySelector('.img-upload__form');
const imgOverlayElement = imgFormElement.querySelector('.img-upload__overlay');
const imgInputElement = imgFormElement.querySelector('.img-upload__input');
const imgCancelButtonElement = imgFormElement.querySelector('.img-upload__cancel');
const textCommentsElement = imgFormElement.querySelector('.text__description');
const textHashtagsElement = imgFormElement.querySelector('.text__hashtags');
const TextError = {
  ERROR_LENGTH: 'Максимум 5 хештегов',
  ERROR_INVALID: 'Хештег должен начинаться с # и включать буквы и цифры',
  ERROR_REPEAT: 'Такой хештег уже существует'
};

imgFormElement.method = 'POST';
imgFormElement.enctype = 'multipart/form-data';
imgFormElement.action = 'https://32.javascript.htmlacademy.pro/kekstagram';

// Валидация формы
const pristine = new Pristine(imgFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const validateComments = (value) => value.length <= 140;

const normalize = (element) => element.trim().split(' ');

// Проверяем на соответствие регулярному выражению
const validateHashtags = (value) => {
  const arrTags = normalize(value);
  return arrTags.every((element) => HASHTAG.test(element));
};

// Проверяем длину массива
const checksLengthArray = (value) => {
  const arrTags = normalize(value);

  if (arrTags.length <= HASHTAG_COUNT) {
    return arrTags.length <= HASHTAG_COUNT;
  }
};

// Проверяем не повторяется ли теги
const checksRepeatArray = (value) => {
  const arrTags = normalize(value);
  const sortedArr = arrTags.slice().sort();
  if (sortedArr[0] === sortedArr[1]) {
    return false;
  }
  return true;
};

pristine.addValidator(textCommentsElement, validateComments, 'Максимум 140 символов');
pristine.addValidator(textHashtagsElement, validateHashtags, TextError.ERROR_INVALID, 1, true);
pristine.addValidator(textHashtagsElement, checksLengthArray, TextError.ERROR_LENGTH, 3, true);
pristine.addValidator(textHashtagsElement, checksRepeatArray, TextError.ERROR_REPEAT, 2, true);

imgFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();

});

// Обработчики для открытия/закрытия формы
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onUploadOverlayClose();
  }
};

const onUploadOverlayChange = () => {
  imgOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function onUploadOverlayClose() {
  imgOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgFormElement.reset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgInputElement.addEventListener('change', onUploadOverlayChange);

imgCancelButtonElement.addEventListener('click', onUploadOverlayClose);

// Потеря фокуса у инпута без закрытия окна
const onInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.blur();
  }
};

imgFormElement.addEventListener('keydown', onInputKeydown);
