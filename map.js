//Center to Texas
var mymap = L.map('map').setView([31.9686, -99.9018], 6);
//add basemap
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);
//create marker with precise coordinates
var alibatesFQicon = L.marker([35.5822153, -101.6734219]).addTo(mymap)
//create popup and add link to official website
.bindPopup(`
            <strong>Alibates Flint Quarries National Monument</strong><br>
            <img src="groupp4/images/Quarries.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/alfl/index.htm" target="_blank"> Website </a>
        `);
var amistadNRArea = L.marker([29.5353727, -101.0756701]).addTo(mymap)
.bindPopup(`
            <strong>Amistad National Recreation Area</strong><br>
            <img src="groupp4/images/amistad.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/amis/index.htm" target="_blank"> Website </a>
        `);
var bigbendNPark = L.marker([29.2499012, -103.2501638]).addTo(mymap)
.bindPopup(`
            <strong>Big Bend National Park</strong><br>
            <img src="groupp4/images/Big_Bend2.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/bibe/index.htm" target="_blank"> Website </a>
        `);
var bigthicketNP = L.marker([30.4583071, -94.3872437]).addTo(mymap)
.bindPopup(`
            <strong>Big Thicket National Preserve</strong><br>
            <img src="groupp4/images/Thicket.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/bith/index.htm" target="_blank"> Website </a>
        `);
var chamizalNM = L.marker([31.7672409, -106.4543374]).addTo(mymap)
.bindPopup(`
            <strong>Chamizal National Memorial</strong><br>
            <img src="groupp4/images/Chamizal.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/cham/index.htm" target="_blank"> Website </a>
        `);
var fortdavisNHS = L.marker([30.5988071, -103.8954292]).addTo(mymap)
.bindPopup(`
            <strong>Fort Davis National Historic Site</strong><br>
            <img src="groupp4/images/Fort_Davis.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/foda/index.htm" target="_blank"> Website </a>
        `);
var guadalupeMtnNP = L.marker([31.9122176, -104.8815637]).addTo(mymap)
.bindPopup(`
            <strong>Guadalupe Mountains National Park</strong><br>
            <img src="groupp4/images/Gaudalupe_M.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/gumo/index.htm" target="_blank"> Website </a>
        `);
var lakemeredithNRA = L.marker([35.6438006, -101.5863048]).addTo(mymap)
.bindPopup(`
            <strong>Lake Meredith National Recreation Area</strong><br>
            <img src="groupp4/images/Meredith.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/lamr/index.htm" target="_blank"> Website </a>
        `);
var lyndonBJohnsonNHP = L.marker([30.2425123, -98.6085090]).addTo(mymap)
.bindPopup(`
            <strong>Lyndon B. Johnson National Historic Park</strong><br>
            <img src="groupp4/images/lbj.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/lyjo/index.htm" target="_blank"> Website </a>
        `);
var padreislandNS = L.marker([27.0855137, -97.3841147]).addTo(mymap)
.bindPopup(`
            <strong>Padre Island National Seashore</strong><br>
            <img src="groupp4/images/SP.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/pais/index.htm" target="_blank"> Website </a>
        `);
var paloaltobattleNHP = L.marker([26.0167821, -97.4790262]).addTo(mymap)
.bindPopup(`
            <strong>Palo Alto Battlefield National Historic Park</strong><br>
            <img src="groupp4/images/Palo_alto.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/paal/index.htm" target="_blank"> Website </a>
        `);
var riograndeWSR = L.marker([29.5974902, -102.7405281]).addTo(mymap)
.bindPopup(`
            <strong>Rio Grande Wild and Scenic River</strong><br>
            <img src="groupp4/images/Rio_Grande.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/rigr/index.htm" target="_blank"> Website </a>
        `);
var saMissionsNHP = L.marker([29.3292707, -98.4535781]).addTo(mymap)
.bindPopup(`
            <strong>San Antonio Missions National Historic Park</strong><br>
            <img src="groupp4/images/Missions.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/saan/index.htm" target="_blank"> Website </a>
        `);
var wacoMammothNM = L.marker([31.6067336, -97.1758392]).addTo(mymap)
.bindPopup(`
            <strong>Waco Mammoth National Monument</strong><br>
            <img src="groupp4/images/Mammoth.jpg" width= "250" height= "250" />
            <a href="https://www.nps.gov/waco/index.htm" target="_blank"> Website </a>
        `);