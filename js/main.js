/* eslint-disable id-length */
const ADS_COUNT = 10;

const getRandomIntegerNumber = (numberOne, numberTwo) => {
  const lower = Math.ceil(Math.min(Math.abs(numberOne), Math.abs(numberTwo)));
  const upper = Math.floor(Math.max(Math.abs(numberOne), Math.abs(numberTwo)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomDottedNumber = (numberOne, numberTwo, fix) => {
  const lower = Math.ceil(Math.min(Math.abs(numberOne), Math.abs(numberTwo)));
  const upper = Math.floor(Math.max(Math.abs(numberOne), Math.abs(numberTwo)));
  const randomInt = Math.random() * (upper - lower) + lower;
  return +randomInt.toFixed(fix);
};

const getRandomArrayElement = (elements) => elements[getRandomIntegerNumber(0, elements.length - 1)];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomIntegerNumber(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const createRandomArray = (array) => {
  shuffle(array);
  const arrayLength = getRandomIntegerNumber(1, array.length);
  return array.slice(array, arrayLength);
};


const avatars = [];
const getAvatars = () => {
  for (let i = 0; i < ADS_COUNT; i++) {
    (i < 9)? (avatars[i] = `img/avatars/user0${  i+1}.png`) : (avatars[i] = `img/avatars/user${  i+1}.png`);
  }
};
getAvatars();
shuffle(avatars);

const TITLES = [
  'Bay Hotel Urayasu-ekimae',
  'Cozy Home Hotel',
  'Отель «Времена Года»',
  'Best Western Plus Centre Hotel',
  '&AND HOSTEL MINAMISENJUО',
  'Welcome',
  'IBIS Tokyo Shinjuku',
  'Smart Apart Africa',
  'Guest House',
  'Symfonia',
];
shuffle(TITLES);

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Отель находится всего в 150 метрах от станции метро Shinjuku Nishi-guchi и в 5 минутах ходьбы от железнодорожного вокзала Синдзюку',
  'Отель находится в 5 минутах ходьбы от оживленного района Кабукичо и в 15 минутах ходьбы от универмага Isetan. Примерно за 15 минут можно дойти до токийского столичного правительственного здания с бесплатной смотровой площадкой, а также до национального парка Синдзюку-Гоэн',
  'На круглосуточной стойке регистрации работает камера хранения багажа и пункт проката ноутбуков',
  'Отель удобно расположен в районе Аракава в Токио, менее чем в 1 км от храма Джокан-дзи, в 13 минутах ходьбы от Мемориального музея Ичиё и в 1,2 км от храма Сусано',
  'Рядом с отелем расположены музей Аракава-Фурусато-Бункакан, храм Асакуса-Фудзиасама и парк Сиоири',
  'Парам особенно нравится расположение — они оценили проживание в этом районе для поездки вдвоем на 8,0',
  'Апарт-отель расположен в Токио, рядом с бывшим домом семьи Удагава, бывшим домом семьи Оцука и Краеведческим музеем Ураясу',
  'В ресторане Bistro сервируют завтрак «шведский стол» из блюд западной и японской кухни. Напитки и коктейли можно заказать в баре ресторана Bistro.',
  'Отель находится в 15 минутах ходьбы от зоопарка Уэно и Токийского национального музея. Токийский университет находится в 10 минутах ходьбы от отеля.',
  'Гости могут пообщаться в столовой и лаундже с 60-дюймовым телевизором с плоским экраном и видеоиграми. На территории также есть небольшая художественная галерея',
];
shuffle(DESCRIPTION);

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];


const createAd = () => {
  const createLocation = () => ({
    lat: getRandomDottedNumber(35.65000, 35.70000, 5),
    lng: getRandomDottedNumber(139.70000, 139.80000, 5),
  });

  const locationAndAdress = createLocation();

  const createAuthor = () => ({avatar: avatars.pop()});

  const createOffer = () => ({
    title: TITLES.pop(),
    adress: `${  locationAndAdress.lat}, ${  locationAndAdress.lng}`,
    price: getRandomIntegerNumber(500, 200000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomIntegerNumber(1, 10),
    guests: getRandomIntegerNumber(1, 15),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: createRandomArray(FEATURES),
    description: DESCRIPTION.pop(),
    photos: createRandomArray(PHOTOS),
  });

  return {
    author: createAuthor(),
    offer: createOffer(),
    location: locationAndAdress,
  };
};

const ads = Array.from({length: ADS_COUNT}, createAd);
ads;

// author, объект — описывает автора. Содержит одно поле:

// avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.


// offer, объект — содержит информацию об объявлении. Состоит из полей:

// title, строка — заголовок предложения. Придумайте самостоятельно.

// address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.

// price, число — стоимость. Случайное целое положительное число.

// type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.

// rooms, число — количество комнат. Случайное целое положительное число.

// guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.

// checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.

// checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.

// features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.

// description, строка — описание помещения. Придумайте самостоятельно.

// photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.

// location, объект — местоположение в виде географических координат. Состоит из двух полей:

// lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.

// lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
