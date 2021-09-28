
function getRandomIntegerNumber(min, max) {
  if (min<0 || min>=max) {
    return false;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются. Если значения не целые, то будут округлены в сторону диапазона.
}

getRandomIntegerNumber(3,5);

function getRandomDottedNumber(min, max, fix) {
  if (min<0 || min>=max) {
    return false;
  }
  const randomInt = Math.random() * (max - min) + min;
  return +randomInt.toFixed(fix);
}

getRandomDottedNumber(2.2, 2.5, 3);

// function getRandomIntNum(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются. Если значения не целые, то будут округлены в сторону диапазона.
// }

// let minNumUser;
// let maxNumUser;

// function getCorrectNumber() {
//   minNumUser = +prompt('Введите число начала диапазона', '');
//   if (minNumUser<0) {
//     while (minNumUser<0) {
//       minNumUser = +prompt('Введено отрицательное число, пожалуйста, введите новое число начала диапазона', '');
//     }
//   }

//   maxNumUser = +prompt('Введите число окончания диапазона', '');
//   if (maxNumUser<0) {
//     while (maxNumUser<0) {
//       maxNumUser = +prompt('Введено отрицательное число, пожалуйста, введите новое число окончания диапазона', '');
//     }
//   }
//   if (maxNumUser===minNumUser) {
//     while (maxNumUser===minNumUser) {
//       maxNumUser = +prompt('Введено одинаковое число начала и окончания диапазона, пожалуйста, введите новое число окончания диапазона', '');
//     }
//   }
// }

// function getRandomIntegerNumberPrompt () {
//   alert('Программа для получения случайного числа из заданного диапазона включительно. \n Выбранные числа должны удовлетворять двум условиям: \n 1) Пожалуйста, вводите только положительные числа \n 2) Число начала диапазона не должно быть больше, чем число окончания или равно ему');

//   getCorrectNumber();
//   if (minNumUser > maxNumUser) {
//     while (minNumUser > maxNumUser) {
//       alert('Число начала диапазона не должно быть больше, чем число окончания. Пожалуйста, введите корректные числа');
//       getCorrectNumber();
//     }
//   }

//   alert(`Случайное целое число из диапазона [${  minNumUser  }, ${  maxNumUser  }] = ${  getRandomIntNum(minNumUser, maxNumUser)}`);
// }

// const answerInteger = confirm('Готовы получить случайное целое число из выбранного диапазона?');

// if (answerInteger) {
//   getRandomIntegerNumberPrompt ();
// }

// // function getRandomIntegerNumber (min, max) {

// // }

// function getRandomDotNum(min, max, fix) {
//   const randomInt = Math.random() * (max - min) + min;
//   return randomInt.toFixed(fix); //Максимум и минимум включаются.
// }

// function getRandomDottedNumberPrompt () {
//   alert('Программа для получения случайного числа c плавающей точкой из заданного диапазона включительно. \n Выбранные числа должны удовлетворять двум условиям: \n 1) Пожалуйста, вводите только положительные числа \n 2) Число начала диапазона не должно быть больше, чем число окончания или равно ему');

//   getCorrectNumber();
//   if (minNumUser > maxNumUser) {
//     while (minNumUser > maxNumUser) {
//       alert('Число начала диапазона не должно быть больше, чем число окончания. Пожалуйста, введите корректные числа');
//       getCorrectNumber();
//     }
//   }
//   const fixed = prompt('Введите число знаков после запятой', '');

//   alert(`Случайное число с плавающей точкой из диапазона [${  minNumUser  }, ${  maxNumUser  }] с ${  fixed  } знаками после запятой = ${  getRandomDotNum(minNumUser, maxNumUser, fixed)}`);
// }

// const answerDotted = confirm('Готовы получить случайное число с плавающей точкой из выбранного диапазона?');

// if (answerDotted) {
//   getRandomDottedNumberPrompt ();
// }
