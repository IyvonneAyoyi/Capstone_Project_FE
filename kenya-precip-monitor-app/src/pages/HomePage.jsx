import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MapComponent from "../components/MapComponent";
import townData from "../data/kenya_towns.json";
import { getRiskLevel } from "../utils/riskLevel";
import { getDailyRainfall } from "../api/weatherAPI";

const dateOptionMap = {
  "30 Days Ago": { type: "past", days: 30 },
  "3 Weeks Ago": { type: "past", days: 21 },
  "2 Weeks Ago": { type: "past", days: 14 },
  "7 Days Ago": { type: "past", days: 7 },
  "Today": { type: "forecast", days: 1 },
  "Tomorrow": { type: "forecast", days: 1 },
  "Next 7 Days": { type: "forecast", days: 7 },
  "Next 2 Weeks": { type: "forecast", days: 14 },
  "Next 16 Days": { type: "forecast", days: 16 },
};

const HomePage = () => {
  const [towns, setTowns] = useState([]);
  const [selectedTown, setSelectedTown] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Today");
  const [loading, setLoading] = useState(false); // added loading state

  useEffect(() => {
    const fetchRainfall = async () => {
      setLoading(true); // start loading
      const option = dateOptionMap[selectedDate] || { type: "forecast", days: 1 };

      const updatedTowns = await Promise.all(
        townData.map(async (t) => {
          const rainfall = await getDailyRainfall(t.Latitude, t.Longitude, option);
          const risk = getRiskLevel(rainfall);
          return { ...t, rainfall, risk };
        })
      );

      setTowns(updatedTowns);
      setLoading(false); // stop loading
    };

    fetchRainfall();
  }, [selectedDate]);

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

      <div className="flex-1 flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-blue-600">
            <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold">Fetching rainfall data…</p>
          </div>
        ) : (
          <MapComponent
            towns={towns}
            townFilter={selectedTown}
            riskFilter={selectedRisk}
            selectedDate={selectedDate}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
