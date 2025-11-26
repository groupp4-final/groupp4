//Center to Texas
var mymap = L.map('map').setView([31.9686, -99.9018], 6);
//add basemap
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);

var alibatesFQicon = L.marker([35.5822153, -101.6734219]).addTo(mymap)

var amistadNRArea = L.marker([29.5353727, -101.0756701]).addTo(mymap)

var bigbendNPark = L.marker([29.2499012, -103.2501638]).addTo(mymap)

var bigthicketNP = L.marker([30.4583071, -94.3872437]).addTo(mymap)

var chamizalNM = L.marker([31.7672409, -106.4543374]).addTo(mymap)

var fortdavisNHS = L.marker([30.5988071, -103.8954292]).addTo(mymap)

var guadalupeMtnNP = L.marker([31.9122176, -104.8815637]).addTo(mymap)

var lakemeredithNRA = L.marker([35.6438006, -101.5863048]).addTo(mymap)

var lyndonBJohnsonNHP = L.marker([30.2425123, -98.6085090]).addTo(mymap)

var padreislandNS = L.marker([27.0855137, -97.3841147]).addTo(mymap)

var paloaltobattleNHP = L.marker([26.0167821, -97.4790262]).addTo(mymap)

var riograndeWSR = L.marker([29.5974902, -102.7405281]).addTo(mymap)

var saMissionsNHP = L.marker([29.3292707, -98.4535781]).addTo(mymap)

var wacoMammothNM = L.marker([31.6067336, -97.1758392]).addTo(mymap)
