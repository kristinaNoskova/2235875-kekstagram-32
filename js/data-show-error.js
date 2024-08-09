import { isEscapeKey } from './util.js';

const dataErrorTemplate = document.querySelector('#error').content;
const sectionErrorElement = dataErrorTemplate.querySelector('.error');
const innerErrorElement = sectionErrorElement.querySelector('.error__inner');
const buttonErrorElement = sectionErrorElement.querySelector('.error__button');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    onErrCloseClick();
  }
};

const onDocumentClick = (evt) => {
  if (!innerErrorElement.contains(evt.target)) {
    onErrCloseClick();
  }
};

const showTextError = () => {
  sectionErrorElement.classList.remove('hidden');

  document.body.append(sectionErrorElement);
  document.body.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

function onErrCloseClick() {
  sectionErrorElement.classList.add('hidden');
  document.body.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

buttonErrorElement.addEventListener('click', onErrCloseClick);

export { showTextError };
