import { categories, items } from './data.js';
import { connectItems } from './graphFunctions.js';

var map = L.map('map', {
  center: [0, 0],
  zoom: 2,
  minZoom: 0,
  maxZoom: 7,
  crs: L.CRS.Simple
});
map.setView([-189.25, 106.125], 3);

L.tileLayer('https://eldenring.wiki.fextralife.com/file/Elden-Ring/map-50be4728-3907-4f33-8857-7f063e0d24eb/map-tiles.4/{z}/{x}/{y}.jpg', {
  minZoom: 0,
  maxZoom: 7,
  continuousWorld: false,
  noWrap: true,
  crs: L.CRS.Simple
}).addTo(map);

var mapSW = [0, 35000];
var mapNE = [35000, 0];
map.setMaxBounds(new L.LatLngBounds(map.unproject(mapSW, map.getMaxZoom()), map.unproject(mapNE, map.getMaxZoom()),));


function addMarkers() {
  items.forEach(item => {

    if ( item.category !== "Site of Grace" )  {
      return;
    }

    let x = Number(item.x);
    let y = Number(item.y);

    const latLng = L.latLng(x, y );
    const marker = new L.Marker(latLng, { title: item.name }).addTo(map);
    marker.bindPopup(`<b>${item.name}</b><br>${item.description}`);
  });
}

addMarkers();


connectItems(items);