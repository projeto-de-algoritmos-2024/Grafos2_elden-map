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


const graph = connectItems(items);

const { mstCost, mstEdges } = prim(graph);
console.log("Custo total do MST:", mstCost);
console.log("Arestas do MST:", mstEdges);

for (let edge of mstEdges) {
  console.log(edge);
  console.log(edge[0]);
  const node1 = items.find(item => item.id === edge[0]);
  const node2 = items.find(item => item.id === edge[1]);
  const latLng1 = L.latLng(node1.x, node1.y);
  const latLng2 = L.latLng(node2.x, node2.y);
  const polyline = L.polyline([latLng1, latLng2], { color: 'red' }).addTo(map);
  polyline.bindPopup(`Custo: ${edge.weight}`);
}
