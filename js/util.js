const ALERT_SHOW_TIME = 5000;
const ALERT_CONTAINER_STYLE = `
  z-index: 100;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  padding: 10px 3px;
  font-size: 30px;
  text-align: center;
  background-color: red;
`;

const isEmpty = (key) => {
  if (key === '' || key === undefined || key.length === 0) {
    return true;
  }
  return false;
};
export {isEmpty};

const hideElement = (element) => element.style.display = 'none';
export {hideElement};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style = ALERT_CONTAINER_STYLE;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
export {showAlert};

const isEscapeKey = (evt) => evt.key === 'Escape';
export {isEscapeKey};

const debounce = (callback, timeoutDelay) => {
  let timeout;
  return (...rest) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
export {debounce};
