import React from "react";
import { getRiskColor } from "../utils/riskLevel";

const risks = [
  { level: "Low", label: "Low Risk" },
  { level: "Medium", label: "Medium Risk" },
  { level: "High", label: "High Risk" },
];

const Legend = () => {
  return (
    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 text-sm w-48 z-[1000]">
      <h3 className="font-semibold text-gray-900 mb-3 text-base text-center">
        Flood Risk
      </h3>

      <div className="space-y-3">
        {risks.map((r) => (
          <div key={r.level} className="flex items-center gap-3">
            <span
              className={`w-4 h-4 rounded-full ${getRiskColor(r.level, "class")}`}
            ></span>
            <span className="text-gray-800">{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
