import { Link } from "react-router-dom";

const AboutPage = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 text-gray-700">
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 sm:p-12">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        About <span className="text-blue-600">PrecipMonitor KE</span>
      </h2>

      <p className="mb-6 text-lg leading-relaxed text-justify">
        <strong>PrecipMonitor KE</strong> is an interactive web platform designed to
        monitor rainfall and assess precipitation-related risks across towns in Kenya.
        It combines meteorological forecasts and spatial data to provide
        <strong> actionable insights</strong> for communities, researchers, and planners.
      </p>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">Our Purpose</h3>
        <p className="text-justify leading-relaxed">
          The platform supports <strong>climate resilience</strong> and
          <strong> early warning systems</strong> by visualizing rainfall patterns
          and potential flood risk zones. It enables users to identify high-risk
          areas and make informed decisions for agriculture, water management, and
          disaster preparedness.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">Data Sources</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Daily precipitation data from the Open-Meteo API</li>
          <li>Town and location data from official geographic datasets</li>
          <li>Base maps powered by OpenStreetMap</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">How It Works</h3>
        <p className="text-justify leading-relaxed">
          Users can filter data by <strong>town</strong>,<strong>risk level</strong>,
          or <strong>date range</strong> from historical rainfall to upcoming forecasts.The map dynamically updates to display color-coded precipitation data and
          risk zones,offering a clear picture of weather trends.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-blue-700 mb-3">Future Plans</h3>
        <p className="text-justify leading-relaxed">
          Future versions of <strong>PrecipMonitor KE</strong> will integrate more
          datasets including <strong>soil moisture, land use, and river flow data </strong>
          to create a more comprehensive and predictive climate monitoring platform.
        </p>
      </section>

      {/* --- Back to Home Button --- */}
      <div className="text-center mt-12">
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 text-base sm:text-lg w-full sm:w-auto"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  </div>
);

export default AboutPage;
