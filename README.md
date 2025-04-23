# 🌍 GeoScience Explorer

**GeoScience Explorer** is an interactive web application that combines geolocation with scientific data from various public APIs. It allows users to discover science-related landmarks, historical events, and environmental data based on their location or any coordinates worldwide.

🔗 [Live Demo](https://geo-science-explorer.vercel.app/)

---

## ✨ Features

- 📍 Location-based scientific point discovery
- 🗺️ Interactive maps with real-time marker rendering
- 🌦️ Live weather data and forecasts
- 🎒 Digital time capsules with user content (planned feature)
- 🔄 Seamless theme toggling (light/dark)

---

## ⚙️ How It Works

Here's a breakdown of the **workflow** inside GeoScience Explorer:

### 1. **Location Input**
Users can either:
- Click “Use My Current Location” to auto-detect their position using the Geolocation API, or
- Manually enter a city name or lat/lon coordinates.

### 2. **Fetching Nearby Scientific Sites**
- The app calls the **Wikipedia GeoSearch API** using the selected coordinates.
- It filters results to highlight **scientific or historical significance**.

### 3. **Data Enrichment**
For each result:
- The **Wikipedia REST API** fetches a brief summary, image, and URL.
- Optionally, **Wikidata** enhances the data with structured metadata (e.g., dates, entity types).

### 4. **Rendering on the Map**
- Results are mapped using **Leaflet + React Leaflet**, with popups for summaries and quick links.

### 5. **Live Weather Info**
- Current weather for the selected coordinates is retrieved from **Open-Meteo** and displayed with icons.

### 6. **Planned: Time Capsules**
- Users will be able to drop digital messages (text/images) on the map at specific coordinates.
- Capsules can be rediscovered by others exploring the same place.

---

## 🔌 Public APIs Used

| API | Description | Usage |
|-----|-------------|-------|
| **Wikipedia GeoSearch API** | Finds nearby articles | Locate scientific landmarks |
| **Wikipedia REST API** | Gets article summaries and images | Populate map info cards |
| **Wikidata API** | Fetches structured data | Enhances landmark details |
| **Open-Meteo API** | Live and forecasted weather | Shows local weather info |

---

## 🛠️ Technical Stack

| Tech | Purpose |
|------|---------|
| **Next.js** | Routing, SSR, deployment |
| **React** | UI components |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI components built on Radix |
| **Leaflet & React Leaflet** | Map rendering |
| **Vercel** | Hosting and CI/CD |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/geoscience-explorer.git
cd geoscience-explorer
npm install
npm run dev


