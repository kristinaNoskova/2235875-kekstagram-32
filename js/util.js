const ERR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content;
const sectionErrorElement = dataErrorTemplate.querySelector('.data-error');

const showTextErrors = () => {
  document.body.append(sectionErrorElement);

  setTimeout(() => {
    sectionErrorElement.remove();
  }, ERR_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showTextErrors, debounce };
