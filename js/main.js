import {disableForm, enableForm, setResetButton, setFilterChange, adFormList, mapFiltersList, address, resetButton} from './form.js';
import {createSuccessPopup, createErrorPopup} from './popup.js';
import {createMap, createMarker, CENTER_COORDINATES, mainMarker, fillMap, resetMap} from './map.js';
import {getAds, sendAd} from './api.js';
import {showAlert, debounce} from './util.js';
import {selectAds} from './similar-ads.js';
import './input-type-file.js';

const ADS_COUNT = 10;
const RERENDER_DELAY = 500;

const renderSimilarAds = (similarAds, markerGroup) => {
  markerGroup.clearLayers();
  similarAds
    .slice()
    .filter(selectAds)
    .slice(0, ADS_COUNT)
    .forEach((similarAd) => {
      createMarker(similarAd, markerGroup);
    });
};

disableForm(adFormList);
disableForm(mapFiltersList);

const map = createMap();
const commonMarkerGroup = L.layerGroup().addTo(map);

map.on('load', () => {
  address.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`;

  mainMarker.on('move', (evt) => {
    address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  enableForm(adFormList);

  getAds(
    (similarAds) => {
      renderSimilarAds(similarAds, commonMarkerGroup);
      setFilterChange( debounce( () => renderSimilarAds(similarAds, commonMarkerGroup), RERENDER_DELAY) );
      setResetButton( () => resetMap(map), CENTER_COORDINATES, debounce( () => renderSimilarAds(similarAds, commonMarkerGroup), RERENDER_DELAY) );
      enableForm(mapFiltersList);
    },
    (message) => {
      showAlert(message);
      setResetButton( () => resetMap(map), CENTER_COORDINATES);
    },
  );
});

fillMap(map);

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
