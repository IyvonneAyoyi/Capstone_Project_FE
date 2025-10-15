import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MapComponent from "../components/MapComponent";
import townData from "../data/kenya_towns.json";
import { getRiskLevel } from "../utils/riskLevel";
import { getDailyRainfall } from "../utils/weatherAPI";

const HomePage = () => {
  const [towns, setTowns] = useState([]);
  const [selectedTown, setSelectedTown] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Today");

  useEffect(() => {
    const fetchRainfall = async () => {
      const updatedTowns = await Promise.all(
        townData.map(async (t) => {
          const rainfall = await getDailyRainfall(t.Latitude, t.Longitude);
          const risk = getRiskLevel(rainfall);
          return { ...t, rainfall, risk, date: new Date().toISOString().split("T")[0] }; 
        })
      );
      setTowns(updatedTowns);
    };

    fetchRainfall();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        towns={towns}
        selectedTown={selectedTown}
        setSelectedTown={setSelectedTown}
        selectedRisk={selectedRisk}
        setSelectedRisk={setSelectedRisk}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <MapComponent
        towns={towns}
        townFilter={selectedTown}
        riskFilter={selectedRisk}
        dateFilter={selectedDate} 
      />
    </div>
  );
};

export default HomePage;
