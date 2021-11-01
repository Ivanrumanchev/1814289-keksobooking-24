const ALERT_SHOW_TIME = 5000;

// const getRandomIntegerNumber = (numberOne, numberTwo) => {
//   const lower = Math.ceil(Math.min(Math.abs(numberOne), Math.abs(numberTwo)));
//   const upper = Math.floor(Math.max(Math.abs(numberOne), Math.abs(numberTwo)));
//   return Math.floor(Math.random() * (upper - lower + 1) + lower);
// };
// export {getRandomIntegerNumber};

// const getRandomDottedNumber = (numberOne, numberTwo, fix) => {
//   const lower = Math.ceil(Math.min(Math.abs(numberOne), Math.abs(numberTwo)));
//   const upper = Math.floor(Math.max(Math.abs(numberOne), Math.abs(numberTwo)));
//   const randomInt = Math.random() * (upper - lower) + lower;
//   return +randomInt.toFixed(fix);
// };
// export {getRandomDottedNumber};

// const getRandomArrayElement = (elements) => elements[getRandomIntegerNumber(0, elements.length - 1)];
// export {getRandomArrayElement};

// const shuffle = (array) => {
//   const arrayForShuffle = array.slice();
//   for (let id = arrayForShuffle.length - 1; id > 0; id--) {
//     const idForSwap = getRandomIntegerNumber(0, id);
//     [arrayForShuffle[id], arrayForShuffle[idForSwap]] = [arrayForShuffle[idForSwap], arrayForShuffle[id]];
//   }
//   return arrayForShuffle;
// };
// export {shuffle};

// const createRandomArray = (array) => {
//   const shuffledArray = shuffle(array);
//   const arrayLength = getRandomIntegerNumber(0, shuffledArray.length);
//   return shuffledArray.slice(0, arrayLength);
// };
// export {createRandomArray};

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
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
export {showAlert};

const isEscapeKey = (evt) => evt.key === 'Escape';
export {isEscapeKey};
