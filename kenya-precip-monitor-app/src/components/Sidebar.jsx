import { useMemo } from "react";

const Sidebar = ({
  towns,
  selectedTown,
  setSelectedTown,
  selectedRisk,
  setSelectedRisk,
}) => {
  const riskOptions = ["All", "High", "Medium", "Low"];

  // Compute filtered towns and counts
  const { filteredTowns, detail } = useMemo(() => {
    let filtered = towns;

    if (selectedRisk !== "All") {
      filtered = filtered.filter((t) => t.risk === selectedRisk);
    }

    if (selectedTown !== "All") {
      filtered = filtered.filter((t) => t.town === selectedTown);
    }

    const counts = towns.reduce(
      (acc, t) => {
        acc[t.risk] = (acc[t.risk] || 0) + 1;
        return acc;
      },
      { High: 0, Medium: 0, Low: 0 }
    );

    const detail = selectedTown !== "All" ? filtered[0] : null;

    return { filteredTowns: filtered, riskCounts: counts, detail };
  }, [towns, selectedTown, selectedRisk]);

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
      <div className="mb-6">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
