import {disableForm, enableForm, setResetButton, adFormList, mapFiltersList, address, resetButton} from './form.js';
import {createSuccessPopup, createErrorPopup} from './popup.js';
import {createMap, CENTER_COORDINATES, mainMarker, createMarker, fillingMap, resetMap} from './map.js';
import {getAds, sendAd} from './api.js';
import {showAlert} from './util.js';

const ADS_COUNT = 10;

disableForm(adFormList);
disableForm(mapFiltersList);

const map = createMap();

map.on('load', () => {
  address.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`;

  mainMarker.on('move', (evt) => {
    address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  enableForm(adFormList);

  const commonMarkerGroup = L.layerGroup().addTo(map);

  getAds(
    (similarAds) => {
      similarAds.slice(0, ADS_COUNT).forEach((similarAd) => {
        createMarker(similarAd, commonMarkerGroup);
      });
      enableForm(mapFiltersList);
    },
    (message) => showAlert(message),
  );
});

fillingMap(map);

const setAdFormSubmit = () => {
  adFormList.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendAd(
      () => {
        resetButton.click();
        createSuccessPopup();
      },
      () => createErrorPopup(),
      new FormData(evt.target),
    );
  });
};

setAdFormSubmit();

setResetButton(resetMap(map), CENTER_COORDINATES);
