


// Parks data
const parks = [
  { name: "Guadalupe Mountains NP", lat: 31.912, lng: -104.881, url: "https://www.nps.gov/gumo/index.htm" },
  { name: "Big Bend NP", lat: 29.249, lng: -103.250, url: "https://www.nps.gov/bibe/index.htm" },
  { name: "Chamizal NM", lat: 31.767, lng: -106.454, url: "https://www.nps.gov/cham/index.htm" },
  { name: "Fort Davis NHS", lat: 30.598, lng: -103.895, url: "https://www.nps.gov/foda/index.htm" },
  { name: "Rio Grande WSR", lat: 29.597, lng: -102.740, url: "https://www.nps.gov/rigr/index.htm" },
  { name: "Amistad NRA", lat: 29.535, lng: -101.075, url: "https://www.nps.gov/amis/index.htm" },
  { name: "San Antonio Missions NHP", lat: 29.329, lng: -98.453, url: "https://www.nps.gov/saan/index.htm" },
  { name: "Lyndon B. Johnson NHP", lat: 30.242, lng: -98.608, url: "https://www.nps.gov/lyjo/index.htm" },
  { name: "Waco Mammoth NM", lat: 31.606, lng: -97.175, url: "https://www.nps.gov/waco/index.htm" },
  { name: "Alibates Flint Quarries NM", lat: 35.582, lng: -101.673, url: "https://www.nps.gov/alfl/index.htm" },
  { name: "Lake Meredith NRA", lat: 35.643, lng: -101.586, url: "https://www.nps.gov/lamr/index.htm" },
  { name: "Big Thicket NP", lat: 30.458, lng: -94.387, url: "https://www.nps.gov/bith/index.htm" },
  { name: "Padre Island NS", lat: 27.085, lng: -97.384, url: "https://www.nps.gov/pais/index.htm" },
  { name: "Palo Alto Battlefield NHP", lat: 26.016, lng: -97.479, url: "https://www.nps.gov/paal/index.htm" }
];

// Store buffer circles
const bufferCircles = [];

// Function to add marker + buffer
function addPark(lat, lng, name, url, bufferKm){
  const radius = bufferKm * 1000; // km to meters
  L.marker([lat, lng]).addTo(map)
    .bindPopup(`<strong>${name}</strong><br><a href="${url}" target="_blank">Website</a>`);
  const circle = L.circle([lat, lng], {
    color:"blue",
    fillColor:"blue",
    fillOpacity:0.1,
    radius
  }).bindPopup(`<strong>${name} Buffer</strong><br>Radius: ${bufferKm} km`)
    .addTo(map);
  bufferCircles.push(circle);
}

// Initial 5 km buffer
parks.forEach(p => addPark(p.lat, p.lng, p.name, p.url, 5));

// Slider functionality
const slider = document.getElementById("bufferSlider");
const radiusLabel = document.getElementById("radiusValue");

slider.addEventListener("input", function(){
  const radiusKm = parseInt(this.value);
  radiusLabel.textContent = radiusKm;
  bufferCircles.forEach(circle => circle.setRadius(radiusKm * 1000));
});
// ------------------------------
// SEARCH QUERY FUNCTIONALITY
// ------------------------------
const searchInput = document.getElementById("parkSearch");
const resultsBox = document.getElementById("searchResults");

// Save marker references
const parkMarkers = {};

parks.forEach(p => {
  const marker = L.marker([p.lat, p.lng]).addTo(map)
    .bindPopup(`<strong>${p.name}</strong><br><a href="${p.url}" target="_blank">Website</a>`);

  // store markers for search/zoom use
  parkMarkers[p.name] = marker;
});

// Search event
searchInput.addEventListener("input", function () {
  const text = this.value.toLowerCase();
  resultsBox.innerHTML = "";
  
  if (text.length === 0) {
    resultsBox.style.display = "none";
    return;
  }

  // Find matches
  const matches = parks.filter(p => p.name.toLowerCase().includes(text));

  if (matches.length === 0) {
    resultsBox.style.display = "none";
    return;
  }

  // Show results
  resultsBox.style.display = "block";
  matches.forEach(m => {
    const item = document.createElement("div");
    item.textContent = m.name;
    item.style.padding = "5px";
    item.style.cursor = "pointer";

    // Zoom to park on click
    item.addEventListener("click", () => {
      const marker = parkMarkers[m.name];
      map.setView([m.lat, m.lng], 11);
      marker.openPopup();
      resultsBox.style.display = "none";
      searchInput.value = "";
    });

    resultsBox.appendChild(item);
  });
});
npsPolygons.forEach(site => {
  const polygon = L.polygon(site.coords, {
    color: "red",
    weight: 2,
    fillOpacity: 1
  }).addTo(map);

  polygon.bindPopup(site.name);
});





//npsPolygons.forEach(site => {
//  const polygon = L.polygon(site.coords, {
//    color: "red",
//    weight: 2,
//    fillOpacity: 1
//  }).addTo(map);

//  polygon.bindPopup(site.name);
//});



fetch("https://raw.githubusercontent.com/groupp4-final/groupp4/main/TPWD_StateParksBoundary.geojson")

  .then(response => response.json())
  .then(data => {


    function parkStyle(feature) {
      return {
        color: "#1e90ff",
        weight: 2,
        fillColor: "#87cefa",
        fillOpacity: 0.35
      };
    }

    function highlightFeature(e) {
      var layer = e.target;
      layer.setStyle({
        weight: 3,
        color: "#000",
        fillOpacity: 0.5
      });
    }

    function resetHighlight(e) {
      parksLayer.resetStyle(e.target);
    }


    function onEachPark(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
      });

      let name = feature.properties.PARK_NAME ||
                 feature.properties.NAME ||
                 "Unnamed Park";

      layer.bindPopup(`<strong>${name}</strong>`);
    }


    parksLayer = L.geoJSON(data, {
      style: parkStyle,
      onEachFeature: onEachPark
    }).addTo(map);


    L.control.layers(null, {
      "Texas State Parks (Boundaries)": parksLayer
    }).addTo(map);

  })
  .catch(err => console.error("Failed to load TPWD State Parks Boundary GeoJSON:", err));
