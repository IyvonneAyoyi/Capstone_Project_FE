export function getRiskLevel(rainfall) {
  if (rainfall === null || rainfall === undefined) return "No Data";
  if (rainfall < 10) return "Low";
  if (rainfall < 30) return "Medium";
  return "High";
}
