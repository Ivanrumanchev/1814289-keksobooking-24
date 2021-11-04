import {isEmpty} from './util.js';

const FEATURE_TYPES = {
  wifi : 'wifi',
  dishwasher : 'dishwasher',
  parking : 'parking',
  washer : 'washer',
  elevator : 'elevator',
  conditioner : 'conditioner',
};

const Default = {
  TYPE : 'any',
  PRICE : 'any',
  ROOMS : 'any',
  GUESTS : 'any',
};

const priceLevel = {
  low : 10000,
  high : 50000,
  define(similarAdPrice) {
    if (isEmpty(similarAdPrice)) {
      return 'any';
    } else if (similarAdPrice < this.low) {
      return 'low';
    } else if (similarAdPrice > this.high) {
      return 'high';
    } else {
      return 'middle';
    }
  },
};

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const filterFeatures = document.querySelector('#housing-features');

const isSelectedFeature = (similarAd, feature, type) => {
  if (feature.checked) {
    if (!isEmpty(similarAd)) {
      return (similarAd.includes(type));
    }
    return false;
  }
  return true;
};

const selectAds = (similarAd) => {
  const typeCurrent = document.querySelector('#housing-type');
  const selectedType = (similarAd.offer.type === typeCurrent.value) || (typeCurrent.value === Default.TYPE);

  const priceCurrent = document.querySelector('#housing-price');
  const similarAdPrice = similarAd.offer.price;
  const selectedPrice = (priceLevel.define(similarAdPrice) === priceCurrent.value) || (priceCurrent.value === Default.PRICE);

  const roomsCurrent = document.querySelector('#housing-rooms');
  const selectedRooms = (similarAd.offer.rooms === +roomsCurrent.value) || (roomsCurrent.value === Default.ROOMS);

  const guestsCurrent = document.querySelector('#housing-guests');
  const selectedGuests = (similarAd.offer.guests === +guestsCurrent.value) || (guestsCurrent.value === Default.GUESTS);

  const similarAdFeatures = similarAd.offer.features;

  const filterWifi = document.querySelector('#filter-wifi');
  const selectedWifi = isSelectedFeature(similarAdFeatures, filterWifi, FEATURE_TYPES.wifi);

  const filterDishwasher = document.querySelector('#filter-dishwasher');
  const selectedDishwasher = isSelectedFeature(similarAdFeatures, filterDishwasher, FEATURE_TYPES.dishwasher);

  const filterParking = document.querySelector('#filter-parking');
  const selectedParking = isSelectedFeature(similarAdFeatures, filterParking, FEATURE_TYPES.parking);

  const filterWasher = document.querySelector('#filter-washer');
  const selectedWasher = isSelectedFeature(similarAdFeatures, filterWasher, FEATURE_TYPES.washer);

  const filterElevator = document.querySelector('#filter-elevator');
  const selectedElevator = isSelectedFeature(similarAdFeatures, filterElevator, FEATURE_TYPES.elevator);

  const filterConditioner = document.querySelector('#filter-conditioner');
  const selectedConditioner = isSelectedFeature(similarAdFeatures, filterConditioner, FEATURE_TYPES.conditioner);

  return (selectedType && selectedPrice && selectedRooms && selectedGuests
    && selectedWifi && selectedDishwasher && selectedParking && selectedWasher && selectedElevator && selectedConditioner);
};

const setHousingTypeChange = (cb) => {
  housingType.addEventListener('change', () => {
    cb();
  });
};

const setHousingPriceChange = (cb) => {
  housingPrice.addEventListener('change', () => {
    cb();
  });
};

const setHousingRoomsChange = (cb) => {
  housingRooms.addEventListener('change', () => {
    cb();
  });
};

const setHousingGuestsChange = (cb) => {
  housingGuests.addEventListener('change', () => {
    cb();
  });
};

const setFilterFeaturesChange = (cb) => {
  filterFeatures.addEventListener('change', () => {
    cb();
  });
};

const compareFeature = (similarAd, feature, type) => {
  if (!isEmpty(similarAd)) {
    if (feature.checked) {
      return similarAd.includes(type);
    }
    return !(similarAd.includes(type));
  }
  return !(feature.checked);
};

// const compareFeature = (similarAd, feature, type) => {
//   if (!isEmpty(similarAd) && (feature.checked)) {
//     return similarAd.includes(type);
//   } else if (isEmpty(similarAd)) {
//     return !(feature.checked);
//   } else {
//     return !(similarAd.includes(type));
//   }
// };

const getAdRank = (similarAd) => {
  const similarAdFeatures = similarAd.offer.features;
  let rank = 0;

  const filterWifi = document.querySelector('#filter-wifi');
  if ( compareFeature(similarAdFeatures, filterWifi, FEATURE_TYPES.wifi) ) {
    rank++;
  }

  const filterDishwasher = document.querySelector('#filter-dishwasher');
  if ( compareFeature(similarAdFeatures, filterDishwasher, FEATURE_TYPES.dishwasher) ) {
    rank++;
  }

  const filterParking = document.querySelector('#filter-parking');
  if ( compareFeature(similarAdFeatures, filterParking, FEATURE_TYPES.parking) ) {
    rank++;
  }

  const filterWasher = document.querySelector('#filter-washer');
  if ( compareFeature(similarAdFeatures, filterWasher, FEATURE_TYPES.washer) ) {
    rank++;
  }

  const filterElevator = document.querySelector('#filter-elevator');
  if ( compareFeature(similarAdFeatures, filterElevator, FEATURE_TYPES.elevator) ) {
    rank++;
  }

  const filterConditioner = document.querySelector('#filter-conditioner');
  if ( compareFeature(similarAdFeatures, filterConditioner, FEATURE_TYPES.conditioner) ) {
    rank++;
  }

  return rank;
};

const compareAds = (adsA, adsB) => {
  const rankA = getAdRank(adsA);
  const rankB = getAdRank(adsB);

  return rankB - rankA;
};

export {selectAds, compareAds, setHousingTypeChange, setHousingPriceChange, setHousingRoomsChange, setHousingGuestsChange, setFilterFeaturesChange};
