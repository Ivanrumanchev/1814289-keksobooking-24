import {isEmpty} from './util.js';

const DEFAULT_VALUE = 'any';
const PRICE_LOW = 10000;
const PRICE_HIGH = 50000;
const PRICE_LEVEL_LOW = 'low';
const PRICE_LEVEL_HIGH = 'high';
const PRICE_LEVEL_MIDDLE = 'middle';

const Default = {
  TYPE : DEFAULT_VALUE,
  PRICE : DEFAULT_VALUE,
  ROOMS : DEFAULT_VALUE,
  GUESTS : DEFAULT_VALUE,
};

// Не очень понял, как тут switch/case применить. У нас же приходит число с сервера, а не значение. Получается, что всё равно надо сравнивать это число
// с уровнями, а в таком случае код становится длиннее..
const definePriceLevel = (similarAdPrice) => {
  if (isEmpty(similarAdPrice)) {
    return DEFAULT_VALUE;
  } else if (similarAdPrice < PRICE_LOW) {
    return PRICE_LEVEL_LOW;
  } else if (similarAdPrice > PRICE_HIGH) {
    return PRICE_LEVEL_HIGH;
  } else {
    return PRICE_LEVEL_MIDDLE;
  }
};

const hasOverlapFeatures = (similarAd, features) => {
  let hasOverlap;

  if (isEmpty(features)) {
    hasOverlap = false;
  } else {
    hasOverlap = Array.from(features).every((feature) => {
      if (!isEmpty(similarAd)) {
        return (similarAd.includes(feature.value));
      }
      return false;
    });
  }

  return hasOverlap;
};

const selectAds = (similarAd) => {
  const typeCurrent = document.querySelector('#housing-type');
  const selectedType = (similarAd.offer.type === typeCurrent.value) || (typeCurrent.value === Default.TYPE);

  const priceCurrent = document.querySelector('#housing-price');
  const similarAdPrice = similarAd.offer.price;
  const selectedPrice = (definePriceLevel(similarAdPrice) === priceCurrent.value) || (priceCurrent.value === Default.PRICE);

  const roomsCurrent = document.querySelector('#housing-rooms');
  const selectedRooms = (similarAd.offer.rooms === +roomsCurrent.value) || (roomsCurrent.value === Default.ROOMS);

  const guestsCurrent = document.querySelector('#housing-guests');
  const selectedGuests = (similarAd.offer.guests === +guestsCurrent.value) || (guestsCurrent.value === Default.GUESTS);

  const similarAdFeatures = similarAd.offer.features;
  const featuresChecked = document.querySelectorAll('#housing-features input:checked');
  const emptyBoth = isEmpty(featuresChecked) && isEmpty(similarAdFeatures);
  const selectedFeatures = (emptyBoth) ? true : hasOverlapFeatures(similarAdFeatures, featuresChecked);

  return (selectedType && selectedPrice && selectedRooms && selectedGuests && selectedFeatures);
};

export {selectAds};
