import {getRandomIntegerNumber, getRandomDottedNumber, getRandomArrayElement, createRandomArray} from './util.js';

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
  for (let id = 1; id <= ADS_COUNT; id++) {
    const num = (id < 10) ? `0${id}` : `${id}`;
    array.push(`img/avatars/user${num}.png`);
  }
  return array;
};

const avatars = getAvatars();

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

export {ads};
