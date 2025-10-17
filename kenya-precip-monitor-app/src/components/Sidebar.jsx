import { useMemo } from "react";

const Sidebar = ({
  towns,
  selectedTown,
  setSelectedTown,
  selectedRisk,
  setSelectedRisk,
  selectedDate,
  setSelectedDate,
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

  // ----- HANDLERS (callbacks for better readability and reusability) -----
  const handleTownChange = (e) => setSelectedTown(e.target.value);
  const handleRiskChange = (e) => setSelectedRisk(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);

  // ----- Memoized Filtering Logic -----
  const { filteredTowns, detail } = useMemo(() => {
    let filtered = towns;

    if (selectedRisk !== "All") {
      filtered = filtered.filter((t) => t.risk === selectedRisk);
    }

    if (selectedTown !== "All") {
      filtered = filtered.filter((t) => t.town === selectedTown);
    }

    const detail = selectedTown !== "All" ? filtered[0] : null;

    return { filteredTowns: filtered, detail };
  }, [towns, selectedTown, selectedRisk]);

  return (
    <aside
      className="w-full sm:w-72 bg-gray-50 shadow-md p-4 sm:p-6 flex flex-col overflow-y-auto"
      aria-label="Sidebar for Kenya Rainfall Dashboard"
    >
      {/* --- Header --- */}
      <h1
        className="text-2xl sm:text-3xl font-bold mb-6 text-black tracking-tight"
        aria-label="Kenya Rainfall Dashboard Title"
      >
        Kenya Rainfall Dashboard
      </h1>

      {/* --- Town Dropdown --- */}
      <div className="mb-4">
        <label
          htmlFor="town-select"
          className="block mb-1 text-gray-700 text-sm sm:text-base font-medium"
        >
          Town
        </label>
        <select
          id="town-select"
          value={selectedTown}
          onChange={handleTownChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
          aria-describedby="town-description"
        >
          <option value="All">All</option>
          {towns.map((t) => (
            <option key={t.town} value={t.town}>
              {t.town}
            </option>
          ))}
        </select>
        <p id="town-description" className="sr-only">
          Choose a town to view rainfall details.
        </p>
      </div>

      {/* --- Risk Dropdown --- */}
      <div className="mb-4">
        <label
          htmlFor="risk-select"
          className="block mb-1 text-gray-700 text-sm sm:text-base font-medium"
        >
          Risk
        </label>
        <select
          id="risk-select"
          value={selectedRisk}
          onChange={handleRiskChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
        >
          {riskOptions.map((risk) => (
            <option key={risk} value={risk}>
              {risk}
            </option>
          ))}
        </select>
      </div>

      {/* --- Date Dropdown --- */}
      <div className="mb-6">
        <label
          htmlFor="date-select"
          className="block mb-1 text-gray-700 text-sm sm:text-base font-medium"
        >
          Date Range
        </label>
        <select
          id="date-select"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
        >
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* --- Summary Section --- */}
      <section aria-labelledby="summary-heading" className="mb-6">
        <h2
          id="summary-heading"
          className="text-lg font-semibold mb-2 text-gray-800"
        >
          Summary
        </h2>

        <div className="bg-gray-100 p-3 rounded mb-2 text-sm sm:text-base">
          <strong>Matching towns:</strong> {filteredTowns.length}
        </div>

        {detail ? (
          <div className="bg-blue-100 p-3 rounded text-sm sm:text-base">
            <div>
              <strong>Town:</strong> {detail.town}
            </div>
            <div>
              <strong>Rainfall:</strong> {detail.rainfall ?? "N/A"} mm
            </div>
            <div>
              <strong>Risk:</strong> {detail.risk ?? "N/A"}
            </div>
            <div>
              <strong>Date Range:</strong> {selectedDate}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic text-sm sm:text-base">
            Select a town to view details.
          </p>
        )}
      </section>
    </aside>
  );
};

export default Sidebar;
