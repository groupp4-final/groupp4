const bufferCircles = [];
const parkMarkers = {};


const parks = [
{ name: "Guadalupe Mountains NP", lat: 31.912, lng: -104.881, url: "[https://www.nps.gov/gumo/index.htm](https://www.nps.gov/gumo/index.htm)", img: "groupp4/images/Guadalupe.jpg" },
{ name: "Big Bend NP", lat: 29.249, lng: -103.250, url: "[https://www.nps.gov/bibe/index.htm](https://www.nps.gov/bibe/index.htm)", img: "groupp4/images/Big_Bend2.jpg" },
{ name: "Chamizal NM", lat: 31.767, lng: -106.454, url: "[https://www.nps.gov/cham/index.htm](https://www.nps.gov/cham/index.htm)", img: "groupp4/images/Chamizal.jpg" },
{ name: "Fort Davis NHS", lat: 30.598, lng: -103.895, url: "[https://www.nps.gov/foda/index.htm](https://www.nps.gov/foda/index.htm)", img: "groupp4/images/Fort_Davis.jpg" },
{ name: "Rio Grande WSR", lat: 29.597, lng: -102.740, url: "[https://www.nps.gov/rigr/index.htm](https://www.nps.gov/rigr/index.htm)", img: "groupp4/images/Rio_Grande.jpg" },
{ name: "Amistad NRA", lat: 29.535, lng: -101.075, url: "[https://www.nps.gov/amis/index.htm](https://www.nps.gov/amis/index.htm)", img: "groupp4/images/Amistad.jpg" },
{ name: "San Antonio Missions NHP", lat: 29.329, lng: -98.453, url: "[https://www.nps.gov/saan/index.htm](https://www.nps.gov/saan/index.htm)", img: "groupp4/images/San_Antonio.jpg" },
{ name: "Lyndon B. Johnson NHP", lat: 30.242, lng: -98.608, url: "[https://www.nps.gov/lyjo/index.htm](https://www.nps.gov/lyjo/index.htm)", img: "groupp4/images/LBJ.jpg" },
{ name: "Waco Mammoth NM", lat: 31.606, lng: -97.175, url: "[https://www.nps.gov/waco/index.htm](https://www.nps.gov/waco/index.htm)", img: "groupp4/images/Waco_Mammoth.jpg" },
{ name: "Alibates Flint Quarries NM", lat: 35.582, lng: -101.673, url: "[https://www.nps.gov/alfl/index.htm](https://www.nps.gov/alfl/index.htm)", img: "groupp4/images/Alibates.jpg" },
{ name: "Lake Meredith NRA", lat: 35.643, lng: -101.586, url: "[https://www.nps.gov/lamr/index.htm](https://www.nps.gov/lamr/index.htm)", img: "groupp4/images/Lake_Meredith.jpg" },
{ name: "Big Thicket NP", lat: 30.458, lng: -94.387, url: "[https://www.nps.gov/bith/index.htm](https://www.nps.gov/bith/index.htm)", img: "groupp4/images/Big_Thicket.jpg" },
{ name: "Padre Island NS", lat: 27.085, lng: -97.384, url: "[https://www.nps.gov/pais/index.htm](https://www.nps.gov/pais/index.htm)", img: "groupp4/images/Padre_Island.jpg" },
{ name: "Palo Alto Battlefield NHP", lat: 26.016, lng: -97.479, url: "[https://www.nps.gov/paal/index.htm](https://www.nps.gov/paal/index.htm)", img: "groupp4/images/Palo_Alto.jpg" }
];


function addPark(park, bufferKm = 5) {
const marker = L.marker([park.lat, park.lng]).addTo(map)
.bindPopup(`       <strong>${park.name}</strong><br>       <img src="${park.img}" style="width:200px; border-radius:6px; margin:5px 0;"><br>       <a href="${park.url}" target="_blank">Website</a>
    `);

parkMarkers[park.name] = marker;

const circle = L.circle([park.lat, park.lng], {
color: "blue",
fillColor: "blue",
fillOpacity: 0.1,
radius: bufferKm * 1000
}).bindPopup(`<strong>${park.name} Buffer</strong><br>Radius: ${bufferKm} km`).addTo(map);

bufferCircles.push(circle);
}


parks.forEach(p => addPark(p));


const slider = document.getElementById("bufferSlider");
const radiusLabel = document.getElementById("radiusValue");
slider.addEventListener("input", function() {
const km = parseInt(this.value);
radiusLabel.textContent = km;
bufferCircles.forEach(circle => circle.setRadius(km * 1000));
});


const searchInput = document.getElementById("parkSearch");
const resultsBox = document.getElementById("searchResults");

searchInput.addEventListener("input", function() {
const query = this.value.toLowerCase();
resultsBox.innerHTML = "";

if (!query) {
resultsBox.style.display = "none";
return;
}

const matches = parks.filter(p => p.name.toLowerCase().includes(query));
if (matches.length === 0) {
resultsBox.style.display = "none";
return;
}

resultsBox.style.display = "block";
matches.forEach(p => {
const div = document.createElement("div");
div.textContent = p.name;
div.style.padding = "5px";
div.style.cursor = "pointer";

```
div.addEventListener("click", () => {
  const marker = parkMarkers[p.name];
  map.setView([p.lat, p.lng], 11);
  marker.openPopup();
  resultsBox.style.display = "none";
  searchInput.value = "";
});

resultsBox.appendChild(div);
```

});
});


fetch("[https://raw.githubusercontent.com/groupp4-final/groupp4/main/Texas_County_Boundaries_-2028607862104916578.geojson](https://raw.githubusercontent.com/groupp4-final/groupp4/main/Texas_County_Boundaries_-2028607862104916578.geojson)")
.then(res => res.json())
.then(data => {
L.geoJSON(data, {
style: { color: "#333", weight: 1, fillColor: "#ccc", fillOpacity: 0.3 },
onEachFeature: (feature, layer) => {
const name = feature.properties.NAME || feature.properties.County || "Unknown County";
layer.bindPopup(`<strong>County:</strong> ${name}`);
}
}).addTo(map);
})
.catch(err => console.error("Failed to load counties GeoJSON:", err));

