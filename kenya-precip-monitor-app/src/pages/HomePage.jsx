import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MapComponent from "../components/MapComponent";
import townData from "../data/kenya_towns.json";
import { getRiskLevel } from "../utils/riskLevel";

const HomePage = () => {
  const [towns, setTowns] = useState([]);
  const [selectedTown, setSelectedTown] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Today"); 

  // Generate rainfall & risk once with demo data
  useEffect(() => {
    const updated = townData.map((t) => {
      const rainfall = Math.floor(Math.random() * 50);
      const risk = getRiskLevel(rainfall);
      return { ...t, rainfall, risk };
    });
    setTowns(updated);
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
