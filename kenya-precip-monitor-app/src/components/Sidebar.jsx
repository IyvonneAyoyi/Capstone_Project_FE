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
    "All",
    "30 Days Ago",
    "3 Weeks Ago",
    "2 Weeks Ago",
    "7 Days Ago",
    "Today",
    "Tomorrow",
    "Next 7 Days",
    "Next 2 Weeks",
    "Next 16 Days"
  ];

  // Compute filtered towns and selected town detail
  const { filteredTowns, detail } = useMemo(() => {
    let filtered = towns;

    if (selectedRisk !== "All") {
      filtered = filtered.filter((t) => t.risk === selectedRisk);
    }

    if (selectedTown !== "All") {
      filtered = filtered.filter((t) => t.town === selectedTown);
    }

    if (selectedDate && selectedDate !== "All") {
      // Placeholder: filter logic based on date can be implemented
      // For now, we just return all as actual dates are not in town data
      filtered = filtered; 
    }

    const detail = selectedTown !== "All" ? filtered[0] : null;

    return { filteredTowns: filtered, detail };
  }, [towns, selectedTown, selectedRisk, selectedDate]);

  return (
    <div className="w-72 bg-gray-50 shadow-lg p-6 flex flex-col overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Filters & Summary</h1>

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
        <label className="block mb-1 text-gray-700">Date</label>
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

      {/* Dashboard */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <div className="bg-gray-100 p-3 rounded mb-2">
          <strong>Matching towns:</strong> {filteredTowns.length}
        </div>

        {detail && (
          <div className="bg-blue-100 p-3 rounded">
            <div>
              <strong>Town:</strong> {detail.town}
            </div>
            <div>
              <strong>Rainfall:</strong> {detail.rainfall} mm
            </div>
            <div>
              <strong>Risk:</strong> {detail.risk}
            </div>
            <div>
              <strong>Date:</strong> {selectedDate}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
