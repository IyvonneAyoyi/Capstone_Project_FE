export function getRiskLevel(rainfall) {
  if (rainfall === null || rainfall === undefined) return "No Data";
  if (rainfall <= 10) return "Low";
  if (rainfall < 30) return "Medium";
  return "High";
}

// Return either Tailwind class or hex color based on format
export function getRiskColor(risk, format = "class") {
  switch (risk) {
    case "Low":
      return format === "hex" ? "#22c55e" : "bg-green-500"; 
    case "Medium":
      return format === "hex" ? "#facc15" : "bg-yellow-400";
    case "High":
      return format === "hex" ? "#ef4444" : "bg-red-500"; 
    default:
      return format === "hex" ? "#9ca3af" : "bg-gray-400"; 
  }
}
