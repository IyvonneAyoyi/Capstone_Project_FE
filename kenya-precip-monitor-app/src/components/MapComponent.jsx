import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getRiskLevel } from "../utils/riskLevel";
import { getRiskColor } from "../utils/riskLevel";
import Legend from "../components/Legend";
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
  const updated = townData.map((t) => {
    //Rainfall value for demo purposes
    const rainfall = Math.floor(Math.random() * 50); 

    // Calculate flood risk level based on rainfall(low,medium,high)
    const risk = getRiskLevel(rainfall);

    return { ...t, rainfall, risk };
  });

  setTowns(updated);
}, []);


return (
  <div className="relative">
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
  <CircleMarker
    key={i}
    center={[town.Latitude, town.Longitude]}
    radius={10}
    pathOptions={{color: 'white',
      fillColor:getRiskColor(town.risk, "hex"),
      weight:1.5,
      fillOpacity:0.9,
    }}
  >
    <Popup>
      <div
        style={{
          color: "black",
          padding: "8px",
          borderRadius: "6px",
        }}
      >
        <strong>{town.town}</strong>
        <br />
        Rainfall: {town.rainfall ?? "N/A"} mm
      </div>
    </Popup>
  </CircleMarker>
))}

    </MapContainer>

    {/* Legend fixed to bottom-right corner */}
    <div className="absolute bottom-6 right-6 z-[1000]">
      <Legend />
    </div>
  </div>
);
};

export default MapComponent;