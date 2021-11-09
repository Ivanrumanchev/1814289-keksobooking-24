import {createCustomPopup} from './popup.js';

const MAIN_PIN_ICON_URL = 'img/main-pin.svg';
const COMMON_PIN_ICON_URL = 'img/pin.svg';
const SHADOW_PIN_URL = 'leaflet/images/marker-shadow.png';
const MAIN_PIN_ICON_WIDTH = 52;
const MAIN_PIN_ICON_HEIGHT = 52;
const COMMON_PIN_ICON_WIDTH = 40;
const COMMON_PIN_ICON_HEIGHT = 40;
const SCALE = 12;

const CENTER_COORDINATES = {
  lat: 35.68950,
  lng: 139.69171,
};

const createPinIcon = (pinIconWidth, pinIconHeight, url) => {
  const pinIcon = L.icon({
    iconUrl: url,
    shadowUrl: SHADOW_PIN_URL,
    iconSize: [pinIconWidth, pinIconHeight],
    shadowSize: [pinIconWidth, pinIconHeight],
    iconAnchor: [pinIconWidth / 2, pinIconHeight],
    shadowAnchor: [pinIconWidth / 3.2, pinIconHeight],
  });
  return pinIcon;
};

const createMarker = (similarAd, markerGroup) => {
  const commonPinIcon = createPinIcon(COMMON_PIN_ICON_WIDTH, COMMON_PIN_ICON_HEIGHT, COMMON_PIN_ICON_URL);
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
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(similarAd));
};

const mainPinIcon = createPinIcon(MAIN_PIN_ICON_WIDTH, MAIN_PIN_ICON_HEIGHT, MAIN_PIN_ICON_URL);

const mainMarker = L.marker(
  CENTER_COORDINATES,
  {
    icon: mainPinIcon,
    draggable: true,
  },
);

const createMap = () => L.map('map-canvas', { 'tap': false });

const fillingMap = (map) => {
  map.setView(CENTER_COORDINATES, SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);
};

const resetMap = (map) => {
  map.setView(CENTER_COORDINATES, SCALE);
  mainMarker.setLatLng(CENTER_COORDINATES);
  map.closePopup();
};

export {CENTER_COORDINATES, mainMarker, createMarker, createMap, fillingMap, resetMap};
