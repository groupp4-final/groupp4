//keeps buffer circle so it can be resized when moved
const bufferCircles = [];
//keep park markers so when search it zooms to them
const parkMarkers = {};

//All 14 areas with latitude/longitude, official website,name, and images linked
const parks = [
{ name: "Guadalupe Mountains NP", lat: 31.912, lng: -104.881, url: "[https://www.nps.gov/gumo/index.htm](https://www.nps.gov/gumo/index.htm)", },
{ name: "Big Bend NP", lat: 29.249, lng: -103.250, url: "[https://www.nps.gov/bibe/index.htm](https://www.nps.gov/bibe/index.htm)",},
{ name: "Chamizal NM", lat: 31.767, lng: -106.454, url: "[https://www.nps.gov/cham/index.htm](https://www.nps.gov/cham/index.htm)",},
{ name: "Fort Davis NHS", lat: 30.598, lng: -103.895, url: "[https://www.nps.gov/foda/index.htm](https://www.nps.gov/foda/index.htm)", },
{ name: "Rio Grande WSR", lat: 29.597, lng: -102.740, url: "[https://www.nps.gov/rigr/index.htm](https://www.nps.gov/rigr/index.htm)",},
{ name: "Amistad NRA", lat: 29.535, lng: -101.075, url: "[https://www.nps.gov/amis/index.htm](https://www.nps.gov/amis/index.htm)", },
{ name: "San Antonio Missions NHP", lat: 29.329, lng: -98.453, url: "[https://www.nps.gov/saan/index.htm](https://www.nps.gov/saan/index.htm)",},
{ name: "Lyndon B. Johnson NHP", lat: 30.242, lng: -98.608, url: "[https://www.nps.gov/lyjo/index.htm](https://www.nps.gov/lyjo/index.htm)", },
{ name: "Waco Mammoth NM", lat: 31.606, lng: -97.175, url: "[https://www.nps.gov/waco/index.htm](https://www.nps.gov/waco/index.htm)", },
{ name: "Alibates Flint Quarries NM", lat: 35.582, lng: -101.673, url: "[https://www.nps.gov/alfl/index.htm](https://www.nps.gov/alfl/index.htm)", },
{ name: "Lake Meredith NRA", lat: 35.643, lng: -101.586, url: "[https://www.nps.gov/lamr/index.htm](https://www.nps.gov/lamr/index.htm)",  },
{ name: "Big Thicket NP", lat: 30.458, lng: -94.387, url: "[https://www.nps.gov/bith/index.htm](https://www.nps.gov/bith/index.htm)",  },
{ name: "Padre Island NS", lat: 27.085, lng: -97.384, url: "[https://www.nps.gov/pais/index.htm](https://www.nps.gov/pais/index.htm)", },
{ name: "Palo Alto Battlefield NHP", lat: 26.016, lng: -97.479, url: "[https://www.nps.gov/paal/index.htm](https://www.nps.gov/paal/index.htm)",} 
]; 

function addPark(park, bufferKm = 5) {

  // creates the map marker
  const marker = L.marker([park.lat, park.lng]).addTo(map)
    .bindPopup(
      '<strong>' + park.name + '</strong><br>' +
      (park.img ? '<img src="' + park.img + '" style="width:200px; border-radius:6px; margin:5px 0;"><br>' : '') +
      '<a href="' + park.url + '" target="_blank">Website</a>'
    );

  // store the marker
  parkMarkers[park.name] = marker;

  // creates the blue buffer circle (default 5 km)
  const circle = L.circle([park.lat, park.lng], {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.1,
    radius: bufferKm * 1000 // convert km → meters
  })
  .bindPopup(
    '<strong>' + park.name + ' Buffer</strong><br>Radius: ' + bufferKm + ' km'
  )
  .addTo(map);

  // store buffer
  bufferCircles.push(circle);
}

// add all parks
parks.forEach(p => addPark(p));

// buffer slider
const slider = document.getElementById("bufferSlider");
const radiusLabel = document.getElementById("radiusValue");

slider.addEventListener("input", function () {
  const km = parseInt(this.value);

  // update label text
  radiusLabel.textContent = km;

  // update all buffer radii
  bufferCircles.forEach(circle => circle.setRadius(km * 1000));
});

// gets parkSearch from html
const searchInput = document.getElementById("parkSearch");
// gets searchResults from html
const resultsBox = document.getElementById("searchResults");

// listens for typing
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();

  // clear previous results
  resultsBox.innerHTML = "";

  // hide if empty
  if (!query) {
    resultsBox.style.display = "none";
    return;
  }

  // match parks
  const matches = parks.filter(p => p.name.toLowerCase().includes(query));

  if (matches.length === 0) {
    resultsBox.style.display = "none";
    return;
  }

  // show dropdown
  resultsBox.style.display = "block";

  matches.forEach(p => {
    const div = document.createElement("div");
    div.textContent = p.name;
    div.style.padding = "5px";
    div.style.cursor = "pointer";

    // When user clicks a result
    div.addEventListener("click", () => {

      const marker = parkMarkers[p.name]; // correct lookup

      if (marker) {
        map.flyTo([p.lat, p.lng], 12, { duration: 1.2 });
        marker.openPopup();
      }

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
