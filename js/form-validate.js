import { resetImgPreview } from './filter-image.js';
import { sendData } from './api.js';
import { showTextSuccess } from './data-show-success.js';
import { showTextError } from './data-show-error.js';
import Pristine from 'pristinejs';

const HASHTAG_REGXP = /^#[a-zя-яёйц0-9]{1,19}$/i;
const HASHTAG_COUNT = 5;
const MAX_LENGTH_COMMENT = 140;
const TextError = {
  MAX_LENGTH: 'Максимум 5 хештегов',
  INVALID: 'Хештег должен начинаться с # и включать буквы и цифры',
  REPEAT: 'Такой хештег уже существует'
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const ValidateSequence = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
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

const pristine = new Pristine(imgFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateComments = (value) => value.length <= MAX_LENGTH_COMMENT;

const getNormalizedHashtags = (element) => element
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const validateHashtags = (value) => {
  const arrTags = getNormalizedHashtags(value);
  if (value.length === 0) {
    return true;
  }
  return arrTags.every((element) => HASHTAG_REGXP.test(element));
};

const checkLengthHashtags = (value) => {
  const arrTags = getNormalizedHashtags(value);

  return arrTags.length <= HASHTAG_COUNT;
};

const checkRepeatHashtags = (value) => {
  const arrTags = getNormalizedHashtags(value);
  const sortedArr = arrTags.slice().sort();
  const lowercased = sortedArr.map((item) => item.toLowerCase());
  if (value.length === 0) {
    return true;
  }

  return lowercased[0] !== lowercased[1];
};

pristine.addValidator(textCommentsElement, validateComments, 'Максимум 140 символов');
pristine.addValidator(textHashtagsElement, validateHashtags, TextError.INVALID, ValidateSequence.FIRST, true);
pristine.addValidator(textHashtagsElement, checkLengthHashtags, TextError.MAX_LENGTH, ValidateSequence.THIRD, true);
pristine.addValidator(textHashtagsElement, checkRepeatHashtags, TextError.REPEAT, ValidateSequence.SECOND, true);

const setImgFormSubmit = (onSuccess) => {
  imgFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(imgFormElement);
      blockSubmitButton();
      try {
        await sendData(formData);
        onSuccess();
        showTextSuccess();
      } catch (err) {
        showTextError(err.message);
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
