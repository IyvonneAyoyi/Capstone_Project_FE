import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import townData from "../data/kenya_towns.json";

// Fix marker icon issue in React Leaflet 
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapComponent = () => {
  const [towns, setTowns] = useState(townData);

  useEffect(() => {
    // Later, you’ll replace this with fetchWeatherData(town.Lat, town.Lon)
    const updated = townData.map((t) => ({
      ...t,
      rainfall: Math.floor(Math.random() * 50), // dummy rainfall for now
      risk:
        Math.floor(Math.random() * 50) < 15
          ? "Low"
          : Math.floor(Math.random() * 50) < 30
          ? "Medium"
          : "High",
    }));
    setTowns(updated);
  }, []);

  return (
    <MapContainer
      center={[-1.286389, 36.817223]}
      zoom={7}
      scrollWheelZoom={true}
      className="h-[80vh] w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {towns.map((town, i) => (
        <Marker key={i} position={[town.Latitude, town.Longitude]}>
          <Popup>
            <strong>{town.town}</strong>
            <br />
            Rainfall: {town.rainfall ?? "N/A"} mm
            <br />
            Risk: {town.risk ?? "N/A"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
