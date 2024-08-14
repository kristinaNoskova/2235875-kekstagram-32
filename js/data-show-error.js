import { isEscapeKey } from './util.js';

const errorTemplateElement = document.querySelector('#error').content;
const sectionErrorElement = errorTemplateElement.querySelector('.error');
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
  document.body.append(sectionErrorElement);
  document.body.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

function onErrCloseClick() {
  sectionErrorElement.remove();

  document.body.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

buttonErrorElement.addEventListener('click', onErrCloseClick);

export { showTextError };
