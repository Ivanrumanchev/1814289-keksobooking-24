import {disableForm, enableForm, adFormList, mapFiltersList} from './form.js';
import {createAds} from './data.js';
import {createMap, CENTER_COORDINATES, mainMarker, createMarker, fillingMap} from './map.js';


const address = document.querySelector('#address');

disableForm(adFormList);
disableForm(mapFiltersList);

const map = createMap();

let mapLoaded = false;
map.on('load', () => {
  address.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`;
  mapLoaded = true;
});

fillingMap(map);

if (mapLoaded) {
  mainMarker.on('move', (evt) => {
    address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  window.onload = () => {
    enableForm(adFormList);

    const similarAds = createAds();
    const commonMarkerGroup = L.layerGroup().addTo(map);
    similarAds.forEach((similarAd) => {
      createMarker(similarAd, commonMarkerGroup);
    });

    enableForm(mapFiltersList);
  };
}
