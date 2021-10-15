const adFormList = document.querySelector('.ad-form');

const mapFiltersList = document.querySelector('.map__filters');

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
