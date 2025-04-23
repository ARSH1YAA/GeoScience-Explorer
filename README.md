# 🌍 GeoScience Explorer

**GeoScience Explorer** is an interactive web application that combines geolocation with scientific data from various public APIs. It allows users to discover science-related landmarks, historical events, and environmental data based on their location or any coordinates worldwide.

![image](https://github.com/user-attachments/assets/7bef4e99-12a2-4444-91d2-1d4b65db7a4b)


🔗 [Live Demo](https://geo-science-explorer.vercel.app/)

## 📽️ Demo Video:
[![Watch the video](https://img.youtube.com/vi/wxFraVEG0x0/hqdefault.jpg)](https://youtu.be/wxFraVEG0x0)



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
- The app calls the [Wikipedia GeoSearch API](https://www.mediawiki.org/wiki/API:Geosearch) using the selected coordinates.  
- It filters results to highlight **scientific or historical significance**.

### 3. **Data Enrichment**  
For each result:  
- The [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) fetches a brief summary, image, and URL.  
- Optionally, [Wikidata](https://www.wikidata.org/wiki/Wikidata:Data_access) enhances the data with structured metadata (e.g., dates, entity types).

### 4. **Rendering on the Map**  
- Results are mapped using **Leaflet + React Leaflet**, with popups for summaries and quick links.

### 5. **Live Weather Info**  
- Current weather for the selected coordinates is retrieved from the [Open-Meteo API](https://open-meteo.com/) and displayed with icons.

### 6. **Planned: Time Capsules**  
- Users will be able to drop digital messages (text/images) on the map at specific coordinates.  
- Capsules can be rediscovered by others exploring the same place.

---

## 🔌 Public APIs Used

| API | Description | Link |
|-----|-------------|------|
| Wikipedia GeoSearch API | Finds nearby articles | [Docs](https://www.mediawiki.org/wiki/API:Geosearch) |
| Wikipedia REST API | Gets article summaries and images | [Docs](https://en.wikipedia.org/api/rest_v1/) |
| Wikidata API | Fetches structured data | [Docs](https://www.wikidata.org/wiki/Wikidata:Data_access) |
| Open-Meteo API | Live and forecasted weather | [Docs](https://open-meteo.com/) |

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

## 💡 Why Choose GeoScience Explorer?

- 🌍 **Turn Coordinates into Curiosity**  
  Ever stood somewhere and wondered, *“What’s the story here?”* This app connects real-world locations with science, history, and climate data—instantly.

- 🧠 **Smart Learning, Anywhere**  
  Whether you’re walking through a city, hiking a trail, or planning a lesson—unlock the hidden layers of knowledge around you.

- 🔗 **One App, Endless Sources**  
  Seamlessly pulls rich data from Wikipedia, Wikidata, and Open-Meteo to give you context that’s accurate, diverse, and up-to-date.

- 👨‍🏫 **For Explorers of All Kinds**  
  Built for students, teachers, researchers, and curious minds who want to see the world through a scientific lens—not just a tourist’s eye.

- 🛠 **Open-Source & Built to Grow**  
  Actively maintained and designed for contribution. Want to add a new data source or feature? You can.

> GeoScience Explorer doesn’t just show you *where* you are—  
> it tells you *why that place matters*.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
git clone https://github.com/ARSH1YAA/GeoScience-Explorer.git
cd GeoScience-Explorer
npm install
npm run dev
```

## 📢 Connect With Me

- **X (Twitter)**: [@arsh1yasheoran](https://twitter.com/arsh1yasheoran)


## 📄 License

This project is licensed under the [MIT License](LICENSE).
