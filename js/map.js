import {disableForm, enableForm, adFormList, mapFiltersList} from './form.js';
import {createAds} from './data.js';
import {createCustomPopup} from './popup.js';

const CENTER_COORDINATES = {
  lat: 35.68950,
  lng: 139.69171,
};

const MAIN_PIN_ICON_URL = 'img/main-pin.svg';
const COMMON_PIN_ICON_URL = 'img/pin.svg';
const MAIN_PIN_ICON_WIDTH = 52;
const MAIN_PIN_ICON_HEIGHT = 52;
const COMMON_PIN_ICON_WIDTH = 40;
const COMMON_PIN_ICON_HEIGHT = 40;
const SCALE = 9;

const address = document.querySelector('#address');

disableForm(adFormList);
disableForm(mapFiltersList);

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm(adFormList);
    enableForm(mapFiltersList);
    address.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`;
  })
  .setView(CENTER_COORDINATES, SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const createPinIcon = (pinIconWidth, pinIconHeight, url) => {
  const pinIcon = L.icon({
    iconUrl: url,
    shadowUrl: 'leaflet/images/marker-shadow.png',
    iconSize: [pinIconWidth, pinIconHeight],
    shadowSize: [pinIconWidth, pinIconHeight],
    iconAnchor: [pinIconWidth / 2, pinIconHeight],
    shadowAnchor: [pinIconWidth / 3.2, pinIconHeight],
  });
  return pinIcon;
};

const mainPinIcon = createPinIcon(MAIN_PIN_ICON_WIDTH, MAIN_PIN_ICON_HEIGHT, MAIN_PIN_ICON_URL);

const mainMarker = L.marker(
  CENTER_COORDINATES,
  {
    icon: mainPinIcon,
    draggable: true,
  },
);

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const commonMarkerGroup = L.layerGroup().addTo(map);
const commonPinIcon = createPinIcon(COMMON_PIN_ICON_WIDTH, COMMON_PIN_ICON_HEIGHT, COMMON_PIN_ICON_URL);
const similarAds = createAds();

const createMarker = (similarAd) => {
  const lat = similarAd.location.lat;
  const lng = similarAd.location.lng;
  const commonMarker = L.marker({
    lat,
    lng,
  },
  {
    icon: commonPinIcon,
  });

  commonMarker
    .addTo(commonMarkerGroup)
    .bindPopup(createCustomPopup(similarAd));
};

similarAds.forEach((similarAd) => {
  createMarker(similarAd);
});
