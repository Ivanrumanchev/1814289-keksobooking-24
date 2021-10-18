const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const titleInput = document.querySelector('#title');

const adFormList = document.querySelector('.ad-form');
const mapFiltersList = document.querySelector('.map__filters');

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const formSubmit = document.querySelector('.ad-form__submit');

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

disableForm(adFormList);
disableForm(mapFiltersList);
enableForm(adFormList);
enableForm(mapFiltersList);

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

const validationCapacity = () => {
  if (roomNumber.value === '100' && capacity.value !== '0') {
    return capacity.setCustomValidity('Кол-во комнат, равное 100, должно соответствовать значению "Не для гостей"');
  } else if (roomNumber.value !== '100' && capacity.value === '0') {
    return capacity.setCustomValidity('Значение "Не для гостей" должно соответствовать кол-ву комнат, равному 100');
  } else if (capacity.value > roomNumber.value) {
    return capacity.setCustomValidity('Кол-во гостей должно быть меньше либо равно кол-ву комнат');
  }
  return capacity.setCustomValidity('');
};

capacity.addEventListener('change', () => {
  validationCapacity();
  capacity.reportValidity();
});

formSubmit.addEventListener('click', () => {
  validationCapacity();
});
