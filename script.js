// Define a target zone
const targetZone = {
  name: 'Downtown Toronto',
  lat: 43.6543,
  lng: -79.3832,
  radius: 5000 
};

let map;

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function initMap(lat, lng) {
  map = L.map('map').setView([lat, lng], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

  // Draw target zone
  L.circle([targetZone.lat, targetZone.lng], {
    color: 'blue',
    fillColor: '#66ccff',
    fillOpacity: 0.2,
    radius: targetZone.radius
  }).addTo(map).bindPopup(`Zone: ${targetZone.name}`);

  // Mark zone center
  L.marker([targetZone.lat, targetZone.lng])
    .addTo(map)
    .bindPopup(`${targetZone.name} Center`);

  // Mark user location
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup('Your Approximate Location')
    .openPopup();

  const distance = getDistance(lat, lng, targetZone.lat, targetZone.lng);
  document.getElementById('status').textContent = ` Approximate location: (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  const result = document.getElementById('result');

  if (distance <= targetZone.radius) {
    result.innerHTML = ` You are within ${Math.round(distance)}m of <strong>${targetZone.name}</strong>`;
    result.style.color = 'green';
  } else {
    result.innerHTML = ` You are ${Math.round(distance)}m outside of <strong>${targetZone.name}</strong>`;
    result.style.color = 'red';
  }
}

// Fetch general location from IP
fetch('https://ipapi.co/json/')
  .then(res => res.json())
  .then(data => {
    const { latitude, longitude, city, region } = data;
    document.getElementById('status').textContent = ` Approximate Location: ${city}, ${region}`;
    initMap(latitude, longitude);
  })
  .catch(err => {
    document.getElementById('status').textContent = ' Could not determine location.';
    console.error(err);
  });
