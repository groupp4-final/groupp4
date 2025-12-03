//keeps buffer circle so it can be resized when moved
const bufferCircles = [];
//keep park markers so when search it zooms to them
const parkMarkers = {};

//All 14 areas with latitude/longitude, official website,name, and images linked
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

//add a marker of park and buffer of 5km
function addPark(park, bufferKm = 5) {
//creates map marker
  const marker = L.marker([park.lat, park.lng]).addTo(map)
    .bindPopup(
      '<strong>' + park.name + '</strong><br>' +
      '<img src="' + park.img + '" style="width:200px; border-radius:6px; margin:5px 0;"><br>' +
      '<a href="' + park.url + '" target="_blank">Website</a>'
    );
//stores marker
parkMarkers[park.name] = marker;

//creates a blue buffer circle around 5 km radius using their latitude and longitude
  const circle = L.circle([park.lat, park.lng], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.1,
    radius: bufferKm * 1000 //converts to meter
  })
  .bindPopup('<strong>' + park.name + ' Buffer</strong><br>Radius: ' + bufferKm + ' km')
  .addTo(map);
//stores circle buffer
  bufferCircles.push(circle);
}
//adds all parks to map
parks.forEach(p => addPark(p));

//gets buffer slide id
const slider = document.getElementById("bufferSlider");
//gets radiusValue id from html
const radiusLabel = document.getElementById("radiusValue");
//gets input and moves when sliding
slider.addEventListener("input", function() {
//gets number and keep as km
const km = parseInt(this.value);
//changes text given to  km result instant
radiusLabel.textContent = km;
//holds all buffers for all 14 parks to update to meters
bufferCircles.forEach(circle => circle.setRadius(km * 1000));
});

//gets parkSearch from html
const searchInput = document.getElementById("parkSearch");
//gets searchResults from html
const resultsBox = document.getElementById("searchResults");
//listens to when user is  typing on search bar
searchInput.addEventListener("input", function() {
//gets what is typed in search bar converts to lowercase
const query = this.value.toLowerCase();
//clears previous results
resultsBox.innerHTML = "";
//if search bar empty results are hidden and stop function
if (!query) {
resultsBox.style.display = "none";
return;
}
//searches parks and finds a match to what is typed
const matches = parks.filter(p => p.name.toLowerCase().includes(query));
//if no results match returns none
if (matches.length === 0) {
resultsBox.style.display = "none";
return;
}
//dropdown list
resultsBox.style.display = "block";
//goes through each park that is a match
matches.forEach(p => {
//create a result that is clickable with curser from div element
const div = document.createElement("div");
div.textContent = p.name;
div.style.padding = "5px";
div.style.cursor = "pointer";

//when clicked at result it finds the marker
div.addEventListener("click", () => {
  const marker = parkMarkers[p.name];
//sets the view to parl result, open pop up, clears seach box and hides result
  map.setView([p.lat, p.lng], 11);
  marker.openPopup();
  resultsBox.style.display = "none";
  searchInput.value = "";
});

resultsBox.appendChild(div);


});
});

//gets the geoJSON county boundary from github
fetch("https://raw.githubusercontent.com/groupp4-final/groupp4/main/Texas_County_Boundaries_-2028607862104916578.geojson")
//turns into javascript
  .then(response => response.json())
  .then(data => {
//creates map layer from the geoJSON
    const countiesLayer = L.geoJSON(data, {
//defines style for counties: dark orange border, grey fill color, border tickness:1, transparency:30%
      style: {
        color: "#e31a1c",
        weight: 1,
        fillColor: "#cccccc",
        fillOpacity: 0.3
      },
//runs code on every pologon feature
      onEachFeature: (feature, layer) => {
//gets county name from geoJSON
        const name = feature.properties.NAME || feature.properties.County || "Unknown County";
        layer.bindPopup('<strong>County:</strong> ' + name);
      }
//adds to opentopomap
    }).addTo(map);

  })
//if this fails print "failed to load counties"
  .catch(err => console.error("Failed to load counties", err));
