import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
  Today: { type: "forecast", days: 1 },
  Tomorrow: { type: "forecast", days: 1 },
  "Next 7 Days": { type: "forecast", days: 7 },
  "Next 2 Weeks": { type: "forecast", days: 14 },
  "Next 16 Days": { type: "forecast", days: 16 },
};

const HomePage = () => {
  const [towns, setTowns] = useState([]);
  const [selectedTown, setSelectedTown] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Today");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchRainfall = async () => {
      setLoading(true);
      const option = dateOptionMap[selectedDate] || { type: "forecast", days: 1 };

      const updatedTowns = await Promise.all(
        townData.map(async (t) => {
          const rainfall = await getDailyRainfall(t.Latitude, t.Longitude, option);
          const risk = getRiskLevel(rainfall);
          return { ...t, rainfall, risk };
        })
      );

      setTowns(updatedTowns);
      setLoading(false);
    };

    fetchRainfall();
  }, [selectedDate]);
return (
  <div className="flex flex-col min-h-screen bg-gray-50">

    {/* --- Mobile toggle button --- */}
    <div className="sm:hidden p-3 bg-white border-b border-gray-200 shadow-sm">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
      >
        {sidebarOpen ? "Close Filters" : "Open Filters"}
      </button>
    </div>

    {/* --- Main Layout --- */}
    <div className="flex flex-1 flex-col sm:flex-row">
      {/* --- Sidebar --- */}
      <div
  className={`transition-all duration-300 ease-in-out bg-white border-b sm:border-r border-gray-200 shadow-md p-4 z-10
    ${sidebarOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden sm:max-h-none sm:opacity-100 sm:overflow-visible"}
    sm:w-80 w-full`}
>

        <Sidebar
          towns={towns}
          selectedTown={selectedTown}
          setSelectedTown={setSelectedTown}
          selectedRisk={selectedRisk}
          setSelectedRisk={setSelectedRisk}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      {/* --- Map Area --- */}
      <main className="flex-1 relative">
        {loading ? (
          <div className="flex items-center justify-center h-full text-blue-600">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-3 text-lg font-semibold">Fetching data…</p>
            </div>
          </div>
        ) : (
          <MapComponent
            towns={towns}
            townFilter={selectedTown}
            riskFilter={selectedRisk}
            dateFilter={selectedDate}
          />
        )}
      </main>
    </div>
  </div>
);

};

export default HomePage;
