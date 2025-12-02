import { addBasemaps } from "./basemaps.js";

// Create the map
const map = L.map("map").setView([31.0, -99.0], 6);

// Add basemaps
addBasemaps(map);

// NPS locations with coordinates and URLs
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

// Function to add park marker and buffer
function addPark(lat, lng, name, url, bufferKm = 5){
  // Convert km to meters
  const radiusMeters = bufferKm * 1000;

  // Add marker
  const marker = L.marker([lat, lng]).addTo(map)
    .bindPopup(`<strong>${name}</strong><br><a href="${url}" target="_blank">Website</a>`);

  // Add buffer circle
  const buffer = L.circle([lat, lng], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.1,
    radius: radiusMeters
  }).addTo(map);

  buffer.bindPopup(`<strong>${name} Buffer</strong><br>Radius: ${bufferKm} km`);
}

// Example: Add all parks with default 5 km buffer
parks.forEach(park => {
  addPark(park.lat, park.lng, park.name, park.url, 5); // default 5 km
});

// Optional: make buffer size user-controlled
function setCustomBuffers(bufferKm){
  map.eachLayer(layer => {
    if(layer instanceof L.Circle){
      layer.setRadius(bufferKm * 1000); // update radius in meters
    }
  });
}

// Example: change all buffers to 10 km
// setCustomBuffers(10);

