import {resetPreviewImages} from './input-type-file.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const ROOM_NUMBER_MAX = 100;
const CAPACITY_MAX = 0;

const priceOfTypes = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const adFormList = document.querySelector('.ad-form');
const mapFiltersList = document.querySelector('.map__filters');

const titleInput = document.querySelector('#title');
const address = document.querySelector('#address');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const price = document.querySelector('#price');
const type = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

const disableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);
  for (const formElement of form.children) {
    formElement.setAttribute('disabled', '');
  }
};

const enableForm = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);
  for (const formElement of form.children) {
    formElement.removeAttribute('disabled');
  }
};

const validatePrice = () => {
  if (price.validity.valueMissing) {
    return price.setCustomValidity('Пожалуйста, введите цену');
  } else if (price.value < priceOfTypes[type.value]) {
    return price.setCustomValidity(`Минимальная цена для выбранного типа жилья должна быть не меньше ${  priceOfTypes[type.value] } руб. за ночь`);
  }
  return price.setCustomValidity('');
};

const validateCapacity = () => {
  if (roomNumber.value ===  String(ROOM_NUMBER_MAX) && capacity.value !==  String(CAPACITY_MAX)) {
    return capacity.setCustomValidity('Выбранному кол-ву комнат может соответствовать только значение "Не для гостей"');
  } else if (roomNumber.value !==  String(ROOM_NUMBER_MAX) && capacity.value ===  String(CAPACITY_MAX)) {
    return capacity.setCustomValidity('Значение "Не для гостей" может соответствовать только кол-ву комнат, равному 100');
  } else if (capacity.value > roomNumber.value) {
    return capacity.setCustomValidity('Кол-во гостей не должно быть больше кол-ва комнат');
  }
  return capacity.setCustomValidity('');
};

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

type.addEventListener('change', () => {
  price.placeholder=`${  priceOfTypes[type.value] }`;
});

price.addEventListener('input', () => {
  validatePrice();
  price.reportValidity();
});

capacity.addEventListener('change', () => {
  validateCapacity();
  capacity.reportValidity();
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

submitButton.addEventListener('click', () => {
  validatePrice();
  validateCapacity();
});

const setResetButton = (resetMap, setCoordinates, renderSimilarAds) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    adFormList.reset();
    resetPreviewImages();
    price.placeholder = priceOfTypes.flat;
    address.value = `${setCoordinates.lat}, ${setCoordinates.lng}`;
    mapFiltersList.reset();
    resetMap();
    renderSimilarAds();
  });
};

const setFilterChange = (cb) => {
  mapFiltersList.addEventListener('change', () => {
    cb();
  });
};

export {disableForm, enableForm, setResetButton, setFilterChange, adFormList, mapFiltersList, address, resetButton};
