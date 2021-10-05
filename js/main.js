const ADS_COUNT = 10;

const LATITUDE_START = 35.65000;
const LATITUDE_END = 35.70000;
const ACCURACY = 5;
const LONGITUDE_START = 139.70000;
const LONGITUDE_END = 139.80000;

const PRICE_MIN = 500;
const PRICE_MAX = 200000;

const ROOMS_MIN = 1;
const ROOMS_MAX = 10;
const GUESTS_MIN = 1;
const GUESTS_MAX = 15;

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

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getAvatars = () => {
  const array = [];
  for (let id = 1; id < ADS_COUNT + 1; id++) {
    if (id < 10) {
      array.push(`img/avatars/user0${  id}.png`);
    } else {
      array.push(`img/avatars/user${  id}.png`);
    }
  }
  return array;
};

const avatars = getAvatars();

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
  const arrayForShuffle = array.slice();
  for (let id = arrayForShuffle.length - 1; id > 0; id--) {
    const idForSwap = getRandomIntegerNumber(0, id);
    [arrayForShuffle[id], arrayForShuffle[idForSwap]] = [arrayForShuffle[idForSwap], arrayForShuffle[id]];
  }
  return arrayForShuffle;
};

const createRandomArray = (array) => {
  const shuffledArray = shuffle(array);
  const arrayLength = getRandomIntegerNumber(1, shuffledArray.length);
  return shuffledArray.slice(0, arrayLength);
};

const createAd = () => {
  const createLocation = () => ({
    lat: getRandomDottedNumber(LATITUDE_START, LATITUDE_END, ACCURACY),
    lng: getRandomDottedNumber(LONGITUDE_START, LONGITUDE_END, ACCURACY),
  });

  const locationAndAdress = createLocation();

  const createAuthor = () => ({avatar: avatars.pop()});

  const createOffer = () => ({
    title: getRandomArrayElement(TITLES),
    adress: `${  locationAndAdress.lat}, ${  locationAndAdress.lng}`,
    price: getRandomIntegerNumber(PRICE_MIN, PRICE_MAX),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomIntegerNumber(ROOMS_MIN, ROOMS_MAX),
    guests: getRandomIntegerNumber(GUESTS_MIN, GUESTS_MAX),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: createRandomArray(FEATURES),
    description: getRandomArrayElement(DESCRIPTION),
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
