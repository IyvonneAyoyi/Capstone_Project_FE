// src/components/Sidebar.js
import { useMemo } from "react";

const Sidebar = ({
  towns,
  selectedTown,
  setSelectedTown,
  selectedRisk,
  setSelectedRisk,
  selectedDate,
  setSelectedDate
}) => {
  const riskOptions = ["All", "High", "Medium", "Low"];
  const dateOptions = [
    "30 Days Ago",
    "3 Weeks Ago",
    "2 Weeks Ago",
    "7 Days Ago",
    "Today",
    "Tomorrow",
    "Next 7 Days",
    "Next 2 Weeks",
    "Next 16 Days",
  ];

  // Memoized filtering logic
  const { filteredTowns, detail } = useMemo(() => {
    let filtered = towns;

    // Filter by risk
    if (selectedRisk !== "All") {
      filtered = filtered.filter((t) => t.risk === selectedRisk);
    }

    // Filter by town
    if (selectedTown !== "All") {
      filtered = filtered.filter((t) => t.town === selectedTown);
    }

    // Select first match for details
    const detail = selectedTown !== "All" ? filtered[0] : null;

    return { filteredTowns: filtered, detail };
  }, [towns, selectedTown, selectedRisk]);

  return (
    <div className="w-72 bg-gray-50 shadow-lg p-6 flex flex-col overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Kenya Rainfall Monitor</h1>

      {/* Town Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Town</label>
        <select
          value={selectedTown}
          onChange={(e) => setSelectedTown(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="All">All</option>
          {towns.map((t) => (
            <option key={t.town} value={t.town}>
              {t.town}
            </option>
          ))}
        </select>
      </div>

      {/* Risk Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Risk</label>
        <select
          value={selectedRisk}
          onChange={(e) => setSelectedRisk(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          {riskOptions.map((risk) => (
            <option key={risk} value={risk}>
              {risk}
            </option>
          ))}
        </select>
      </div>

      {/* Date Dropdown */}
      <div className="mb-6">
        <label className="block mb-1 text-gray-700">Date Range</label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>

        <div className="bg-gray-100 p-3 rounded mb-2">
          <strong>Matching towns:</strong> {filteredTowns.length}
        </div>

        {detail ? (
          <div className="bg-blue-100 p-3 rounded">
            <div>
              <strong>Town:</strong> {detail.town}
            </div>
            <div>
              <strong>Rainfall:</strong>{" "}
              {detail.rainfall !== null ? `${detail.rainfall} mm` : "N/A"}
            </div>
            <div>
              <strong>Risk:</strong> {detail.risk || "N/A"}
            </div>
            <div>
              <strong>Date Range:</strong> {selectedDate}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 italic">
            Select a town to view details.
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
