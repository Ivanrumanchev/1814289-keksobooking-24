import {isEmpty} from './util.js';

const DEFAULT_VALUE = 'any';
const PRICE_LOW = 10000;
const PRICE_HIGH = 50000;
const PRICE_LEVEL_LOW = 'low';
const PRICE_LEVEL_HIGH = 'high';
const PRICE_LEVEL_MIDDLE = 'middle';

const Default = {
  TYPE : DEFAULT_VALUE,
  ROOMS : DEFAULT_VALUE,
  GUESTS : DEFAULT_VALUE,
};

const hasOverlapPrice = (similarAd, priceCurrent) => {
  switch (priceCurrent) {
    case PRICE_LEVEL_LOW : return (similarAd < PRICE_LOW);
    case PRICE_LEVEL_HIGH : return (similarAd > PRICE_HIGH);
    case PRICE_LEVEL_MIDDLE : return ((similarAd > PRICE_LOW) && (similarAd < PRICE_HIGH));
    default : return true;
  }
};

const hasOverlapFeatures = (similarAd, features) => {
  if ( isEmpty(features) && isEmpty(similarAd) ) {
    return true;
  } else if ( isEmpty(similarAd) ) {
    return false;
  }
  return Array.from(features).every( (feature) => similarAd.includes(feature.value) );
};

const selectAds = (similarAd) => {
  const typeCurrent = document.querySelector('#housing-type');
  const selectedType = (similarAd.offer.type === typeCurrent.value) || (typeCurrent.value === Default.TYPE);

  const priceCurrent = document.querySelector('#housing-price');
  const selectedPrice = hasOverlapPrice(similarAd.offer.price, priceCurrent.value);

  const roomsCurrent = document.querySelector('#housing-rooms');
  const selectedRooms = (similarAd.offer.rooms === +roomsCurrent.value) || (roomsCurrent.value === Default.ROOMS);

  const guestsCurrent = document.querySelector('#housing-guests');
  const selectedGuests = (similarAd.offer.guests === +guestsCurrent.value) || (guestsCurrent.value === Default.GUESTS);

  const featuresChecked = document.querySelectorAll('#housing-features input:checked');
  const selectedFeatures = hasOverlapFeatures(similarAd.offer.features, featuresChecked);

  return (selectedType && selectedPrice && selectedRooms && selectedGuests && selectedFeatures);
};

export {selectAds};
