export function getRiskLevel(rainfall) {
  if (rainfall === null || rainfall === undefined) return "No Data";
  if (rainfall < 5) return "Low";
  if (rainfall < 20) return "Medium";
  return "High";
}
