export function getRiskLevel(rainfall) {
  if (rainfall === null || rainfall === undefined) return "No Data";
  if (rainfall < 10) return "Low";
  if (rainfall < 30) return "Medium";
  return "High";
}

// Map risk level colors dynamically
export function getRiskColor(risk) {
  switch (risk) {
    case "Low":
      return "bg-green-500";
    case "Medium":
      return "bg-yellow-400";
    case "High":
      return "bg-red-500";
    default:
      return "bg-gray-400"; // for 'No Data'
  }
}