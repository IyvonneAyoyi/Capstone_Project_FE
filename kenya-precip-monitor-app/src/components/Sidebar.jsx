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

  return (<div className="w-full sm:w-72 bg-gray-50 shadow-md p-4 sm:p-6 flex flex-col overflow-y-auto">
  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-black-800">
    Kenya Rainfall Dashboard
  </h1>

  {/* Town Dropdown */}
  <div className="mb-3 sm:mb-4">
    <label className="block mb-1 text-gray-700 text-sm sm:text-base">Town</label>
    <select
      value={selectedTown}
      onChange={(e) => setSelectedTown(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
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
  <div className="mb-3 sm:mb-4">
    <label className="block mb-1 text-gray-700 text-sm sm:text-base">Risk</label>
    <select
      value={selectedRisk}
      onChange={(e) => setSelectedRisk(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
    >
      {riskOptions.map((risk) => (
        <option key={risk} value={risk}>
          {risk}
        </option>
      ))}
    </select>
  </div>

  {/* Date Dropdown */}
  <div className="mb-4 sm:mb-6">
    <label className="block mb-1 text-gray-700 text-sm sm:text-base">Date Range</label>
    <select
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
    >
      {dateOptions.map((date) => (
        <option key={date} value={date}>
          {date}
        </option>
      ))}
    </select>
  </div>

  {/* Summary Section */}
  <div className="mb-4 sm:mb-6">
    <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">Summary</h2>

    <div className="bg-gray-100 p-3 rounded mb-2 text-sm sm:text-base">
      <strong>Matching towns:</strong> {filteredTowns.length}
    </div>

    {detail ? (
      <div className="bg-blue-100 p-3 rounded text-sm sm:text-base">
        <div><strong>Town:</strong> {detail.town}</div>
        <div><strong>Rainfall:</strong> {detail.rainfall ?? "N/A"} mm</div>
        <div><strong>Risk:</strong> {detail.risk ?? "N/A"}</div>
        <div><strong>Date Range:</strong> {selectedDate}</div>
      </div>
    ) : (
      <div className="text-gray-500 italic text-sm sm:text-base">
        Select a town to view details.
      </div>
    )}
  </div>
</div>

  );
};

export default Sidebar;
