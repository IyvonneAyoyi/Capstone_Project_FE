import {useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getDailyRainfall } from "../api/weatherAPI";
import { getRiskLevel } from "../utils/riskLevel";
import towns from "../data/kenya_towns.json";



const MapComponent = () => {
  const [townData, setTownData] = useState([]);

    useEffect(() => {
    async function fetchData() {
      const results = await Promise.all(
        towns.map(async (town) => {
          const rainfall = await getDailyRainfall(town.Latitude, town.Longitude);
          const risk = getRiskLevel(rainfall);
          return { ...town, rainfall, risk };
        })
      );
      setTownData(results);
    }

    fetchData();
  }, []);
