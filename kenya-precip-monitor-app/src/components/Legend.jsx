import React from "react";

const Legend = () => {
  return (
    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 text-sm w-48 z-[1000]">
      <h3 className="font-semibold text-gray-900 mb-3 text-base text-center">
        Flood Risk
      </h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-green-500"></span>
          <span className="text-gray-800">Low Risk</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
          <span className="text-gray-800">Medium Risk</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-4 h-4 rounded-full bg-red-500"></span>
          <span className="text-gray-800">High Risk</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;
