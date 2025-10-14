import React, { useState } from "react";
import FilterDropdown from "./FilterDropdown";

const Sidebar = ({ onFilter, selectedTownData }) => {
  return (
    <div className="w-72 bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between h-[80vh]">
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Rainfall & Flood Monitor
        </h2>

        {/* Filter Section */}
        <FilterDropdown onFilter={onFilter} />

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Risk Summary */}
        {selectedTownData && (
          <div className="text-sm text-gray-800 space-y-1">
            <p>
              <strong>Rainfall ({selectedTownData.period}):</strong>{" "}
              {selectedTownData.rainfall ?? "N/A"} mm
            </p>
            <p>
              <strong>Flood Risk:</strong> {selectedTownData.risk ?? "N/A"}
            </p>
            <p>
              <strong>Town:</strong> {selectedTownData.town ?? "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
