const AboutPage = () => (
  <div className="p-6 sm:p-10 max-w-4xl mx-auto text-gray-700 leading-relaxed">
    <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
      About PrecipMonitor KE    </h2>

    <p className="mb-4">
      <strong>PrecipMonitor KE</strong> is an interactive platform designed to track
      rainfall and assess precipitation-related risk levels across towns in Kenya.
      By combining meteorological forecasts and spatial data, it provides actionable
      insights for communities, researchers, and planners.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-600">Our Purpose</h3>
    <p className="mb-4">
      The platform aims to support <strong>climate resilience</strong> and
      <strong> early warning systems</strong> by visualizing rainfall patterns and
      potential flood risk zones. It helps users identify high-risk areas and make
      informed decisions for agriculture, water management, and disaster preparedness.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-600">Data Sources</h3>
    <ul className="list-disc ml-6 mb-4">
      <li>Daily precipitation data from Open-Meteo API</li>
      <li>Town location data from official geographic datasets</li>
      <li>Base maps powered by OpenStreetMap</li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-600">How It Works</h3>
    <p className="mb-4">
      The dashboard allows users to filter by town, risk level, or date range(from
      historical rainfall to upcoming forecasts). The map dynamically updates to display
      relevant precipitation data and color-coded risk zones.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-600">Future Plans</h3>
    <p className="mb-8">
      Upcoming versions of Kenya Precip Monitor will integrate additional datasets,
      including <strong>soil moisture, land use, and river flow data</strong>, to
      provide a more comprehensive view of climate and hydrological risks.
    </p>
  </div>
);

export default AboutPage;
