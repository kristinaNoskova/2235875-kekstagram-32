import { isEscapeKey } from './util.js';
import { imgPreviewReset } from './filter-image.js';

const HASHTAG_REGXP = /^#[a-zя-яё0-9]{1,19}$/i;
const HASHTAG_COUNT = 5;
const TextError = {
  MAX_LENGTH: 'Максимум 5 хештегов',
  INVALID: 'Хештег должен начинаться с # и включать буквы и цифры',
  REPEAT: 'Такой хештег уже существует'
};

const picturesListElement = document.querySelector('.pictures');
const imgFormElement = picturesListElement.querySelector('.img-upload__form');
const imgOverlayElement = imgFormElement.querySelector('.img-upload__overlay');
const imgInputElement = imgFormElement.querySelector('.img-upload__input');
const imgCancelButtonElement = imgFormElement.querySelector('.img-upload__cancel');
const textCommentsElement = imgFormElement.querySelector('.text__description');
const textHashtagsElement = imgFormElement.querySelector('.text__hashtags');

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

const getNormalizedHashtags = (element) => element.trim().split(' ');

// Проверяем на соответствие регулярному выражению
const validateHashtags = (value) => {
  const arrTags = getNormalizedHashtags(value);

  return arrTags.every((element) => HASHTAG_REGXP.test(element));
};

// Проверяем чтоб длина масиива не привышала HASHTAG_COUNT
const checkLengthHashtags = (value) => {
  const arrTags = getNormalizedHashtags(value);

  return arrTags.length <= HASHTAG_COUNT;
};

// Проверяем не повторяется ли теги
const checkRepeatHashtags = (value) => {
  const arrTags = getNormalizedHashtags(value);
  const sortedArr = arrTags.slice().sort();
  return sortedArr[0] !== sortedArr[1];
};

pristine.addValidator(textCommentsElement, validateComments, 'Максимум 140 символов');
pristine.addValidator(textHashtagsElement, validateHashtags, TextError.INVALID, 1, true);
pristine.addValidator(textHashtagsElement, checkLengthHashtags, TextError.MAX_LENGTH, 3, true);
pristine.addValidator(textHashtagsElement, checkRepeatHashtags, TextError.REPEAT, 2, true);

// Если валидация проходит, разрешаем отправку формы
imgFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    evt.target.submit();
  }
});

const isFieldFocused = () => document.activeElement === textCommentsElement || document.activeElement === textHashtagsElement;

// Обработчики для открытия/закрытия формы
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
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
  imgPreviewReset();
  imgFormElement.reset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgInputElement.addEventListener('change', onUploadOverlayChange);

imgCancelButtonElement.addEventListener('click', onUploadOverlayClose);
