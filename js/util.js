const ERR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content;
const sectionErrorElement = dataErrorTemplate.querySelector('.data-error');
const textErrorElement = sectionErrorElement.querySelector('.data-error__title');

const showTextError = (err) => {
  textErrorElement.textContent = err;

  document.body.append(sectionErrorElement);

  setTimeout(() => {
    sectionErrorElement.remove();
  }, ERR_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, showTextError };
