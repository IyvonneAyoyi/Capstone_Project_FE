import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 p-4">
        <MapComponent />
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
