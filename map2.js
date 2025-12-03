


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




fetch("https://raw.githubusercontent.com/groupp4-final/groupp4/main/Texas_County_Boundaries_-2028607862104916578.geojson")
  .then(response => response.json())
  .then(data => {
    const countiesLayer = L.geoJSON(data, {
      style: {
        color: "#333",
        weight: 1,
        fillColor: "#cccccc",
        fillOpacity: 0.3
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.NAME || feature.properties.County || "Unknown County";
        layer.bindPopup(`<strong>County:</strong> ${name}`);
      }
    }).addTo(map);

    // Optionally add to layer control:
    // L.control.layers(null, { "Texas Counties": countiesLayer }).addTo(map);
  })
  .catch(err => console.error("Failed to load counties GeoJSON:", err));
