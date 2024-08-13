const NamesValues = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const Effects = {
  NONE: 'none',
  GRAYSCALE: 'grayscale',
  SEPIA: 'sepia',
  INVERT: 'invert',
  BLUR: 'blur',
  BRIGHTNESS: 'brightness'
};

const filterData = {
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  none: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  }
};

const imgFormElement = document.querySelector('.img-upload__form');
const imgPreviewElement = imgFormElement.querySelector('.img-upload__preview img');

const effectsListElement = imgFormElement.querySelector('.effects__list');
const imgEffectLevelElement = imgFormElement.querySelector('.img-upload__effect-level');
const effectLevelValueElement = imgEffectLevelElement.querySelector('.effect-level__value');
const effectSliderElement = imgEffectLevelElement.querySelector('.effect-level__slider');
let filterName;

effectLevelValueElement.value = 1;
imgEffectLevelElement.classList.add('hidden');

const resetImgPreview = () => {
  imgPreviewElement.style.filter = 'none';
  imgEffectLevelElement.classList.add('hidden');
  imgPreviewElement.style.transform = 'scale(100%)';
};

noUiSlider.create(effectSliderElement, {
  range: {
    min: filterData.none.range.min,
    max: filterData.none.range.max,
  },
  step: filterData.none.step,
  start: filterData.none.start,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const getStyleFilter = (value) => {
  imgPreviewElement.style.filter = value;
};

const setImageEffect = (currentPreview) => {
  switch (true) {
    case currentPreview.value === NamesValues.CHROME:
      filterName = Effects.GRAYSCALE;
      break;
    case currentPreview.value === NamesValues.SEPIA:
      filterName = Effects.SEPIA;
      break;
    case currentPreview.value === NamesValues.MARVIN:
      filterName = Effects.INVERT;
      break;
    case currentPreview.value === NamesValues.PHOBOS:
      filterName = Effects.BLUR;
      break;
    case currentPreview.value === NamesValues.HEAT:
      filterName = Effects.BRIGHTNESS;
      break;
    default:
      filterName = Effects.NONE;
      imgEffectLevelElement.classList.add('hidden');
  }
};

effectSliderElement.noUiSlider.on('update', () => {
  effectLevelValueElement.value = effectSliderElement.noUiSlider.get();
  if (filterName === Effects.INVERT) {
    getStyleFilter(`${filterName}(${effectLevelValueElement.value}%)`);
  } else if (filterName === Effects.BLUR) {
    getStyleFilter(`${filterName}(${effectLevelValueElement.value}px)`);
  } else if (filterName === Effects.NONE) {
    getStyleFilter(Effects.NONE);
  } else {
    getStyleFilter(`${filterName}(${effectLevelValueElement.value})`);
  }
});

const setEffectOtherPram = (currentPreview) => {
  const currentType = currentPreview.value;
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: filterData[currentType].range.min,
      max: filterData[currentType].range.max
    },
    start: filterData[currentType].start,
    step: filterData[currentType].step
  });
};

const onFilterPreviewClick = (evt) => {
  const currentPreview = evt.target.closest('.effects__radio');

  if (!currentPreview) {
    return;
  }

  imgEffectLevelElement.classList.remove('hidden');
  effectSliderElement.noUiSlider.reset();
  setImageEffect(currentPreview);
  setEffectOtherPram(currentPreview);
};

effectsListElement.addEventListener('click', onFilterPreviewClick);

export { resetImgPreview };
