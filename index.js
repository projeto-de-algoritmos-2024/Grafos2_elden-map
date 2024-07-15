import { categories, items } from './data.js';
import { connectItems, prim } from './graphFunctions.js';

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

const customIcon = L.icon({
  iconUrl: './grace.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function addMarkers(category) {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker || layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });

  items.forEach(item => {
    if (item.category !== category) {
      return;
    }

    let x = Number(item.x);
    let y = Number(item.y);

    const latLng = L.latLng(x, y);
    const marker = new L.Marker(latLng, { title: item.name, icon: customIcon }).addTo(map);
    marker.bindPopup(`<b>${item.name}</b><br>${item.description}`);
  });

  const graph = connectItems(items, category);
  const { mstCost, mstEdges } = prim(graph);
  console.log("Custo total do MST:", mstCost);
  console.log("Arestas do MST:", mstEdges);

  for (let edge of mstEdges) {
    const node1 = items.find(item => item.id === edge[0]);
    const node2 = items.find(item => item.id === edge[1]);
    const latLng1 = L.latLng(node1.x, node1.y);
    const latLng2 = L.latLng(node2.x, node2.y);
    const polyline = L.polyline([latLng1, latLng2], { color: 'red' }).addTo(map);
    polyline.bindPopup(`Custo: ${edge.weight}`);
  }
}

function populateCategories() {
  const categorySelect = document.getElementById('categorySelect');
  let defaultCategory = null;

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    categorySelect.appendChild(option);

    if (category.loadDefault) {
      defaultCategory = category.name;
    }
  });

  return defaultCategory;
}

document.getElementById('updateMap').addEventListener('click', () => {
  const selectedCategory = document.getElementById('categorySelect').value;
  addMarkers(selectedCategory);
});

const defaultCategory = populateCategories();
addMarkers(defaultCategory);
