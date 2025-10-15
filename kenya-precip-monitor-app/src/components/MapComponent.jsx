import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup,ZoomControl } from "react-leaflet";
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

const MapComponent = ({ towns, townFilter, riskFilter, selectedDate }) => {
  const filteredTowns = towns.filter((t) => {
    const riskMatch = riskFilter === "All" || t.risk === riskFilter;
    const townMatch = townFilter === "All" || t.town === townFilter;
    const dateMatch = !selectedDate || selectedDate === "All" || t.date === selectedDate;
    return riskMatch && townMatch && dateMatch;
  });

  return (
    <div className="relative flex-1">
      <MapContainer
        center={[-1.286389, 36.817223]}
        zoom={7}
        scrollWheelZoom={true}
        zoomControl={false}
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
              <div style={{ color: "black", fontWeight: 600 }}>
                {town.town}
                <br />
                Rainfall: {town.rainfall ?? 0} mm
              </div>
            </Popup>
          </CircleMarker>
        ))}
        <ZoomControl position="topright" />
      </MapContainer>

      <div className="absolute bottom-6 right-6 z-[1000]">
        <Legend />
      </div>
    </div>
  );
};

export default MapComponent;
