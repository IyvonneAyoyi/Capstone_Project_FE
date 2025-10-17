import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MapComponent from "../components/MapComponent";
import townData from "../data/kenya_towns.json";
import { getRiskLevel } from "../utils/riskLevel";
import { getDailyRainfall } from "../api/weatherAPI";

// ---- Date range options map ----
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile toggle

  // ---- Fetch rainfall + risk data ----
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
    <div className="flex flex-col min-h-screen relative bg-gray-50">
      {/* --- Mobile Filter Toggle Button --- */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle filter sidebar"
        aria-expanded={sidebarOpen}
        className="sm:hidden bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 m-3 rounded-md z-[70] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {sidebarOpen ? "Close Filters" : "Open Filters"}
      </button>

      <div className="flex flex-1 relative">
        {/* --- Sidebar (Collapsible on mobile) --- */}
        <div
          className={`absolute sm:static top-0 left-0 h-full sm:h-auto 
            transform transition-transform ease-in-out duration-300 
            bg-white shadow-2xl sm:shadow-none border-r border-gray-200 
            z-[60] w-72 sm:w-80 overflow-y-auto
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            sm:translate-x-0`}
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

        {/* --- Backdrop overlay (mobile only) --- */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 sm:hidden z-[50] backdrop-blur-[2px]"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* --- Main Map Section --- */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center text-blue-600">
              <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-semibold">
                Fetching rainfall data…
              </p>
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
