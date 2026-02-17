const express = require('express');
const app = express();
app.use(express.json());

let gpsData = { lat: 13.736717, lng: 100.523186, sat: 0 };

app.post('/update', (req, res) => {
    gpsData = req.body;
    res.send("OK");
});

app.get('/gps', (req, res) => {
    res.json(gpsData);
});

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
<title>GPS Cloud Tracker</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<style>
body{margin:0;text-align:center;font-family:Arial;}
#map{height:85vh;}
</style>
</head>
<body>
<h2>Cloud GPS Tracker</h2>
<div id="map"></div>
<p id="info"></p>
<script>
var map = L.map('map').setView([13.736717,100.523186], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
var marker = L.marker([13.736717,100.523186]).addTo(map);

function update(){
 fetch('/gps')
 .then(res=>res.json())
 .then(data=>{
   marker.setLatLng([data.lat,data.lng]);
   map.setView([data.lat,data.lng]);
   document.getElementById("info").innerHTML =
   "Sat: "+data.sat+" | Lat:"+data.lat+" | Lng:"+data.lng;
 });
}
setInterval(update,2000);
</script>
</body>
</html>
    `);
});

app.listen(3000, () => console.log("Server running on port 3000"));
