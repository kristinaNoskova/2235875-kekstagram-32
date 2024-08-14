const STEP_SIZE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const VALUE_DIVISOR = 100;

const imgFormElement = document.querySelector('.img-upload__form');
const controlSmallerElement = imgFormElement.querySelector('.scale__control--smaller');
const controlBiggerElement = imgFormElement.querySelector('.scale__control--bigger');
const controlValueElement = imgFormElement.querySelector('.scale__control--value');
const imgPreviewElement = imgFormElement.querySelector('.img-upload__preview img');

const setScaleValue = (value) => {
  const scaleValue = value / VALUE_DIVISOR;
  imgPreviewElement.style.transform = `scale(${scaleValue})`;

  controlValueElement.setAttribute('value', `${value}%`);
};

const updateScaleValue = () => {
  let valueToNumber = controlValueElement.value.slice(0, -1);

  controlSmallerElement.addEventListener('click', () => {
    if (valueToNumber > MIN_VALUE) {
      valueToNumber -= STEP_SIZE;
      setScaleValue(valueToNumber);
    }
  });

  controlBiggerElement.addEventListener('click', () => {
    if (valueToNumber < MAX_VALUE) {
      valueToNumber += STEP_SIZE;
      setScaleValue(valueToNumber);
    }
  });
};

export { updateScaleValue };
