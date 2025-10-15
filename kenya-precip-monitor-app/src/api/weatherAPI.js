export async function getDailyRainfall(lat, lon, option = { type: "forecast", days: 1 }) {
  let param =
    option.type === "past"
      ? `past_days=${option.days}`
      : `forecast_days=${option.days}`;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum&timezone=Africa%2FNairobi&${param}`;

  
  try {
    const res = await fetch(url);
    const data = await res.json();

    // Return average rainfall or first value
    return data?.daily?.precipitation_sum?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching rainfall data:", error);
    return null;
  }
}
