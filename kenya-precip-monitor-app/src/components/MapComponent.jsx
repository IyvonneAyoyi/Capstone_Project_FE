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

    return (
    <MapContainer
      center={[-1.286389, 36.817223]}
      zoom={7}
      className="h-[80vh] w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {townData.map((town, i) => (
        <Marker key={i} position={[town.Latitude, town.Longitude]}>
          <Popup>
            <strong>{town.town}</strong>
            <br />
            🌧️ Rainfall: {town.rainfall ?? "N/A"} mm
            <br />
            Risk: {town.risk}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default MapComponent;