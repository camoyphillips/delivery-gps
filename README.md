#  GPS Agent 

This is a lightweight, frontend-only GPS Agent that uses **IP geolocation** to determine the user's approximate location **without requiring location permissions**.

It displays the user’s location and checks if they're inside a predefined geofenced zone using a **Leaflet.js map**.

---

##  Features

- **No GPS Permission Needed**  
  Uses `https://ipapi.co/json/` to fetch the user's approximate location based on IP address.

-  **Interactive Map with Leaflet.js**  
  Displays user's location and zone boundary on an OpenStreetMap-powered map.

-  **Geofencing Logic**  
  Calculates distance from the user's current position to the zone using the Haversine formula.

-  **Zone Detection Message**  
  Displays whether the user is inside or outside the zone in real time (on page load).

---

##  Project Structure

gps-frontend/
│
├── index.html # Main UI page
├── style.css # Basic responsive styles
├── script.js # Logic for geolocation, map rendering, and zone checks
└── README.md # 
