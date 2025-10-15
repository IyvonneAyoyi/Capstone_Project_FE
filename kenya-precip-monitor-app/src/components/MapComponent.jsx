import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getRiskColor } from "../utils/riskLevel";
import Legend from "./Legend";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapComponent = ({ towns, townFilter, riskFilter }) => {
  const filteredTowns = towns.filter((t) => {
    const riskMatch = riskFilter === "All" || t.risk === riskFilter;
    const townMatch = townFilter === "All" || t.town === townFilter;
    return riskMatch && townMatch;
  });

  return (
    <div className="relative flex-1">
      <MapContainer
        center={[-1.286389, 36.817223]}
        zoom={7}
        scrollWheelZoom={true}
        className="h-[100vh] w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {filteredTowns.map((town) => (
          <CircleMarker
            key={town.town}
            center={[town.Latitude, town.Longitude]}
            radius={10}
            pathOptions={{
              color: "white",
              fillColor: getRiskColor(town.risk, "hex"),
              weight: 1.5,
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <div style={{ color: "black", padding: "8px", borderRadius: "6px" }}>
                <strong>{town.town}</strong>
                <br />
                Rainfall: {town.rainfall} mm
                <br />
                Risk: {town.risk}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="absolute bottom-6 right-6 z-[1000]">
        <Legend />
      </div>
    </div>
  );
};

export default MapComponent;
