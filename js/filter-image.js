const NamesModifiers = {
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

const imgFormElement = document.querySelector('.img-upload__form');
const imgPreviewElement = imgFormElement.querySelector('.img-upload__preview img');

const effectsListElement = imgFormElement.querySelector('.effects__list');
const imgEffectLevelElement = imgFormElement.querySelector('.img-upload__effect-level');
const effectLevelValueElement = imgEffectLevelElement.querySelector('.effect-level__value');
const effectSliderElement = imgEffectLevelElement.querySelector('.effect-level__slider');
let filterName;

effectLevelValueElement.value = 1;
imgEffectLevelElement.classList.add('hidden');

const imgPreviewReset = () => {
  imgPreviewElement.style.filter = 'none';
  imgEffectLevelElement.classList.add('hidden');
  imgPreviewElement.style.transform = 'scale(100%)';
};

noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
  connect: 'lower'
});

// Проверяем наличие модификатра с нужным эффектом
const checkPresenceClass = (effects, currentPreview) => currentPreview.classList.contains(`effects__preview--${effects}`);

// Добавляем CSS-стиль изображению
const getStyleFilter = (value) => {
  imgPreviewElement.style.filter = value;
};

// Записываем свойства в переменную, в зависимости от класса модификатора у текущего элемента
const setImageEffect = (currentPreview) => {
  if (checkPresenceClass(NamesModifiers.CHROME, currentPreview)) {
    filterName = Effects.GRAYSCALE;
  } else if (checkPresenceClass(NamesModifiers.SEPIA, currentPreview)) {
    filterName = Effects.SEPIA;
  } else if (checkPresenceClass(NamesModifiers.MARVIN, currentPreview)) {
    filterName = Effects.INVERT;
  } else if (checkPresenceClass(NamesModifiers.PHOBOS, currentPreview)) {
    filterName = Effects.BLUR;
  } else if (checkPresenceClass(NamesModifiers.HEAT, currentPreview)) {
    filterName = Effects.BRIGHTNESS;
  } else {
    filterName = Effects.NONE;
    imgEffectLevelElement.classList.add('hidden');
  }
};

// Подставляем значения слайдера, в зависимости от фльтра добавляем единицы измерения
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

// Меняем параметры слайдера в зависимости от значений свойства filter.
const setEffectOtherPram = (currentPreview) => {
  if (checkPresenceClass(NamesModifiers.PHOBOS, currentPreview)) {
    effectSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  } else if (checkPresenceClass(NamesModifiers.HEAT, currentPreview)) {
    effectSliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1
    });
  } else if (checkPresenceClass(NamesModifiers.MARVIN, currentPreview)) {
    effectSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    });
  } else {
    effectSliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    });
  }
};

// Обработчик клика превью с эффектами
const onFilterPreviewClick = (evt) => {
  const currentPreview = evt.target.closest('.effects__preview');

  if (!currentPreview) {
    return;
  }

  imgEffectLevelElement.classList.remove('hidden');

  effectSliderElement.noUiSlider.reset();
  setImageEffect(currentPreview);
  setEffectOtherPram(currentPreview);
};

effectsListElement.addEventListener('click', onFilterPreviewClick);

export { imgPreviewReset };
