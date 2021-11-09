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

const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');

const hasOverlapPrice = (similarAd, price) => {
  switch (price) {
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
  const selectedType = (similarAd.offer.type === typeFilter.value) || (typeFilter.value === Default.TYPE);

  const selectedPrice = hasOverlapPrice(similarAd.offer.price, priceFilter.value);

  const selectedRooms = (similarAd.offer.rooms === +roomsFilter.value) || (roomsFilter.value === Default.ROOMS);

  const selectedGuests = (similarAd.offer.guests === +guestsFilter.value) || (guestsFilter.value === Default.GUESTS);

  const featuresChecked = document.querySelectorAll('#housing-features input:checked');
  const selectedFeatures = hasOverlapFeatures(similarAd.offer.features, featuresChecked);

  return (selectedType && selectedPrice && selectedRooms && selectedGuests && selectedFeatures);
};

export {selectAds};
