import {useState } from "react";




const MapComponent = () => {
  const [townData, setTownData] = useState([]);

    useEffect(() => {
    async function fetchData() {
      const results = await Promise.all(
        towns.map(async (town) => {
          const rainfall = await getDailyRainfall(town.Latitude, town.Longitude);
          const risk = getRiskLevel(rainfall);
          return { ...town, rainfall, risk };
        })
      );
      setTownData(results);
    }

    fetchData();
  }, []);
