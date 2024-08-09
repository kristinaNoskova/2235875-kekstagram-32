// import { isEscapeKey } from './util.js';
import { resetImgPreview } from './filter-image.js';
import { sendData } from './api.js';
import { showTextSuccess } from './data-show-success.js';
import { showTextError } from './data-show-error.js';


const HASHTAG_REGXP = /^#[a-zя-яё0-9]{1,19}$/i;
const HASHTAG_COUNT = 5;
const TextError = {
  MAX_LENGTH: 'Максимум 5 хештегов',
  INVALID: 'Хештег должен начинаться с # и включать буквы и цифры',
  REPEAT: 'Такой хештег уже существует'
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const picturesListElement = document.querySelector('.pictures');
const imgFormElement = picturesListElement.querySelector('.img-upload__form');
const textCommentsElement = imgFormElement.querySelector('.text__description');
const textHashtagsElement = imgFormElement.querySelector('.text__hashtags');
const buttonSubmitElement = imgFormElement.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  buttonSubmitElement.disabled = true;
  buttonSubmitElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  buttonSubmitElement.disabled = false;
  buttonSubmitElement.textContent = SubmitButtonText.IDLE;
};

// Валидация формы
const pristine = new Pristine(imgFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateComments = (value) => value.length <= 140;

const getNormalizedHashtags = (element) => element.trim().split(' ');

// Проверяем на соответствие регулярному выражению
const validateHashtags = (value) => {
  const arrTags = getNormalizedHashtags(value);
  if (value.length === 0) {
    return true;
  }
  return arrTags.every((element) => HASHTAG_REGXP.test(element));
};

// Проверяем чтоб длина масиива не привышала HASHTAG_COUNT
const checkLengthHashtags = (value) => {
  const arrTags = getNormalizedHashtags(value);

  return arrTags.length <= HASHTAG_COUNT;
};

// Проверяем не повторяются ли теги
const checkRepeatHashtags = (value) => {
  const arrTags = getNormalizedHashtags(value);
  const sortedArr = arrTags.slice().sort();
  return sortedArr[0] !== sortedArr[1];
};

pristine.addValidator(textCommentsElement, validateComments, 'Максимум 140 символов');
pristine.addValidator(textHashtagsElement, validateHashtags, TextError.INVALID, 1, true);
pristine.addValidator(textHashtagsElement, checkLengthHashtags, TextError.MAX_LENGTH, 2, true);
pristine.addValidator(textHashtagsElement, checkRepeatHashtags, TextError.REPEAT, 3, true);

// Если валидация проходит, разрешаем отправку формы
// const setImgFormSubmit = (onSuccess) => {
//   imgFormElement.addEventListener('submit', (evt) => {
//     evt.preventDefault();

//     const isValid = pristine.validate();
//     if (isValid) {
//       const formData = new FormData(evt.target);
//       blockSubmitButton();
//       sendData(formData)
//         .then(() => onSuccess())
//         .then(() => showTextSuccess())
//         .catch(() => showTextError())
//         .finally(() => unblockSubmitButton());
//     }
//   });
// };
const setImgFormSubmit = async (onSuccess) => {
  imgFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      try {
        await sendData(formData);
        onSuccess();
        showTextSuccess();
      } catch (error) {
        showTextError(error.message);
      } finally {
        unblockSubmitButton();
      }
    }
  });
};

const resetForm = () => {
  resetImgPreview();
  imgFormElement.reset();
  pristine.reset();
};

export { setImgFormSubmit, resetForm };
