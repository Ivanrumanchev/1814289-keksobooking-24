import {createAds} from './data.js';
import {isEmpty, hideElement} from './util.js';

const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplatePopup = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const similarAds = createAds();

const popups = [];

similarAds.forEach( (similarAd) => {
  const popup = cardTemplatePopup.cloneNode(true);

  const popupTitle = popup.querySelector('.popup__title');
  if (!isEmpty(similarAd.offer.title)) {
    popupTitle.textContent = similarAd.offer.title;
  } else {
    hideElement(popupTitle);
  }

  const popupAddress = popup.querySelector('.popup__text--address');
  if (!isEmpty(similarAd.offer.address)) {
    popupAddress.textContent = similarAd.offer.address;
  } else {
    hideElement(popupAddress);
  }

  const popupPrice = popup.querySelector('.popup__text--price');
  if (!isEmpty(similarAd.offer.price)) {
    popupPrice.innerHTML = `${similarAd.offer.price} <span>₽/ночь</span>`;
  } else {
    hideElement(popupPrice);
  }

  const popupType = popup.querySelector('.popup__type');
  if (!isEmpty(similarAd.offer.type)) {
    popupType.textContent = TYPES[similarAd.offer.type];
  } else {
    hideElement(popupType);
  }

  const popupCapacity = popup.querySelector('.popup__text--capacity');
  if (!isEmpty(similarAd.offer.rooms) && !isEmpty(similarAd.offer.guests)) {
    popupCapacity.textContent = `${similarAd.offer.rooms} комнаты для ${similarAd.offer.guests} гостей`;
  } else {
    hideElement(popupCapacity);
  }

  const popupTime = popup.querySelector('.popup__text--time');
  if (!isEmpty(similarAd.offer.checkin) && !isEmpty(similarAd.offer.checkout)) {
    popupTime.textContent = `Заезд после ${similarAd.offer.checkin}, выезд до ${similarAd.offer.checkout}`;
  } else {
    hideElement(popupTime);
  }

  const similarAdsFeatures = similarAd.offer.features;
  const popupFeaturesList = popup.querySelector('.popup__features');
  const popupFeatures = popupFeaturesList.querySelectorAll('.popup__feature');
  if (!isEmpty(similarAdsFeatures)) {
    popupFeatures.forEach((popupFeature) => {
      const isNecessary = similarAdsFeatures.some(
        (similarAdsFeature) => popupFeature.classList.contains(`popup__feature--${similarAdsFeature}`),
      );

      if (!isNecessary) {
        popupFeature.remove();
      }
    });
  } else {
    hideElement(popupFeaturesList);
  }

  const popupDescription = popup.querySelector('.popup__description');
  if (!isEmpty(similarAd.offer.description)) {
    popupDescription.textContent = similarAd.offer.description;
  } else {
    hideElement(popupDescription);
  }

  const popupPhotosList = popup.querySelector('.popup__photos');
  const popupPhoto = popupPhotosList.querySelector('.popup__photo');
  if (!isEmpty(similarAd.offer.photos)) {
    for (const photo of similarAd.offer.photos) {
      const photoClone = popupPhoto.cloneNode(true);
      photoClone.src = photo;
      popupPhotosList.appendChild(photoClone);
    }
    popupPhoto.remove();
  } else {
    hideElement(popupPhotosList);
  }

  const popupAvatar = popup.querySelector('.popup__avatar');
  if (!isEmpty(similarAd.author.avatar)) {
    popupAvatar.src = similarAd.author.avatar;
  } else {
    hideElement(popupAvatar);
  }

  popups.push(popup);
});

mapCanvas.appendChild(popups[0]);
