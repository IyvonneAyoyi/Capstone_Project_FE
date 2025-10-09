export async function getDailyRainfall(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum&timezone=Africa%2FNairobi`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data?.daily?.precipitation_sum?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching rainfall data:", error);
    return null;
  }
}
