# PrecipMonitor KE App

PrecipMonitor KE is a web application that allows users to monitor rainfall and potential flood risks in major Kenyan towns.  
This project is my **Frontend Capstone Project** at ALX, and it integrates my **Geospatial knowledge** to visualize rainfall and flood risks spatially across Kenya.

---

## Features Built
- React app scaffolded with **Vite**
- **Tailwind CSS** integrated for styling
- **React Router** for navigation
- Interactive **MapComponent** displaying towns with rainfall and risk levels  
  - **CircleMarkers** to represent towns  
  - **Popups** on markers showing towns, rainfall, and risk information  
  - Zoom and scroll functionality for map navigation
- Filters for **towns, risk levels, and forecast dates**
- **Navbar** with responsive design
- **Sidebar** for filter selection
- **Legends** explaining risk levels on the map
- **RiskLevel components** showing visual risk indicators for each town
- **HomePage.jsx** as the main entry page
- **AboutPage.jsx** for app description and information
- **weatherAPI.js** for fetching daily rainfall data from Open-Meteo API
- **LocalStorage caching** for rainfall data to reduce API calls
- Project pushed to a **public GitHub repository**

---

## Data Source: Open-Meteo API

The **PrecipMonitor KE App** fetches rainfall and forecast data from the [Open-Meteo API](https://open-meteo.com/), a free, open-source weather data service.

- **API Coverage**
  - Provides **historical rainfall data** for up to **3 months** in the past  
  - Offers **forecast data** for up to **16 days ahead**
  - Supports multiple weather parameters including precipitation, temperature, humidity, and wind speed
- **API Used:** `https://api.open-meteo.com/v1/forecast`
- **Parameters:**
  - `latitude` and `longitude` — town coordinates
  - `daily=precipitation_sum` — retrieves total daily rainfall
  - `timezone=Africa/Nairobi` — ensures data matches local time
- **Usage in App:**
  - Data is fetched dynamically using the **Fetch API**
  - Results are displayed on the interactive **Leaflet map**
  - Users can filter rainfall and flood risk information by **town** and **risk level**

---

## Geospatial Applications
- Applied **Geospatial Information Science principles**:
  - **Geocoded all towns using OpenCage API**, converting town names into latitude and longitude coordinates for accurate mapping and finally converting the CSV file containing the towns’ location information into a JSON file.
  - Rainfall data combined with geospatial coordinates for visual flood risk representation.
  - Interactive map shows towns via **CircleMarkers** and **Popups**.
  - Zoom and scroll allow users to explore Kenya’s towns spatially.

---

## Tech Stack
- **Frontend:** React, Tailwind CSS  
- **Mapping & Geospatial:** Leaflet CSS, CircleMarkers, Popups  
- **Routing:** React Router DOM  
- **State & Side Effects:** React Hooks (`useState`, `useEffect`, `useRef`, `useMemo`)  
- **Data Fetching:** Fetch API  
- **Caching:** LocalStorage + in-memory cache  
- **Package Manager:** npm  
- **Version Control:** Git & GitHub  

---

## Project Structure

```bash
/Capstone_Project_FE
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── MapComponent.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── RiskLevel.jsx
│   │   └── Legend.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── AboutPage.jsx
│   ├── data/
│   │   └── kenya_towns.json
│   ├── api/
│   │   └── weatherAPI.js
│   ├── utils/
│   │   └── riskLevel.js
│   ├── index.css
│   ├── App.jsx
│   ├── main.jsx
│   └── config.js
├── .gitignore
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```
## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/IyvonneAyoyi/Capstone_Project_FE.git

```
2. Navigate to the project Directory
```bash
cd kenya-precip-monitor-app
```
3. Install Dependencies
```bash
npm install

```
4. Start the development server
```bash
npm run dev
```
5. Open your browser at the URL provided by Vite (usually http://localhost:5173)

---

## Future Plans

Integrate historical rainfall charts for trend analysis

Add user accounts for personalized monitoring

Optimize API requests and add rate-limit handling

Deploy as a fullstack web app with backend database integration