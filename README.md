# 🌍 GeoScience Explorer

**GeoScience Explorer** is an interactive web application that helps users discover science-related landmarks, historical sites, and real-time weather data based on their location or any coordinates worldwide.

Built using public APIs and modern web technologies, this tool transforms maps into educational journeys—ideal for students, travelers, and curious minds.

🔗 [Live Demo](https://geo-science-explorer.vercel.app)

---

## ✨ Features

- 📍 **Location-Based Discovery:** Use GPS or input coordinates to find nearby science-related places.
- 🗺 **Interactive Map:** Explore articles via map markers and popups.
- 🌦 **Weather Data:** View live weather using Open-Meteo API.
- 📌 **Digital Time Capsules (Coming Soon):** Leave messages or discoveries on the map.
- 🌓 **Theme Toggle:** Switch between light and dark modes.

---

## 🛠 How It Works

1. The user selects a location using geolocation or manual input.
2. The app fetches nearby points of interest using the **Wikipedia GeoSearch API**.
3. Detailed data (images, summaries) is fetched via the **Wikipedia REST API**.
4. The **Wikidata API** enriches this data with structured facts.
5. Weather info is added using the **Open-Meteo API**.
6. Locations are shown on a Leaflet-based map with rich popups.

---

## ⚙️ Tech Stack

- **Next.js + React** – Web framework and UI components
- **Tailwind CSS** – Styling and layout
- **shadcn/ui** – UI component library
- **Leaflet & React Leaflet** – Map and location display
- **Public APIs:** Wikipedia GeoSearch, REST, Wikidata, Open-Meteo

---

## 🔧 Installation

**Requirements:**
- Node.js (v14+)
- npm

**Steps:**

```bash
git clone https://github.com/yourusername/geoscience-explorer.git
cd geoscience-explorer
npm install
npm run dev


